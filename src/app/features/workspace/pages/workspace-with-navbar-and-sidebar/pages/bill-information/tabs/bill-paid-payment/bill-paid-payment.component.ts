import { Component, Input , OnInit } from '@angular/core';
import { CustomColumnModel, CarInfoModel, ReponseWalletSummaryModel, WalletSummaryModel, ReponseCustomerObuModel, ObuInfoModel, RowActionEventModel, IWalletInfoModel } from '../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../core/services';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'bill-paid-payment',
  templateUrl: './bill-paid-payment.component.html',
  styleUrl: './bill-paid-payment.component.scss'
})
export class BillPaidPaymentComponent {

  public limitRow: number = 5;
  public pages: number = 1;
  public collectionSize: number = 0;
  public getPaidPaymentColumns: CustomColumnModel[] = [
    { id: 'date', name: 'Date', label: 'วันที่ และ เวลา', prop: 'date', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'getBag', name: 'GetBag', label: 'กระเป๋าเงิน', prop: 'getBag', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'paymentPaid', name: 'PaymentPaid', label: 'ช่องทางการชำระเงิน', prop: 'paymentPaid', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text'},
    { id: 'bank', name: 'Bank', label: 'ธนาคาร', prop: 'bank', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'cardNo', name: 'CardNo', label: 'หมายเลขบัตร / บัญชี', prop: 'cardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'moneyAmout', name: 'MoneyAmout', label: 'จำนวนเงิน', prop: 'moneyAmout', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'status', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },

];

  constructor(
    private restApiService: RestApiService, private modalDialogService: ModalDialogService
  ) {
    this.getPaidPaymentRows = [
      {
        date: '2024-03-05 14:06:17',
        getBag: 'EWL2024010001',
        paymentPaid: 'Credit Card',
        bank: 'กรุงไทย',
        cardNo: '123 1234 1234 1234',
        moneyAmout: '10,000.00',
        status: 'ชำระเงินแล้ว',
        
      },
      {
        date: '2024-03-05 14:06:17',
        getBag: 'EWL2024010001',
        paymentPaid: 'Bank Account',
        bank: 'กรุงไทย',
        cardNo: '123 1234 1234 1234',
        moneyAmout: '1,000.00',
        status: 'ชำระเงินแล้ว',
        
      },
    ]
  }

  cardNO() {
    this.cardNO = this.cardNO
  }

  public getPaidPaymentRows: any[] = [];
  public usePointRows: any[] = [];

  public isLoading: boolean = false;

  ngOnInit(): void { }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

  onChangeNav() {
    this.pages = 1;
  }

  onChangeWallets(event: IWalletInfoModel) {
    this.pages = 1;
    console.log(event);
  }
}
