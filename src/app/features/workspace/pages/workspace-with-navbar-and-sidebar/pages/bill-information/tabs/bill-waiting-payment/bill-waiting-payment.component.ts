import { Component, Input, OnInit } from '@angular/core';
import { CustomColumnModel, CarInfoModel, ReponseWalletSummaryModel, WalletSummaryModel, ReponseCustomerObuModel, ObuInfoModel, RowActionEventModel, IWalletInfoModel, IBill, ResponseModel, IBillDetail } from '../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../core/services';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';
import moment from 'moment';
//import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'bill-waiting-payment',
  templateUrl: './bill-waiting-payment.component.html',
  styleUrl: './bill-waiting-payment.component.scss'
})
export class BillWaitingPaymentComponent {
  @Input() public isLoading: boolean = false;
  @Input() public data: IBill[] = [];

  public getBillWaitingPaymentColumns: CustomColumnModel[] = [
    { id: 'issueDate', name: 'issueDate', label: 'วันที่ และ เวลา', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'walletId', name: 'walletId', label: 'กระเป๋าเงิน', prop: 'walletId', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'billCycle', name: 'billCycle', label: 'รอบการชำระเงิน', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'MMMM BBBB', locale: 'th' } },
    { id: 'amount', name: 'amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'currency', currency: { currencyCode: ' ', display: 'symbol', digitsInfo: '1.2-2' } },
    { id: 'bill', name: 'Bill', label: 'ใบแจ้งหนี้', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'view', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];


  constructor(
    private restApiService: RestApiService, private modalDialogService: ModalDialogService) { }

  ngOnInit(): void {
    console.log(this.data);

  }

  loadBillDetail(event: RowActionEventModel) {
    const billId = event.row.id;
    this.modalDialogService.loading();
    const payload = {
      billId: billId,
    };
    console.log("loadBillDetail", payload);

    return this.restApiService
      .postBackOffice('bill/get/detail', payload)
      .pipe(
        first(),
        map(res => res as ResponseModel<IBillDetail>)
      ).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          console.log(res.data);

          this.printPDF(res.data);
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err.message);
          this.modalDialogService.handleError(err);
        }
      });

  }

  printPDF(billDetail: IBillDetail) {

    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    // const data = `<div class="bill-details">
    //            <div class="bill-details">
    //           <h2>Detail</h2>
    //           <p>วันที่ และ เวลา: ${rowData.date}</p>
    //           <p>กระเป๋าเงิน: ${rowData.getBag}</p>
    //           <p>สถานะ: ${rowData.status}</p>
    //           <p>รอบการชำระเงิน: ${rowData.payRound}</p>
    //           <p>จำนวนเงิน: ${rowData.moneyAmout}</p>
    //           </div>
    // `
    const header = `<div class="bill-header">
    <h2>Header</h2>
    <p>วันที่ และ เวลา: ${billDetail.header.issueDate}</p>
    <p>กระเป๋าเงิน: ${billDetail.header.walletId}</p>
    <p>สถานะ: ${billDetail.header.status}</p>
    <p>รอบการชำระเงิน: ${moment(billDetail.header.issueDate).format("MMMM YYYY")}</p>
    <p>จำนวนเงิน: ${billDetail.header.amount}</p>
    </div>
    `

    const transactions = `<div class="bill-transactions">
    <h2>Transactions</h2>
    <table>
    <thead>
    <tr>
    <th>วันที่ และ เวลา</th>
    <th>จำนวนเงิน</th>
    <th>รหัสธุรกรรม</th>
    </tr>
    </thead>
    <tbody>
    ${billDetail.transactions.map((item) => {
      return `<tr>
      <td>${item.transactionDate}</td>
      <td>${item.transactionAmount}</td>
      <td>${item.transactionId}</td>
      </tr>`
    }).join('')}
    </tbody>
    </table>
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
            ${header}
            ${transactions}
            <div class="payment">
            <h2>Payment</h2>
            <p>Ref 1: ${billDetail.payment.ref1} </p>
            <p>Ref 2: ${billDetail.payment.ref2} </p>
            <svg id="barcode1"></svg>
            <div id="qrcode"></div>
            </div>
            <script type="text/javascript">
                JsBarcode("#barcode1", "${billDetail.payment.barCodeCrossBank}", {
                    format: "CODE128",
                    displayValue: true,
                    fontSize: 20,
                    textMargin: 0,
                    fontOptions: "bold",
                });
                new QRCode(document.getElementById("qrcode"), {
                    text: "${billDetail.payment.barCodeCrossBank}",
                    width: 128,
                    height: 128
                });
            </script>
        </body>
        </html>`

    mywindow?.document.write(html)
    mywindow?.document.close(); // necessary for IE >= 10
    mywindow?.focus(); // necessary for IE >= 10*/
    mywindow?.print();
    mywindow?.close();
  };

}

