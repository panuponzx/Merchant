import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CustomColumnModel, ReponseTopupModel, RowActionEventModel, TopupModel, TopupPayloadModel } from '../../../../../../../../core/interfaces';
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

  
  @Input() public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 10;
  public columns1: CustomColumnModel[] = [
    { id: 'Transaction Date', name: 'Transaction Date', label: 'วันที่ และ เวลา', prop: 'TransactionDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'walletNameout', name: 'walletNameout', label: 'กระเป่าเงินออก', prop: 'walletNameout', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'walletNamein', name: 'Wallet Name in', label: 'กระเป่าเงินเข้า', prop: 'walletNamein', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'amount', name: 'Amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'number', numberFormat: '1.2-2' },
    { id: 'type', name: 'Type', label: 'ประเภท', prop: 'status', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' }
  ];
  
  public rows1 = [
    { TransactionDate: new Date('2024-04-15T08:30:00'), walletNamein: 'Wallet A', walletNameout: 'Wallet B', amount: 500.25, status: 'โอนออก' },
    { TransactionDate: new Date('2024-04-16T10:45:00'), walletNamein: 'Wallet B', walletNameout: 'Wallet C', amount: 1000.75, status: 'รับโอน' },
    { TransactionDate: new Date('2024-04-17T14:20:00'), walletNamein: 'Wallet C', walletNameout: 'Wallet A', amount: 750.50, status: 'โอนออก' },
    { TransactionDate: new Date('2024-04-18T16:55:00'), walletNamein: 'Wallet A', walletNameout: 'Wallet B', amount: 300.30, status: 'รับโอน' },
    { TransactionDate: new Date('2024-04-19T20:10:00'), walletNamein: 'Wallet B', walletNameout: 'Wallet C', amount: 600.60, status: 'โอนออก' }
  ];
  
  
  
  public isLoading: boolean = false;

  @Output() public onLoading: EventEmitter<boolean> = new EventEmitter<boolean>(false)

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // ngOnInit(): void {
  //   if (this.tempSearch) {
  //     this.loadTopupInformation(this.tempSearch);
  //   }
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const tempSearch = changes['tempSearch'];
  //   if (tempSearch.previousValue) {
  //     this.loadTopupInformation(tempSearch.currentValue);
  //   }
  // }

  // loadTopupInformation(data: TopupPayloadModel) {
  //   this.isLoading = true;
  //   this.onLoading.emit(true);
  //   this.modalDialogService.loading();
    /* Commented out for testing without API call
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
      .postBackOffice('transaction-history/get-topup', mockupData)
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
        }
      });
    */
  }

  // onChangePage(event: number) {
  //   this.pages = event;
  // }

  // onAction(event: RowActionEventModel) {
  //   console.info(event)
  // }

// }
