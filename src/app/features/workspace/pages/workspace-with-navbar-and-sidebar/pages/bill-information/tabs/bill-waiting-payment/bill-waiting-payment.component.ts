import { Component, Input, OnInit } from '@angular/core';
import { CustomColumnModel, CarInfoModel, ReponseWalletSummaryModel, WalletSummaryModel, ReponseCustomerObuModel, ObuInfoModel, RowActionEventModel, IWalletInfoModel } from '../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../core/services';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
//import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'bill-waiting-payment',
  templateUrl: './bill-waiting-payment.component.html',
  styleUrl: './bill-waiting-payment.component.scss'
})
export class BillWaitingPaymentComponent {

  @Input() public initAllWallet: IWalletInfoModel = {
    totalBalance: 0,
    statusName: '',
    totalPointBalance: 0,
    id: 0,
    name: 'ทุกกระเป๋า',
    statusId: 0,
    typeId: 0,
    typeName: 'ทุกกระเป๋า',
    creditBalance: 0,
    lastUse: new Date(),
    totalPoint: 0
  }
  @Input() public form: FormGroup = new FormGroup({
    startDate: new FormControl(new Date(), [Validators.required]),
    endDate: new FormControl(new Date(), [Validators.required]),
    walletId: new FormControl(this.initAllWallet.id, [Validators.required])
  });



  public limitRow: number = 5;
  public pages: number = 1;
  public collectionSize: number = 0;
  public getBillWaitingPaymentColumns: CustomColumnModel[] = [
    { id: 'date', name: 'Date', label: 'วันที่ และ เวลา', prop: 'date', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'getBag', name: 'GetBag', label: 'กระเป๋าเงิน', prop: 'getBag', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'status', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'payDate', name: 'PayDate', label: 'รอบการชำระเงิน', prop: 'date', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'moneyAmout', name: 'MoneyAmout', label: 'จำนวนเงิน', prop: 'moneyAmout', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'bill', name: 'Bill', label: 'ใบแจ้งหนี้', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'view', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  getBillWaitingPaymentRows = [
    {
      date: '2024-03-05 14:06:17',
      getBag: 'EWL2024010001',
      status: 'รอการชำระเงิน',
      payRound: '2024-03-05',
      moneyAmout: '10,000.00',
    },
    {
      date: '2024-03-05 14:06:17',
      getBag: 'EWL2024010002',
      status: 'รอการชำระเงิน',
      payRound: '2024-03-05',
      moneyAmout: '1,000.00',
    },
  ]
  public mywindow: any;

  constructor(
    private restApiService: RestApiService, private modalDialogService: ModalDialogService) { }


  printPDF = (rowData: { date: string; getBag: string; status: string; payRound: string; moneyAmout: string; }) => {
    this.mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    const data = `<div class="bill-details">
             <div class="bill-details">
            <h2>Detail</h2>
            <p>วันที่ และ เวลา: ${rowData.date}</p>
            <p>กระเป๋าเงิน: ${rowData.getBag}</p>
            <p>สถานะ: ${rowData.status}</p>
            <p>รอบการชำระเงิน: ${rowData.payRound}</p>
            <p>จำนวนเงิน: ${rowData.moneyAmout}</p>
            </div>
    `
    const html = `<!DOCTYPE html>
      <html>

      <head>
          <title>QR Code</title>
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
          <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
          
      </head>

      <body>
          <div > ${data} </div>
          <div class="footer">
          <svg id="barcode1"></svg>
          
          <div id="qrcode"></div>
          </div>
          <script type="text/javascript">
              JsBarcode("#barcode1", "123456789012", {
                  format: "CODE128",
                  displayValue: true,
                  fontSize: 20,
                  textMargin: 0,
                  fontOptions: "bold",
              });
              new QRCode(document.getElementById("qrcode"), {
                  text: "123456789012",
                  width: 128,
                  height: 128
              });
          </script>

      </body>

      </html>
`

    this.mywindow.document.write(html)

    this.mywindow.document.close(); // necessary for IE >= 10
    this.mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(() => {
      this.mywindow.print();
      this.mywindow.close();
    }, 1000);
    return true;
  };

  getItemByIndex(index: number): void {
    const item = this.getBillWaitingPaymentRows[1];
    console.log(item);
  }

  ngOnInit(): void {


  }

  // loadBillWaitingPayment() {
  //   this.modalDialogService.loading();
  //   const mockupData = {
  //     customer: {

  //     },
  //   };
  //   return this.restApiService
  //     .postBackOffice('', mockupData)
  //     .pipe(
  //       first(),
  //       map(res => res as any)
  //     ).subscribe({
  //       next: (res) => {

  //         this.modalDialogService.hideLoading();
  //       },
  //       error: (err) => {
  //         this.modalDialogService.hideLoading();
  //         console.error(err);
  //         this.modalDialogService.handleError(err);

  //       }
  //     });
  // }

  public isLoading: boolean = false;



  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    const rowIndex = event.index;
    const rowData = this.getBillWaitingPaymentRows[rowIndex];
    this.printPDF(rowData);
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

