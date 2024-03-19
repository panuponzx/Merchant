import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
import { CustomColumnModel, CustomerModel, ReponseSearchCustomerModel, RowActionEventModel } from '../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../core/services';
import { style, animate, transition, trigger, stagger, query } from '@angular/animations';



@Component({
  selector: 'app-setting-earn-campaign',
  templateUrl: './setting-earn-campaign.component.html',
  styleUrl: './setting-earn-campaign.component.scss'
})
export class SettingEarnCampaignComponent {

  

  public rows: CustomerModel[] = []

  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'firstName', name: 'First Name', label: 'อาคารด่าน', prop: 'firstName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'lastName', name: 'Last Name', label: 'ทุกจำนวนเงินบาท', prop: 'lastName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'citizenId', name: 'Citizen ID', label: 'จำนวน point ที่ได้รับ', prop: 'citizenId', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'customerTypeName', name: 'CustomerTypeName', label: 'สำหรับประเภทรถ', prop: 'customerTypeName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'birthdate', name: 'Birthdate', label: 'วันที่เปลี่ยนแปลงล่าสุด', prop: 'birthdate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'mobilePhone', name: 'mobilePhone', label: 'ชื่อพนักงานที่สร้าง', prop: 'mobilePhone', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'ตั้งค่า', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
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
    public router: Router
  ) {

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
}
