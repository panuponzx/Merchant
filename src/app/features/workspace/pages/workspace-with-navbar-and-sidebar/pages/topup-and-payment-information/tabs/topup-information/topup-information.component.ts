import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { first, map } from 'rxjs';
import { CustomColumnModel, ReponseTopupModel, RowActionEventModel, TopupModel } from '../../../../../../../../core/interfaces';
import { HistoryPayloadModel } from '../../../../../../../../core/interfaces/payload.interface';
import { RestApiService } from '../../../../../../../../core/services';

@Component({
  selector: 'topup-information',
  templateUrl: './topup-information.component.html',
  styleUrl: './topup-information.component.scss'
})
export class TopupInformationComponent implements OnInit {

  @Input() public tempSearch: HistoryPayloadModel | undefined;

  public rows: TopupModel[] = [];
  @Input() public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'transactionDate', name: 'Transaction Date', label: 'วันที่ และ เวลา', prop: 'properties.transactionDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'walletName', name: 'Wallet Name', label: 'กระเป่าเงิน', prop: 'wallet.walletName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'channel', name: 'Channel', label: 'ช่องทางการชำระ', prop: 'channel', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'bankName', name: 'Bank Name', label: 'ธนาคาร', prop: 'properties.bankName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'bankAccount', name: 'Bank Account', label: 'หมายเลขบัญชี / บัญชี', prop: 'properties.bankAccountNo', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text'},
    { id: 'amount', name: 'Amount', label: 'จำนวนเงิน', prop: 'properties.amount', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'number', numberFormat: '1.2-2' },
    { id: 'transactionType', name: 'Transaction Type', label: 'ประเภท', prop: 'properties.transactionType', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' }
  ];

  public isLoading: boolean = false;

  @Output() public onLoading: EventEmitter<boolean> = new EventEmitter<boolean>(false)

  constructor(
    private restApiService: RestApiService
  ) {
  }

  ngOnInit(): void {
    if (this.tempSearch) {
      this.loadTopupInformation(this.tempSearch);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tempSearch = changes['tempSearch'];
    if (tempSearch) {
      this.loadTopupInformation(tempSearch.currentValue);
    }
  }

  loadTopupInformation(data: HistoryPayloadModel) {
    this.isLoading = true;
    this.onLoading.emit(true);
    const mockupData = {
      requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: "1"
      },
      date: data.startDate,
      walletId: data.walletId,
      limit: data.limit,
      offset: data.offset
    };
    this.restApiService
      .post('get-transactions-history', mockupData)
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
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.onLoading.emit(false);
        }
      })
  }

  onChangePage(event: number) {
    this.pages = event;
    // const searchValue = this.getSearchValue(this.pages);
    // this.tempSearch = this.tempSearch;
    // this.loadHistory(searchValue);
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

}
