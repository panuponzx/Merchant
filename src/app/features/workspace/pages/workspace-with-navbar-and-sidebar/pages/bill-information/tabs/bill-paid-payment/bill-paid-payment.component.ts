import { Component, Input, OnInit } from '@angular/core';
import { CustomColumnModel, CarInfoModel, ReponseWalletSummaryModel, WalletSummaryModel, ReponseCustomerObuModel, ObuInfoModel, RowActionEventModel, IWalletInfoModel, IBill } from '../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../core/services';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'bill-paid-payment',
  templateUrl: './bill-paid-payment.component.html',
  styleUrl: './bill-paid-payment.component.scss'
})
export class BillPaidPaymentComponent {

  @Input() public isLoading: boolean = false;
  @Input() public data: IBill[] = [];
  @Input() public collectionSize: number = 0;

  public getPaidPaymentColumns: CustomColumnModel[] = [
    { id: 'issueDate', name: 'issueDate', label: 'วันที่ และ เวลา', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'walletId', name: 'walletId', label: 'กระเป๋าเงิน', prop: 'walletId', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'billCycle', name: 'billCycle', label: 'รอบบิล', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'MMMM BBBB', locale: 'th' } },
    { id: 'amount', name: 'amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'currency', currency: { currencyCode: ' ', display: 'symbol', digitsInfo: '1.2-2' } },
    { id: 'paidDate', name: 'paidDate', label: 'วันที่ชำระเงิน', prop: 'paidDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
  ];

  constructor(
    private restApiService: RestApiService, private modalDialogService: ModalDialogService
  ) { }

}
