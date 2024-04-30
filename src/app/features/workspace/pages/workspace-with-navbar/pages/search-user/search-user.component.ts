import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
import { CustomColumnModel, CustomerModel, ReponseSearchCustomerModel, RowActionEventModel } from '../../../../../../core/interfaces';
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
  public rows: CustomerModel[] = [];
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'firstName', name: 'First Name', label: 'ชื่อ', prop: 'firstName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'lastName', name: 'Last Name', label: 'นามสกุล', prop: 'lastName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'citizenId', name: 'Citizen ID', label: 'หมายเลขบัตรประชาชน', prop: 'citizenId', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'customerTypeName', name: 'CustomerTypeName', label: 'ประเภท', prop: 'customerTypeName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'birthdate', name: 'Birthdate', label: 'วันเกิด', prop: 'birthdate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'mobilePhone', name: 'mobilePhone', label: 'เบอร์ติดต่อ', prop: 'mobilePhone', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    customerTypeId: new FormControl('domestic', [ Validators.required ]),
    citizenId: new FormControl(undefined, [ Validators.required ])
  });

  public tempSearch: string | undefined;

  public isLoading = false;


  constructor(
    private restApiService: RestApiService,
    public router: Router,
    private fb: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      customerTypeId: [''], // กำหนดให้ customerTypeId เป็นสตริงเริ่มต้นว่างเปล่า
      citizenId: [undefined, [ Validators.required ]] // เพิ่ม validators ให้ citizenId
    });
  }



  onSearch() {
    if (this.form.invalid || this.isLoading) return;
    this.isLoading = true;
    const mockupData = {
      customer: {
        citizenId: this.form.controls['citizenId'].value
      },
      requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: "1"
      }
    }
    this.restApiService
      .post('get-customers', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseSearchCustomerModel)
      )
      .subscribe({
        next: (res) => {
          console.log(res)
          // this.rows = res.customers;
          this.rows = res.customers.map(element => {
            if(element['firstName'] == undefined){
              element['firstName'] = element['firstNameEng']
            }
            if(element['lastName'] == undefined){
              element['lastName'] = element['lastNameEng']
            }
            return element
          });
         

          this.collectionSize = this.rows.length;
          this.isLoading = false;
          this.tempSearch = mockupData.customer.citizenId;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
     
  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    if (event.action === 'description' && event.row) {
      const row = event.row as CustomerModel;
      this.router.navigate(['work-space/user-info/general-info/' + row.id]);
    }
  }

  onBack() {
    this.submitted = false;
    this.pages = 1;
    this.tempSearch = undefined;
    this.form.reset();
    this.form.controls['customerTypeId'].setValue('domestic');
  }

  onBackToHome() {
    this.router.navigate(['work-space/menu-option']);
  }
}
