import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomColumnModel, RowActionEventModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { RegisterCustomerType9Component } from '../../../../modals/register-customer-type-9/register-customer-type-9.component';

@Component({
  selector: 'customer-type-9-management',
  templateUrl: './customer-type-9-management.component.html',
  styleUrl: './customer-type-9-management.component.scss'
})
export class CustomerType9ManagementComponent {
  formSearch: FormGroup;
  public isLoading: boolean = true;
  public limitRow: number = 10;
  public step: number = 0;
  public pages: number = 1;
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 50, minWidth: 50, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'name', name: 'name', label: 'ชื่อหน่วยงาน', prop: 'name', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'detail', name: 'detail', label: 'การจัดการ', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'จัดการ', class: 'btn-link' } },
  ];
  public rows: any[] = [
    {
      id: '1',
      name: "ฝ่ายบำรุงรักษาสถานีไฟฟ้าและระบบไฟฟ้า"
    },
    {
      id: '2',
      name: "ฝ่ายควบคุมงานจราจร"
    },
    {
      id: '3',
      name: "ฝ่ายจัดการจราจร"
    }
  ];
  public collectionSize: number = this.rows.length;
  public selectedCustomerId: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal
  ) {
    this.formSearch = new FormGroup({
      search: new FormControl({ value: undefined, disabled: false }, [Validators.required])
    });
  }

  onActive(event: RowActionEventModel) {
    console.log(event);
    this.selectedCustomerId = event.row.id;
  }
  onChangePage(page: number) {
    this.pages = page;
    console.log('page: ', page);
  }

}
