import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { ISearchJuristicRequest, ISearcnCustomerResponse, ResponseMessageModel, ResponseModel } from 'src/app/core/interfaces';
import { CustomerModel, ICustomerSearchModel, IPaginationModel } from 'src/app/core/interfaces/data.interface';
import { CustomColumnModel, RowActionEventModel } from 'src/app/core/interfaces/datatable.interface';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-search-merchant-customer',
  templateUrl: './search-merchant-customer.component.html',
  styleUrl: './search-merchant-customer.component.scss',
  animations: [
    trigger('fadeInOutTable', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
    ]),
    trigger('fadeInOutseach', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]), trigger('fadeInseach', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0 }))
      ])
    ]), trigger('slideInOutSearch', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),

    trigger('zoomInOutTable', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'scale(0)' }))
      ])
    ]),

    trigger('staggeredEntrance', [
      transition(':enter', [
        query('.search-user-content-wrapper > *', stagger(100, [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ]))
      ])
    ])
  ]
})

export class SearchMerchantCustomerComponent {
  public status: number = 1;
  public rows: ICustomerSearchModel[] = [];
  public pageSize: number = 5;

  page: number = 1;
  // totalPages : number = 1;

  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'identificationId', name: 'Identification ID', label: 'หมายเลขประจำตัวผู้เสียภาษี / หนังสือเดินทาง', prop: 'identification', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'name', name: 'Name', label: 'ชื่อผู้ใช้ / องค์กร', prop: 'name', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'mobilePhone', name: 'mobilePhone', label: 'เบอร์ติดต่อ', prop: 'mobilePhone', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'Merchant', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public submitted: boolean = false;


  public form: FormGroup = new FormGroup({
    searchType: new FormControl(undefined, Validators.required),
    deviceType: new FormControl('obu'),
    identificationId: new FormControl(undefined, [Validators.minLength(7)]),
    firstName: new FormControl(undefined, [Validators.minLength(2)]),
    lastName: new FormControl(undefined, [Validators.minLength(2)]),
    branchId: new FormControl(undefined, [Validators.minLength(5)]),
    mobilePhone: new FormControl(undefined, [Validators.minLength(10)]),
    corporateName: new FormControl(undefined, [Validators.minLength(2)]),
    faremediaValue: new FormControl(undefined, [Validators.minLength(10)]),
    licensePlate: new FormControl(undefined),
  });

  public tempSearch: boolean = false;

  public isLoading = false;
  public mobilePhone: number[] = [];

  constructor(
    private restApiService: RestApiService,
    public router: Router,
    private fb: FormBuilder,
    private modalDialogService: ModalDialogService
  ) {
    this.form.controls['searchType'].valueChanges.subscribe(x => {
      console.log("[valueChanges] x => ", x);
      this.form.controls['deviceType'].reset();
      this.form.controls['identificationId'].reset();
      this.form.controls['branchId'].reset();
      this.form.controls['firstName'].reset();
      this.form.controls['lastName'].reset();
      this.form.controls['mobilePhone'].reset();
      this.form.controls['corporateName'].reset();
      this.form.controls['faremediaValue'].reset();
      this.form.controls['licensePlate'].reset();
    });
  }
  ngOnInit(): void {
  }

  onSearch() {
    console.log("onSearch", this.form.valid);
    if (this.form.invalid || this.isLoading) return;
    this.isLoading = true;

    let payload: any = {
      limit: this.pageSize,
      page: this.page
    }

    const searchType = this.form.value.searchType;

    if (searchType === 'corporate') {
      if (this.form.value.identificationId) payload.identificationId = this.form.value.identificationId;
      if (this.form.value.corporateName) payload.corporateName = this.form.value.corporateName;
      if (this.form.value.branchId) payload.branchId = this.form.value.branchId;
      if (this.form.value.mobilePhone) payload.mobilePhone = this.form.value.mobilePhone;
      this.searchByCoporate(payload);
    } else if (searchType === 'personal') {
      if (this.form.value.identificationId) payload.identificationId = this.form.value.identificationId;
      if (this.form.value.firstName) payload.firstName = this.form.value.firstName;
      if (this.form.value.lastName) payload.lastName = this.form.value.lastName;
      if (this.form.value.mobilePhone) payload.mobilePhone = this.form.value.mobilePhone;
      this.searchByPersonal(payload);
    } else if (searchType === 'international') {
      const payload: ISearchJuristicRequest = {
        ...(
          this.form.value.identificationId ? {
            identificationId: this.form.value.identificationId
          } : {}
        ),
        ...(
          this.form.value.firstName ? {
            firstName: this.form.value.firstName
          } : {}
        ),
        ...(
          this.form.value.lastName ? {
            lastName: this.form.value.lastName
          } : {}
        ),
        ...(
          this.form.value.mobilePhone ? {
            mobilePhone: this.form.value.mobilePhone
          } : {}
        ),
        limit: this.pageSize,
        page: this.page
      };
      console.log(payload);

      this.searchByJuristic(payload);
    } else if (searchType === 'device') {
      if (this.form.value.deviceType) payload.type = this.form.value.deviceType.toUpperCase();
      if (this.form.value.faremediaValue) payload.value = this.form.value.faremediaValue;
      this.searchByFaremedia(payload);
    } else if (searchType === 'licensePlate') {
      console.log("[onSearch] ", this.form.get('licensePlate')?.value);
    }

  }

  searchByPersonal(payload: any) {
    this.modalDialogService.loading();
    this.restApiService.postBackOffice('customer/search-by-personal', payload).pipe(first()).subscribe({
      next: (res: ResponseMessageModel) => {
        let response = res as ResponseModel<IPaginationModel<Array<ICustomerSearchModel>>>;
        this.rows = response.data.elements;
        // this.totalPages = response.data.totalPages;
        this.collectionSize = response.data.totalElements;
        console.log("[searchByPersonal] collectionSize => ", this.collectionSize);
        this.isLoading = false;
        this.tempSearch = true;
        this.modalDialogService.hideLoading();
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        console.error(err);
        this.isLoading = false;
        this.modalDialogService.handleError(err);
      }
    });
  }

  searchByJuristic(payload: ISearchJuristicRequest) {
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModelWithRequestParam<ISearchJuristicRequest, ISearcnCustomerResponse>('customer/search/foreigner', payload).pipe(first()).subscribe({
      next: (res) => {
        this.rows = res.data.elements;
        this.collectionSize = res.data.totalElements;
        this.isLoading = false;
        this.tempSearch = true;
        this.modalDialogService.hideLoading();
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        console.error(err);
        this.isLoading = false;
        this.modalDialogService.handleError(err);
      }
    });
  }

  searchByCoporate(payload: any) {
    this.modalDialogService.loading();
    this.restApiService.postBackOffice('customer/search-by-corporate', payload).pipe(first()).subscribe({
      next: (res: ResponseMessageModel) => {
        let response = res as ResponseModel<IPaginationModel<Array<ICustomerSearchModel>>>;
        this.rows = response.data.elements;
        // this.totalPages = response.data.totalPages;
        this.collectionSize = response.data.totalElements;
        this.isLoading = false;
        this.tempSearch = true;
        this.modalDialogService.hideLoading();
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        console.error(err);
        this.isLoading = false;
        this.modalDialogService.handleError(err);
      }
    });
  }

  searchByFaremedia(payload: any) {
    this.modalDialogService.loading();
    let x = this.restApiService.postBackOffice('customer/search-by-faremedia', payload).pipe(first()).subscribe({
      next: (res: ResponseMessageModel) => {
        let response = res as ResponseModel<IPaginationModel<Array<ICustomerSearchModel>>>;
        this.rows = response.data.elements;
        // this.totalPages = response.data.totalPages;
        this.collectionSize = response.data.totalElements;
        this.isLoading = false;
        this.tempSearch = true;
        this.modalDialogService.hideLoading();
      },
      error: (err) => {
        console.error(err);
        this.modalDialogService.hideLoading();
        this.isLoading = false;
        this.modalDialogService.handleError(err);
      }
    });
  }

  onChangePage(event: number) {
    this.page = event;
    this.onSearch();
  }

  onAction(event: RowActionEventModel) {
    if (event.action === 'description' && event.row) {
      const row = event.row as CustomerModel;
      this.router.navigate(['work-space/merchant/' + row.id]);
      console.log(row.id);
    }
  }

  onBack() {
    this.submitted = false;
    this.page = 1;
    this.tempSearch = false;
    this.form.reset();
    this.form.controls['deviceType'].setValue('obu');
  }

  onBackToHome() {
    this.router.navigate(['work-space/menu-option']);
  }

}
