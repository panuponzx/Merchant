import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
import { CustomColumnModel, CustomerModel, CustomerSearchModel, ReponseSearchCustomerModel, ResponseMessageModel, ResponseSearchCutomerModel, RowActionEventModel } from '../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../core/services';
import { style, animate, transition, trigger, stagger, query } from '@angular/animations';
import { id } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
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
        animate('400ms', style({ opacity: 0 }))
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
export class SearchUserComponent implements OnInit {
  public status: number = 1;
  public rows: CustomerSearchModel[] = [];
  public pageSize: number = 5;

  page : number = 1;
  // totalPages : number = 1;

  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'identificationId', name: 'Identification ID', label: 'หมายเลขประจำตัวผู้เสียภาษี / หนังสือเดินทาง', prop: 'identification', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'name', name: 'Name', label: 'ชื่อผู้ใช้ / องค์กร', prop: 'name', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'mobilePhone', name: 'mobilePhone', label: 'เบอร์ติดต่อ', prop: 'mobilePhone', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    searchType: new FormControl(undefined, [Validators.required]),
    deviceType: new FormControl('obu'),

    identificationId: new FormControl(undefined,),
    firstName: new FormControl(undefined,),
    lastName: new FormControl(undefined,),
    mobilePhone: new FormControl(undefined,),
    corporateName: new FormControl(undefined,),

    faremediaValue: new FormControl(undefined,),
  });

  public tempSearch: boolean = false;

  public isLoading = false;


  constructor(
    private restApiService: RestApiService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.form.valueChanges.subscribe(x => {
      console.log("[valueChanges] x => ", x);
    });
  }
  ngOnInit(): void {
  }



  onSearch() {
    console.log(this.form.invalid );
    
    console.log((
      this.form.invalid &&
      (this.form.get('searchType')?.value === 'personal') && 
      !this.form.get('identificationId')?.value && 
      !this.form.get('firstName')?.value && 
      !this.form.get('lastName')?.value && 
      !this.form.get('corporateName')?.value && 
      !this.form.get('mobilePhone')?.value));
    
    if (this.form.invalid || this.isLoading) return;
    this.isLoading = true;

    const searchType = this.form.value.searchType;


    let payload: any = {
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: "1"
      },
      limit: this.pageSize,
      page: this.page
    }

    if (searchType === 'corporate') {
      if(this.form.value.identificationId) payload.identificationId = this.form.value.identificationId;
      if(this.form.value.corporateName) payload.corporateName = this.form.value.corporateName;
      if(this.form.value.mobilePhone) payload.mobilePhone = this.form.value.mobilePhone;
      this.searchByCoporate(payload);
    } else if (searchType === 'personal' || searchType === 'international') {
      if(this.form.value.identificationId) payload.identificationId = this.form.value.identificationId;
      if(this.form.value.firstName) payload.firstName = this.form.value.firstName;
      if(this.form.value.lastName) payload.lastName = this.form.value.lastName;
      if(this.form.value.corporateName) payload.corporateName = this.form.value.corporateName;
      if(this.form.value.mobilePhone) payload.mobilePhone = this.form.value.mobilePhone;
      this.searchByPersonal(payload);
    } else if (searchType === 'device') {
      if(this.form.value.deviceType) payload.type = this.form.value.deviceType.toUpperCase();
      if(this.form.value.faremediaValue) payload.value = this.form.value.faremediaValue;
      // console.log(payload);
      this.searchByFaremedia(payload);
    }


    // const mockupData = {
    //   customer: {
    //     citizenId: this.form.controls['citizenId'].value
    //   },
    //   requestParam: {
    //       reqId: "23498-sss-k339c-322s2",
    //       channelId: "1"
    //   }
    // }
    // console.log(this.form.controls['citizenId'].value);


    // this.restApiService
    //   .post('get-customers', mockupData)
    //   .pipe(
    //     first(),
    //     map(res => res as ReponseSearchCustomerModel)
    //   )
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res)
    //       // this.rows = res.customers;
    //       this.rows = res.customers.map(element => {
    //         if(element['firstName'] == undefined){
    //           element['firstName'] = element['firstNameEng']
    //         }
    //         if(element['lastName'] == undefined){
    //           element['lastName'] = element['lastNameEng']
    //         }
    //         return element
    //       });


    //       this.collectionSize = this.rows.length;
    //       this.isLoading = false;
    //       this.tempSearch = mockupData.customer.citizenId;
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       this.isLoading = false;
    //     }
    //   });

  }

  searchByPersonal(payload: any) {
    this.restApiService.postBackOffice('customer/search-by-personal', payload).pipe(first()).subscribe({
      next: (res: ResponseMessageModel) => {
        let response = res as ResponseSearchCutomerModel;
        this.rows = response.data.elements;
        // this.totalPages = response.data.totalPages;
        this.collectionSize = response.data.totalElements;
        console.log("[searchByPersonal] collectionSize => ", this.collectionSize);
        this.isLoading = false;
        this.tempSearch = true;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  searchByCoporate(payload: any) {
    this.restApiService.postBackOffice('customer/search-by-corporate', payload).pipe(first()).subscribe({
      next: (res: ResponseMessageModel) => {
        let response = res as ResponseSearchCutomerModel;
        this.rows = response.data.elements;
        // this.totalPages = response.data.totalPages;
        this.collectionSize = response.data.totalElements;
        this.isLoading = false;
        this.tempSearch = true;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  searchByFaremedia(payload: any) {
    let x = this.restApiService.postBackOffice('customer/search-by-faremedia', payload).pipe(first()).subscribe({
      next: (res: ResponseMessageModel) => {
        let response = res as ResponseSearchCutomerModel;
        this.rows = response.data.elements;
        // this.totalPages = response.data.totalPages;
        this.collectionSize = response.data.totalElements;
        this.isLoading = false;
        this.tempSearch = true;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
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
      this.router.navigate(['work-space/user-info/general-info/' + row.id]);
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
