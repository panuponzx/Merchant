import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CustomColumnModel, IResponseTransferModel, ITransferModel, ReponseTopupModel, RowActionEventModel, TopupModel, TopupPayloadModel } from '../../../../../../../../core/interfaces';
import { first, map } from 'rxjs';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { RestApiService } from '../../../../../../../../core/services';

@Component({
  selector: 'app-transfer-info',
  templateUrl: './transfer-info.component.html',
  styleUrls: ['./transfer-info.component.scss'] // แก้ไขให้เป็น styleUrls
})
export class TransferInfoComponent implements OnInit {


  @Input() public tempSearch: TopupPayloadModel | undefined;
  @Input() public customerId: string | null = null;

  @Input() public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 10;
  public columns: CustomColumnModel[] = [
    { id: 'Transaction Date', name: 'Transaction Date', label: 'วันที่ และ เวลา', prop: 'transactionDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'From WalletId', name: 'From WalletId', label: 'กระเป่าเงินออก', prop: 'fromWalletId', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'From WalletId', name: 'From WalletId', label: 'ชื่อกระเป่าเงินออก', prop: 'fromWalletName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'To WalletId', name: 'To WalletId', label: 'กระเป่าเงินเข้า', prop: 'toWalletId', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'To WalletId', name: 'To WalletId', label: 'ชื่อกระเป่าเงินเข้า', prop: 'toWalletName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'Amount', name: 'Amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'number', numberFormat: '1.2-2' },
    { id: 'type', name: 'Type', label: 'ประเภท', prop: 'status', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' }
  ];

  public rows: ITransferModel[] = [];

  // public rows = [
  //   { TransactionDate: new Date('2024-04-15T08:30:00'), walletNamein: 'Wallet A', walletNameout: 'Wallet B', amount: 500.25, status: 'Deposit' },
  //   { TransactionDate: new Date('2024-04-16T10:45:00'), walletNamein: 'Wallet B', walletNameout: 'Wallet C', amount: 1000.75, status: 'Withdrawal' },
  //   { TransactionDate: new Date('2024-04-17T14:20:00'), walletNamein: 'Wallet C', walletNameout: 'Wallet A', amount: 750.50, status: 'Deposit' },
  //   { TransactionDate: new Date('2024-04-18T16:55:00'), walletNamein: 'Wallet A', walletNameout: 'Wallet B', amount: 300.30, status: 'Withdrawal' },
  //   { TransactionDate: new Date('2024-04-19T20:10:00'), walletNamein: 'Wallet B', walletNameout: 'Wallet C', amount: 600.60, status: 'Deposit' }
  // ];



  public isLoading: boolean = false;

  @Output() public onLoading: EventEmitter<boolean> = new EventEmitter<boolean>(false)

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
  }
  ngOnInit(): void {
    if (this.tempSearch) {
      this.loadTransfer(this.tempSearch);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tempSearch = changes['tempSearch'];
    if (tempSearch.previousValue) {
      this.loadTransfer(tempSearch.currentValue);
    }
  }

  loadTransfer(data: TopupPayloadModel) {
    this.modalDialogService.loading();
    this.isLoading = true;
    const mockupData = {
      customerId: this.customerId,
      from: data.from,
      to: data.to,
      walletId: data.walletId,
      page: data.page
    };
    this.restApiService
      .post('transaction-history/get-transfer', mockupData)
      .pipe(
        first(),
        map(res => res as IResponseTransferModel)
      )
      .subscribe({
        next: (res: any) => {
          console.log(res)
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].status = 'โอนเงิน';
          }
          this.rows = res.data;
          this.collectionSize = res.totalData;
          this.isLoading = false;
          this.onLoading.emit(false);
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.onLoading.emit(false);
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
          // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
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
