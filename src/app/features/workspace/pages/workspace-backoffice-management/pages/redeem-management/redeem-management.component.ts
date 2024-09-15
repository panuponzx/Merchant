import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { RowActionEventModel, IMasterDataResponse, IMaterialResponse, IProductAddItemRequest, CustomColumnModel, IElementLoyaltyProductsResponse, ILoyaltyProductsResponse, ILimitationResponseModel, ILoyaltyProductsByIdResponse } from '../../../../../../core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { TransformDatePipe } from 'src/app/core/pipes';

@Component({
  selector: 'app-redeem-management',
  templateUrl: './redeem-management.component.html',
  styleUrl: './redeem-management.component.scss'
})
export class RedeemManagementComponent implements OnInit {

  public approval: number = 1;

  public activeTab: 'product' | 'coupon' | 'credit' | string | null = 'product';
  @ViewChild('inputFile', { static: false }) private inputFileEl: | ElementRef | any;


  public isAdd: boolean = false;
  public isEdit: boolean = false;
  public productId: string = "";
  public submitted: boolean = false;
  public form: FormGroup;

  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    // { id: 'activityName', name: 'กิจกรรม', label: 'กิจกรรม', prop: 'activityName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'name', name: 'ชื่อสินค้า', label: 'ชื่อสินค้า', prop: 'name.th', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'pointAmount', name: 'ประเภท', label: 'ประเภท', prop: 'pointAmount', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'pointUse', name: 'คะแนนที่ใช้แลก', label: 'คะแนนที่ใช้แลก', prop: 'pointUse', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'activityDuration', name: 'เวลาที่เริ่ม', label: 'เวลาที่เริ่ม', prop: 'activityDuration', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text', date: { format: 'D MMMM YYYY', locale: 'en' } },
    { id: 'expiryDate', name: 'เวลาที่สิ้นสุด', label: 'เวลาที่สิ้นสุด', prop: 'expiryDate', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'รายละเอียด', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];
  public loyaltyProductsList: IElementLoyaltyProductsResponse[] = [];
  public isLoyaltyProductsLoading: boolean = false;
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;

  public isLoading = false;

  // materialList = [
  //   {
  //     label: 'material code',
  //     id: 1
  //   }
  // ];

  redeemItemTypeList: IMasterDataResponse[] = [];
  isRedeemItemTypeLoading: boolean = false;

  materialInput$ = new Subject<string>();
  materialMinLengthSearch: number = 2;
  materialList$: Observable<IMaterialResponse[]>;
  materialList: IMaterialResponse[] = [];
  isGettMaterial: boolean = false;

  redeemItemLimitType: IMasterDataResponse[] = [];
  isRedeemItemLimitType: boolean = false;

  redeemWalletLimitType: any[] = [
    {
      label: 'จำกัดต่อ 1 บัญชี (wallet)',
      id: 'LIMITED'
    },
    {
      label: 'ไม่จำกัด',
      id: 'UNLIMITED'
    }
  ];
  redeemAccountLimitType: any[] = [
    {
      label: 'จำกัดต่อ 1 ผู้ใช้งาน (user)',
      id: 'LIMITED'
    },
    {
      label: 'ไม่จำกัด',
      id: 'UNLIMITED'
    }
  ];
  calVatList: any[] = [
    {
      label: 'ไม่คำนวนภาษี',
      id: false
    },
    {
      label: 'คำนวนภาษี',
      id: true
    }
  ];

  customerCategorie: IMasterDataResponse[] = [];
  isCustomerCategorie: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private transformDatePipe: TransformDatePipe
  ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.materialList$ = new Observable<IMaterialResponse[]>();
    this.form = this.formBuilder.group({
      itemType: new FormControl(undefined, Validators.required),
      materialCode: new FormControl(undefined, Validators.required),
      startDate: new FormControl(undefined, Validators.required),
      fromPeriod: new FormControl(undefined, Validators.required),
      dayToDeliver: new FormControl(undefined, Validators.required),
      expiryDate: new FormControl(undefined, Validators.required),
      toPeriod: new FormControl(undefined, Validators.required),
      validityDate: new FormControl(undefined, Validators.required),
      customerCategory: new FormControl(undefined, Validators.required),
      limitType: new FormControl(undefined, Validators.required),
      limitWalletType: new FormControl(undefined, Validators.required),
      limitAccountType: new FormControl(undefined, Validators.required),
      limitItem: new FormControl({ value: undefined, disabled: true }, Validators.required),
      limitWallet: new FormControl({ value: undefined, disabled: true }, Validators.required),
      limitAccount: new FormControl({ value: undefined, disabled: true }, Validators.required),
      pointUse: new FormControl(undefined, Validators.required),
      creditReceive: new FormControl(undefined, Validators.required),
      name: new FormControl(undefined, Validators.required),
      stockLocation: new FormControl(undefined),
      imgUrl: new FormControl(undefined, Validators.required),
      calVat: new FormControl(undefined, Validators.required),
      detail: new FormControl(undefined, Validators.required),
      condition: new FormControl(undefined, Validators.required),
      publishing: new FormControl(undefined, Validators.required),
      // startDate: new FormControl(undefined, Validators.required),
      // endDate: new FormControl(undefined, Validators.required),
      // itemName: new FormControl(undefined, Validators.required),
      // totalPoint: new FormControl(undefined, Validators.required),
      // description: new FormControl(undefined, Validators.required),
      // condition: new FormControl(undefined, Validators.required),
    });
    // this.isAdd = true;
    // this.form.get('itemType')?.setValue('PRODUCT');
    this.form.get('itemType')?.valueChanges.subscribe((value) => {
      this.updateValidators(value);
    });

  }

  updateValidators(itemType: string) {
    console.log("[updateValidators] itemType => ", itemType);
    const controlsToUpdate = [
      //รายละเอียดเวลา
      { controlName: 'dayToDeliver', requiredFor: ['PRODUCT'] },
      { controlName: 'validityDate', requiredFor: ['PRODUCT, COUPON'] },
      //รายละเอียดการจำกัด
      // { controlName: 'limitType', requiredFor: ['PRODUCT'] },
      // { controlName: 'limitWalletType', requiredFor: ['PRODUCT'] },
      // { controlName: 'limitAccountType', requiredFor: ['PRODUCT'] },
      // { controlName: 'limitItem', requiredFor: ['PRODUCT'] },
      // { controlName: 'limitWallet', requiredFor: ['PRODUCT'] },
      // { controlName: 'limitAccount', requiredFor: ['PRODUCT'] },
      // { controlName: 'limitExchange', requiredFor: ['COUPON', 'CREDIT'] },
      //รายละเอียดคะแนน
      { controlName: 'creditReceive', requiredFor: ['CREDIT'] },
      //รายละเอียด
      { controlName: 'calVat', requiredFor: ['PRODUCT'] },
      // { controlName: 'stockLocation', requiredFor: ['PRODUCT'] },
    ];
    controlsToUpdate.forEach(({ controlName, requiredFor }) => {
      const control = this.form.get(controlName);
      if (requiredFor.includes(itemType)) {
        control?.setValidators(Validators.required);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    if (this.activeTab) {
      this.updateValidators(this.activeTab.toUpperCase());
    }
    this.getLoyaltyProducts();
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/manage-redeem/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
    this.activeTab = event.nextId;
    this.pages = 1;
    this.getLoyaltyProducts();
  }

  getLoyaltyProducts() {
    const redeemItemType = this.activeTab?.toLocaleUpperCase();
    this.isLoyaltyProductsLoading = true;
    this.restApiService.getBackOfficeWithModel<ILoyaltyProductsResponse>(`loyalty/products/${redeemItemType}/all?limit=${this.limitRow}&offset=${(this.pages * this.limitRow) - this.limitRow}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.loyaltyProductsList = res.data.elements;
          this.collectionSize = res.data.totalElements;
        }
        this.isLoyaltyProductsLoading = false;
      },
      error: (error) => {
        this.isLoyaltyProductsLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  onChangePage(event: number) {
    this.pages = event;
    this.getLoyaltyProducts();
  }

  onAction(event: RowActionEventModel) {
    if (event.action === 'description' && event.row) {
      const row = event.row as IElementLoyaltyProductsResponse;
      console.log("[onAction] event => ", event.row);
      this.productId = row.id;
      this.getLoyaltyProductsById(row.id);
      this.getRedeemItemType();
      this.getRedeemLimitType();
      this.getCustomerCategories();
      this.getMaterial();
      // const row = event.row as IElementLoyaltyProductsResponse;
      // this.form.get('itemType')?.setValue(row.itemTypeCode);
      // // this.form.get('materialCode')?.setValue(row.materialCode);
      // this.form.get('startDate')?.setValue(row.startDate);
      // // this.form.get('fromPeriod')?.setValue(row.fromPeriod);
      // // this.form.get('dayToDeliver')?.setValue(row.itemTypeCode);
      // this.form.get('itemType')?.setValue(row.itemTypeCode);
      // this.form.get('itemType')?.setValue(row.itemTypeCode);
      // this.isAdd = true;
      // console.log("[onAction] event => ", event.row);
    }
  }

  onAdd(): void {
    this.isAdd = true;
    this.getRedeemItemType();
    this.getRedeemLimitType();
    this.getCustomerCategories();
    this.getMaterial();
  }

  fileTypeValidation(event: any) {
    let files = event.target.files[0];
    this.form.get('attachDocument')?.setValue(files);
    console.log("[fileTypeValidation] files => ", files);
    console.log("[fileTypeValidation] attachDocument => ", this.form.get('attachDocument')?.value);
    this.inputFileEl.nativeElement.value = null;
  }

  getLoyaltyProductsById(id: string) {
    this.isRedeemItemTypeLoading = true;
    this.restApiService.getBackOfficeWithModel<ILoyaltyProductsByIdResponse>(`loyalty/product/${id}`).subscribe({
      next: (res) => {
        // TODO: endDate NotFound
        if (res.errorMessage === "Success") {
          const startDate = this.transformDatePipe.transform(res.data.startDate, 'YYYY-MM-DD');
          const expiryDate = this.transformDatePipe.transform(res.data.expiryDate, 'YYYY-MM-DD');
          const validityDate = this.transformDatePipe.transform(res.data.validityDate, 'YYYY-MM-DD');
          this.form.get('itemType')?.setValue(res.data.itemTypeCode);
          this.form.get('materialCode')?.setValue(res.data.materialCode);
          this.form.get('startDate')?.setValue(startDate);
          // this.form.get('fromPeriod')?.setValue(res.data.fromPeriod);
          // this.form.get('dayToDeliver')?.setValue(res.data.dayToDeliver);
          this.form.get('expiryDate')?.setValue(expiryDate);
          // this.form.get('toPeriod')?.setValue(res.data.toPeriod);
          this.form.get('validityDate')?.setValue(validityDate);
          // this.form.get('customerCategory')?.setValue(res.data.itemProperties?.customerCategoryCode);
          this.form.get('limitType')?.setValue(res.data.limitation?.perItem?.limitType);
          if (res.data.limitation?.perWallet?.limit > 0) {
            this.form.get('limitWalletType')?.setValue('LIMITED');
            this.form.get('limitWallet')?.enable();
          } else {
            this.form.get('limitWalletType')?.setValue('UNLIMITED');
          }
          if (res.data.limitation?.perAccount?.limit > 0) {
            this.form.get('limitAccountType')?.setValue('LIMITED');
            this.form.get('limitAccount')?.enable();
          } else {
            this.form.get('limitAccountType')?.setValue('UNLIMITED');
          }
          this.form.get('limitItem')?.setValue(res.data.limitation?.perItem?.limit);
          this.form.get('limitWallet')?.setValue(res.data.limitation?.perWallet?.limit);
          this.form.get('limitAccount')?.setValue(res.data.limitation?.perAccount?.limit);
          this.form.get('pointUse')?.setValue(res.data.pointUse);
          this.form.get('creditReceive')?.setValue(res.data.creditReceive);
          this.form.get('name')?.setValue(res.data.name?.th);
          this.form.get('stockLocation')?.setValue(res.data.itemProperties?.stockLocationCode); //TODO: Not Have Res
          this.form.get('imgUrl')?.setValue(res.data.imgUrl);
          this.form.get('calVat')?.setValue(res.data.itemProperties?.calVat);
          this.form.get('detail')?.setValue(res.data.itemProperties?.detail?.th);
          this.form.get('condition')?.setValue(res.data.itemProperties?.condition?.th);
          this.form.get('publishing')?.setValue(res.data.isActive);
          this.isAdd = true;
          this.isEdit = true;
        }
        this.isRedeemItemTypeLoading = false;
      },
      error: (error) => {
        this.isRedeemItemTypeLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getRedeemItemType() {
    this.isRedeemItemTypeLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/redeem-item-type`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.redeemItemTypeList = res.data;
        }
        this.isRedeemItemTypeLoading = false;
      },
      error: (error) => {
        this.isRedeemItemTypeLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getRedeemLimitType() {
    this.isRedeemItemTypeLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/redeem-limit-type`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.redeemItemLimitType = res.data;
        }
        this.isRedeemItemTypeLoading = false;
      },
      error: (error) => {
        this.isRedeemItemTypeLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCustomerCategories() {
    this.isCustomerCategorie = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/customer-categories`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.customerCategorie = res.data;
        }
        this.isCustomerCategorie = false;
      },
      error: (error) => {
        this.isCustomerCategorie = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getMaterial() {
    this.materialList$ = this.materialInput$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => (this.isGettMaterial = true)),
      switchMap((input: string) =>
        this.restApiService.getBackOfficeWithModel<IMaterialResponse>(`inventory/material/${input}`).pipe(
          map((respons) => {
            console.log(respons.data);
            let response: IMaterialResponse[] = [respons.data];
            return response;
          }),
          catchError(() => of([])),
          tap(() => (this.isGettMaterial = false)),
        )
      )
    )
  }

  postProductAddItem() {
    const startDate = new Date(this.form.get('startDate')?.value);
    startDate.setHours(0, 0, 0, 0);
    const startDateNewFormat: string = String(this.transformDatePipe.transform(startDate, 'YYYY-MM-DD HH:mm'));
    const expiryDate = new Date(this.form.get('expiryDate')?.value);
    expiryDate.setHours(23, 59, 0, 0);
    const expiryDateNewFormat: string = String(this.transformDatePipe.transform(expiryDate, 'YYYY-MM-DD HH:mm'));
    const validityDate = new Date(this.form.get('expiryDate')?.value);
    validityDate.setHours(23, 59, 0, 0);
    const validityDateNewFormat: string = String(this.transformDatePipe.transform(validityDate, 'YYYY-MM-DD HH:mm'));
    const payload: IProductAddItemRequest = {
      materialCode: this.form.get('materialCode')?.value,
      imgUrl: this.form.get('imgUrl')?.value,
      pointUse: this.form.get('pointUse')?.value,
      creditReceive: this.form.get('amountTollReceived')?.value,
      itemTypeCode: this.form.get('itemType')?.value,
      startDate: startDateNewFormat,
      expiryDate: expiryDateNewFormat,
      validityDate: validityDateNewFormat,
      isActive: this.form.get('publishing')?.value,
      name: {
        th: this.form.get('name')?.value,
      },
      itemProperties: {
        detail: {
          th: this.form.get('detail')?.value,
        },
        condition: {
          th: this.form.get('condition')?.value,
        },
        price: 0,
        customerCategoryCode: this.form.get('customerCategory')?.value,
        calVat: this.form.get('calVat')?.value,
        stockLocationCode: this.form.get('stockLocation')?.value,
        dayToDeliver: this.form.get('dayToDeliver')?.value,
        receiveWithinDays: 0,
      },
      limitation: {
        perItem: {
          limitType: this.form.get('limitType')?.value,
          limit: this.form.get('limitItem')?.getRawValue(),
        },
        perWallet: {
          limit: this.form.get('limitWallet')?.getRawValue(),
        },
        perAccount: {
          limit: this.form.get('limitAccount')?.getRawValue(),
        }
      }
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<IProductAddItemRequest, any>(`loyalty/product/add-item`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.isAdd = false;
          this.isEdit = false;
          this.form.reset();
          this.getLoyaltyProducts();
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  postProductEditItem(id: string) {
    const startDate = new Date(this.form.get('startDate')?.value);
    startDate.setHours(0, 0, 0, 0);
    const startDateNewFormat: string = String(this.transformDatePipe.transform(startDate, 'YYYY-MM-DD HH:mm'));
    const expiryDate = new Date(this.form.get('expiryDate')?.value);
    expiryDate.setHours(23, 59, 0, 0);
    const expiryDateNewFormat: string = String(this.transformDatePipe.transform(expiryDate, 'YYYY-MM-DD HH:mm'));
    const validityDate = new Date(this.form.get('expiryDate')?.value);
    validityDate.setHours(23, 59, 0, 0);
    const validityDateNewFormat: string = String(this.transformDatePipe.transform(validityDate, 'YYYY-MM-DD HH:mm'));
    const payload: IProductAddItemRequest = {
      materialCode: this.form.get('materialCode')?.value,
      imgUrl: this.form.get('imgUrl')?.value,
      pointUse: this.form.get('pointUse')?.value,
      creditReceive: this.form.get('amountTollReceived')?.value,
      itemTypeCode: this.form.get('itemType')?.value,
      startDate: startDateNewFormat,
      expiryDate: expiryDateNewFormat,
      validityDate: validityDateNewFormat,
      isActive: this.form.get('publishing')?.value,
      name: {
        th: this.form.get('name')?.value,
      },
      itemProperties: {
        detail: {
          th: this.form.get('detail')?.value,
        },
        condition: {
          th: this.form.get('condition')?.value,
        },
        price: 0,
        customerCategoryCode: this.form.get('customerCategory')?.value,
        calVat: this.form.get('calVat')?.value,
        stockLocationCode: this.form.get('stockLocation')?.value,
        dayToDeliver: this.form.get('dayToDeliver')?.value,
        receiveWithinDays: 0,
      },
      limitation: {
        perItem: {
          limitType: this.form.get('limitType')?.value,
          limit: this.form.get('limitItem')?.getRawValue(),
        },
        perWallet: {
          limit: this.form.get('limitWallet')?.getRawValue(),
        },
        perAccount: {
          limit: this.form.get('limitAccount')?.getRawValue(),
        }
      },
      id: id
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<IProductAddItemRequest, any>(`loyalty/product/${id}/update-item`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.isAdd = false;
          this.isEdit = false;
          this.form.reset();
          this.getLoyaltyProducts();
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onChangeItemLimitType(event: string) {
    console.log("[onChangeItemLimitType] event => ", event);
    if (event) {
      this.form.get('limitItem')?.enable();
      this.form.get('limitItem')?.reset();
      if (event === 'UNLIMITED') {
        this.form.get('limitItem')?.setValue(0);
        this.form.get('limitItem')?.disable();
      }
    }
  }

  onChangeLimitWalletType(event: string) {
    console.log("[onChangeLimitWalletType] event => ", event);
    if (event) {
      this.form.get('limitWallet')?.enable();
      this.form.get('limitWallet')?.reset();
      if (event === 'UNLIMITED') {
        this.form.get('limitWallet')?.setValue(0);
        this.form.get('limitWallet')?.disable();
      }
    }
  }

  onChangeLimitAccountType(event: string) {
    console.log("[onChangeLimitAccountType] event => ", event);
    if (event) {
      this.form.get('limitAccount')?.enable();
      this.form.get('limitAccount')?.reset();
      if (event === 'UNLIMITED') {
        this.form.get('limitAccount')?.setValue(0);
        this.form.get('limitAccount')?.disable();
      }
    }
  }

  onMaterialKeyup(event: KeyboardEvent) {
    const val = (event.target as HTMLInputElement).value.toLowerCase();
    this.materialInput$.next(val);
  }

  // getStatusSelectAll(formControlName: string): boolean {
  //   if (formControlName === 'carType') {
  //     if (this.form?.get('carType')?.value && this.form?.get('carType')?.value.length === this.CarType.length) return true;
  //   } else if (formControlName === 'route') {
  //     if (this.form?.get('route')?.value && this.form?.get('route')?.value.length === this.route.length) return true;
  //   } else if (formControlName === 'tollBuilding') {
  //     if (this.form?.get('expressBuilding')?.value && this.form?.get('expressBuilding')?.value.length === this.expressBuilding.length) return true;
  //   } else if (formControlName === 'customerType') {
  //     if (this.form?.get('customerType')?.value && this.form?.get('customerType')?.value.length === this.UserType.length) return true;
  //   }
  //   return false;
  // }

  onSubmit() {
    this.postProductAddItem();
    console.log("[onSubmit] form => ", this.form.value);
    console.log("[onSubmit] findInvalidControls => ", this.findInvalidControls());
  }

  onEdit() {
    this.postProductEditItem(this.productId);
  }

  onBack() {
    this.submitted = false;
    this.isAdd = false;
    // this.tempSearch = undefined;
    this.form.reset();
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

}
