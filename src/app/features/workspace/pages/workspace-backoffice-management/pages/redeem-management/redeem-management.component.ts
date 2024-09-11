import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { RowActionEventModel, CustomerModel, IMasterDataResponse } from '../../../../../../core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-redeem-management',
  templateUrl: './redeem-management.component.html',
  styleUrl: './redeem-management.component.scss'
})
export class RedeemManagementComponent implements OnInit {

  public approval: number = 1;

  public activeTab: 'exchange' | 'coupon' | 'toll' | string | null = 'exchange';
  @ViewChild('inputFile', { static: false }) private inputFileEl: | ElementRef | any;


  public isAdd: boolean = true;
  public submitted: boolean = false;
  public form: FormGroup;

  public tempSearch: string | undefined;

  public isLoading = false;

  public today: Date = new Date();

  materialList = [
    {
      label: 'material code',
      id: 1
    }
  ];

  redeemItemTypeList: IMasterDataResponse[] = [];
  isRedeemItemTypeLoading: boolean = false;

  redeemItemLimitType: IMasterDataResponse[] = [];
  isRedeemItemLimitType: boolean = false;

  redeemWalletLimitType: any[] = [
    {
      label: 'จำกัดต่อ 1 บัญชี (wallet)',
      id: 1
    },
    {
      label: 'ไม่จำกัด',
      id: 0
    }
  ];
  redeemAccountLimitType: any[] = [
    {
      label: 'จำกัดต่อ 1 ผู้ใช้งาน (user)',
      id: 1
    },
    {
      label: 'ไม่จำกัด',
      id: 0
    }
  ];

  customerCategorie: IMasterDataResponse[] = [];
  isCustomerCategorie: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
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
      // creditReceive: new FormControl(undefined, Validators.required), // itemType = CREDIT
      name: new FormControl(undefined, Validators.required),
      stockLocation: new FormControl(undefined, Validators.required),
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
    this.form = this.formBuilder.group({
      itemType: new FormControl('PRODUCT', Validators.required),
      materialCode: new FormControl('materialCode', Validators.required),
      startDate: new FormControl(undefined, Validators.required),
      fromPeriod: new FormControl(undefined, Validators.required),
      dayToDeliver: new FormControl(undefined, Validators.required),
      endRedeemDate: new FormControl(undefined, Validators.required),
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
      limitExchange: new FormControl(undefined, Validators.required),
      pointUse: new FormControl(undefined, Validators.required),
      amountTollReceived: new FormControl(undefined, Validators.required), // itemType = CREDIT
      // creditReceive: new FormControl(undefined, Validators.required), // itemType = CREDIT
      name: new FormControl(undefined, Validators.required),
      stockLocation: new FormControl(undefined, Validators.required),
      imgUrl: new FormControl(undefined, Validators.required),
      calVat: new FormControl(undefined, Validators.required),
      detail: new FormControl(undefined, Validators.required),
      condition: new FormControl(undefined, Validators.required),
      publishing: new FormControl(undefined, Validators.required),
    });

    this.form.get('itemType')?.valueChanges.subscribe((value) => {
      this.updateValidators(value);
    });

  }

  updateValidators(itemType: string) {
    console.log("[updateValidators] itemType => ", itemType);
    const controlsToUpdate = [
      //รายละเอียดเวลา
      { controlName: 'dayToDeliver', requiredFor: ['PRODUCT'] },
      { controlName: 'validityDate', requiredFor: ['PRODUCT'] },
      { controlName: 'endRedeemDate', requiredFor: ['COUPON'] },
      //รายละเอียดการจำกัด
      { controlName: 'limitType', requiredFor: ['PRODUCT'] },
      { controlName: 'limitWalletType', requiredFor: ['PRODUCT'] },
      { controlName: 'limitAccountType', requiredFor: ['PRODUCT'] },
      { controlName: 'limitItem', requiredFor: ['PRODUCT'] },
      { controlName: 'limitWallet', requiredFor: ['PRODUCT'] },
      { controlName: 'limitAccount', requiredFor: ['PRODUCT'] },
      { controlName: 'limitExchange', requiredFor: ['COUPON', 'CREDIT'] },
      //รายละเอียดคะแนน
      { controlName: 'amountTollReceived', requiredFor: ['CREDIT'] },
      //รายละเอียด
      { controlName: 'calVat', requiredFor: ['PRODUCT'] },
      { controlName: 'stockLocation', requiredFor: ['PRODUCT'] },
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
    this.getRedeemItemType();
    this.getRedeemLimitType();
    this.getCustomerCategories();
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/manage-redeem/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onAdd(): void {
    this.isAdd = true;
  }

  fileTypeValidation(event: any) {
    let files = event.target.files[0];
    this.form.get('attachDocument')?.setValue(files);
    console.log("[fileTypeValidation] files => ", files);
    console.log("[fileTypeValidation] attachDocument => ", this.form.get('attachDocument')?.value);
    this.inputFileEl.nativeElement.value = null;
  }

  onAction(event: RowActionEventModel) {
    if (event.action === 'description' && event.row) {
      // const row = event.row as CustomerModel;
      // this.router.navigate(['work-space/user-info/general-info/' + row.id]);
    }
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


  onChangeItemLimitType(event: string) {
    console.log("[onChangeItemLimitType] event => ", event);
    if (event) this.form.get('limitItem')?.enable();
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
    console.log("[onSubmit] form => ", this.form.value);
    console.log("[onSubmit] findInvalidControls => ", this.findInvalidControls());
  }

  onBack() {
    this.submitted = false;
    this.isAdd = false;
    this.tempSearch = undefined;
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
