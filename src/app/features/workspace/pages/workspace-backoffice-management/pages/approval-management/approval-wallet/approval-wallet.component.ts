import { Component } from '@angular/core';
import { CustomColumnModel, RowActionEventModel } from 'src/app/core/interfaces';

@Component({
  selector: 'approval-wallet',
  templateUrl: './approval-wallet.component.html',
  styleUrl: './approval-wallet.component.scss'
})
export class ApprovalWalletComponent {

  public rows: any = [];
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public isLoading: boolean = false;

  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'paging-no' },
    { id: 'createdDate', name: 'createdDate', label: 'วันที่ และ เวลา ที่สร้าง', prop: 'createdDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'DD/MM/YYYY HH:mm:ss', locale: 'th' } },
    { id: 'userName', name: 'User Name', label: 'ชื่อผู้ใช้', prop: 'JuristicInfo.corporateName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'corporateBranch', name: 'CorporateBranch', label: 'ชื่อสาขา', prop: 'JuristicInfo.branchCode', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'branchId', name: 'BranchId', label: 'หมายเลขสาขาย่อย', prop: 'JuristicInfo.branchName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'status', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'approve-status' },
    { id: 'nameEmpTransaction', name: 'Name Emp Transaction', label: 'ชื่อพนักงานทำรายการ', prop: 'contactPerson.fullName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  // loadPendingRequest(status: PendingRequestStatus, page: number) {
  //   this.isLoading = true;
  //   this.modalDialogService.loading();
  //   this.restApiService.getBackOfficeWithModel<IJuristicInquiryResponse>(`pending-request/inquiry/customers?status=${status}&limit=${this.limitRow}&offset=${(this.pages * this.limitRow) - this.limitRow}`).subscribe({
  //     next: (res) => {
  //       if (res.errorMessage === "Success") {
  //         console.log("[onSubmit] res => ", res);
  //         for (let i = 0; i < res.data.elements.length; i++) {
  //           res.data.elements[i].contactPerson.fullName = `${res.data.elements[i].contactPerson.firstName} ${res.data.elements[i].contactPerson.lastName}`
  //         }
  //         this.rows = res.data.elements;
  //         this.tempRows = this.rows;
  //         this.collectionSize = res.data.totalElements;
  //       } else {
  //         this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
  //       }
  //       this.isLoading = false;
  //       this.modalDialogService.hideLoading();
  //     },
  //     error: (err) => {
  //       this.modalDialogService.hideLoading();
  //       this.isLoading = false;
  //       console.error(err);
  //       this.modalDialogService.handleError(err);
  //       // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
  //     }
  //   })

  // }

  onChangePage(event: number) {
    this.pages = event;
    // console.log("[onChangePage] event => ", event);
    // this.loadPendingRequest(this.status, event);
  }

  onAction(event: RowActionEventModel) {
    console.log("[onAction] event => ", event);
    
  }

}
