import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { first, map } from 'rxjs';
import { TopupPayloadModel, TopupModel, CustomColumnModel, ReponseTopupModel, RowActionEventModel } from '../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../core/services';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'waiting-payment',
  templateUrl: './waiting-payment.component.html',
  styleUrl: './waiting-payment.component.scss'
})
export class WaitingPaymentComponent implements OnInit {

  @Input() public tempSearch: TopupPayloadModel | undefined;

  public rows: TopupModel[] = [];
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

  @Output() public onLoading: EventEmitter<boolean> = new EventEmitter<boolean>(false)

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
  }

  ngOnInit(): void {
    if (this.tempSearch) {
      this.loadTopupInformation(this.tempSearch);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("[ngOnChanges]");
    const tempSearch = changes['tempSearch'];
    if (tempSearch.previousValue) {
      this.loadTopupInformation(tempSearch.currentValue);
    }
  }

  loadTopupInformation(data: TopupPayloadModel) {
    this.isLoading = true;
    this.onLoading.emit(true);
    this.modalDialogService.loading();
    const mockupData = {
      requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: "1"
      },
      status: 'pending',
      from: data.from,
      to: data.to,
      walletId: data.walletId,
      page: data.page
    };
    this.restApiService
      .postBackOffice('transaction-history/get-payment', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseTopupModel)
      )
      .subscribe({
        next: (res) => {
          console.log(res)
          this.rows = res.transactions;
          this.collectionSize = res.totalTransactions;
          this.isLoading = false;
          this.onLoading.emit(false);
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.onLoading.emit(false);
          this.modalDialogService.hideLoading();
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', `${err.body.errorMessage}`);
        }
      });
  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

}
