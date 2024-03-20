import { Component, Input } from '@angular/core';
import { CustomColumnModel, RowActionEventModel } from '../../../../../../../../core/interfaces';

@Component({
  selector: 'cancel-device-waiting-for-approval',
  templateUrl: './cancel-device-waiting-for-approval.component.html',
  styleUrl: './cancel-device-waiting-for-approval.component.scss'
})
export class CancelDeviceWaitingForApprovalComponent {

  public rows: any[] = [];
  @Input() public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'createDate', name: 'Create Date', label: 'วันที่ และ เวลา', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'walletName', name: 'Wallet Name', label: 'กระเป่าเงิน', prop: 'walletName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'paymentMethod', name: 'Payment Method', label: 'ช่องทางการชำระ', prop: 'paymentMethod', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'bankName', name: 'Bank Name', label: 'ธนาคาร', prop: 'bankName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'bankAccount', name: 'Bank Account', label: 'หมายเลขบัญชี / บัญชี', prop: 'bankAccountNo', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text'},
    { id: 'amount', name: 'Amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'number', numberFormat: '1.2-2' },
    { id: 'type', name: 'Type', label: 'ประเภท', prop: 'status', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' }
  ];

  public isLoading: boolean = false;

  
  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }
  
}
