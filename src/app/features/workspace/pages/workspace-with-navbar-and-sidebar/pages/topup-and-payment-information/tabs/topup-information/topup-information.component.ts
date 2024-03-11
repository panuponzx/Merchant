import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { first, map } from 'rxjs';
import { CustomColumnModel, ReponseTopupModel, RowActionEventModel, TopupModel } from '../../../../../../../../core/interfaces';
import { TopupPayloadModel } from '../../../../../../../../core/interfaces/payload.interface';
import { RestApiService } from '../../../../../../../../core/services';

@Component({
  selector: 'topup-information',
  templateUrl: './topup-information.component.html',
  styleUrl: './topup-information.component.scss'
})
export class TopupInformationComponent implements OnInit {

  @Input() public tempSearch: TopupPayloadModel | undefined;

  public rows: TopupModel[] = [];
  @Input() public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'transactionDate', name: 'Transaction Date', label: 'วันที่ และ เวลา', prop: 'transactionDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
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
    if (tempSearch.previousValue) {
      this.loadTopupInformation(tempSearch.currentValue);
    }
  }

  loadTopupInformation(data: TopupPayloadModel) {
    this.isLoading = true;
    this.onLoading.emit(true);
    const mockupData = {
      requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: "1"
      },
      from: data.from,
      to: data.to,
      walletId: data.walletId,
      page: data.page
    };
    this.restApiService
      .post('transaction-history/get-topup', mockupData)
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
          this.collectionSize = 1;
          this.rows = [
            {
              transactionId: "TP240307300000008",
              amount: 50,
              bankAccountNo: "22",
              bankName: "name",
              isCancelled: false,
              paymentMethod: "Bank account",
              settlementCode: null,
              status: "เติมเงิน",
              transactionDate: "2024-02-04 19:55:24",
              typeId: null,
              walletId: 2,
              walletName: "Two",
              walletStatus: null,
              walletTypeId: null,
              createBy: null,
              createDate: new Date("2024-03-07 11:18:06")
            } as any
          ]
        }
      })
  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

}
