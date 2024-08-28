import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { CarInfoModel, CustomColumnModel, CustomerModel, IResponseTransactionSuspensionModal, ITransactionSuspensionElementModal, RowActionEventModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { TransactionSuspensionModalComponent } from '../../modals/transaction-suspension-modal/transaction-suspension-modal.component';
import { SuspendModalComponent } from '../../../workspace-with-navbar-and-sidebar/modals/suspend-modal/suspend-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCarModalComponent } from '../../../workspace-with-navbar-and-sidebar/modals/edit-car-modal/edit-car-modal.component';

@Component({
  selector: 'app-transaction-suspension-management',
  templateUrl: './transaction-suspension-management.component.html',
  styleUrl: './transaction-suspension-management.component.scss'
})
export class TransactionSuspensionManagementComponent {

  @Input() public customer: CustomerModel | undefined;
  @Input() public carInfo: CarInfoModel | any = {} as CarInfoModel;

  form: FormGroup;

  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 10;
  public isLoading: boolean = false;
  public columns: CustomColumnModel[] = [
    { id: 'transactionDate', name: 'Transaction Date', label: 'วันที่ และ เวลา ที่สร้าง', prop: 'date', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D/MM/BBBB HH:mm:ss', locale: 'th' } },
    { id: 'name', name: 'Name', label: 'ชื่อผู้ใช้งาน', prop: 'name', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'statusName', name: 'StatusName', label: 'สถานะ', prop: 'statusName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'nameEmployee', name: 'Name Employee', label: 'ชื่อพนักงานทำรายการ', prop: 'empName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'isBlacklist', name: 'Is Blacklist', label: 'ระงับการใช้งาน', prop: 'isBlacklist', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean-click', textWithBoolean: { classCondition1: 'text-primary text-underline', textCondition1: 'ยกเลิกการระงับการใช้งาน', classCondition2: 'text-red text-underline', textCondition2: 'ระงับการใช้งาน' } }
  ];
  public rows: ITransactionSuspensionElementModal[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService,
    private ngbModal: NgbModal
  ) 
  {
    this.form = this.formBuilder.group({
      search: new FormControl(undefined, [Validators.required])
    });
  }

  onSearch() {
    this.load();
  }

  load() {
    this.modalDialogService.loading();
    this.isLoading = true;
    const data = {
      limit: 5,
      page: 1,
      identificationId: this.form.get('search')?.value
    }
    this.restApiService
      .postBackOffice('customer/search-by-cid', data)
      .pipe(
        first(),
        map(res => res as IResponseTransactionSuspensionModal)
      ).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          this.isLoading = false;
          this.rows = res.data.elements;
          this.collectionSize = res.data.totalElements;
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.handleError(err);
          this.isLoading = false;
        }
      });
  }

  onClickBlacklist(event: RowActionEventModel): void {
    console.log("[onClickBlacklist] event => ", event);
    const modalRef = this.ngbModal.open(TransactionSuspensionModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.componentInstance.row = event.row;
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[onAction] result => ', result);
          if(result) {
            this.rows = [];
            if(this.form.get('search')?.value) {
              this.load();
            }
          }
        }
      },
      (reason) => {
        console.log('[onAction] reason => ', reason);
      }
    );
  }
   
    // modalRef.componentInstance.customer = customer;
    // modalRef.componentInstance.carInfo = carInfo;
  
  //   modalRef.result.then(
  //     (result) => {
  //       console.log('[openSuspendModal] result => ', result);
  //       if (result) {
  //         // Action something Modal 
  //       }
  //     },
  //     (reason) => {
  //       console.log('[openSuspendModal] reason => ', reason);
  //     }
  //   );
  // }

  // onClickOpenSuspendModal() {
  //   const customer = ('birthdate);
  //   const carInfo = ("service");
    
  //   this.openSuspendModal(customer, carInfo);
  // } 

}
