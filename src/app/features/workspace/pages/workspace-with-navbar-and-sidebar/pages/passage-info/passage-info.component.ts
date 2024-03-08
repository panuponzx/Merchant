import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Observable, zip } from 'rxjs';
import { CustomColumnModel, CustomeActivatedRouteModel, CustomerModel, ReponseCustomerModel, ReponseWalletSummaryModel, ResponseHistoryModel, RowActionEventModel, TransactionModel, WalletSummaryModel } from '../../../../../../core/interfaces';
import { HistoryPayloadModel } from '../../../../../../core/interfaces/payload.interface';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { RestApiService } from '../../../../../../core/services';

@Component({
  selector: 'app-passage-info',
  templateUrl: './passage-info.component.html',
  styleUrl: './passage-info.component.scss'
})
export class PassageInfoComponent implements OnInit {

  public title: string | undefined;

  public customerId: string | null = null;
  public customer: CustomerModel | undefined;

  public wallets: WalletSummaryModel[] = [];
  public allWallet: WalletSummaryModel = {
    totalBalance: 0,
    totalPoint: 0,
    totalPointBalance: 0,
    walletId: 0,
    walletName: 'ทุกกระเป๋า',
    walletStatus: 0,
    walletTypeId: 0,
    walletTypeName: 'ทุกกระเป๋า',
    lstCars: [],
    lstObus: []
  }

  public rows: TransactionModel[] = [];
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'createDate', name: 'CreateD ate', label: 'วันที่ และ เวลา', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'route', name: 'Route', label: 'สายทาง', prop: 'route', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'building', name: 'Building', label: 'อาคารด่าน', prop: 'building', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'walletName', name: 'Wallet Name', label: 'กระเป่าเงิน', prop: 'walletName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'smartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'amount', name: 'amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'number', numberFormat: '1.2-2' },
    { id: 'taxInvoice', name: 'Tax Invoice', label: 'ใบกำกับภาษี', prop: 'taxInvoice', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'check-uncheck' },
    { id: 'taxInvoice', name: 'Tax Invoice', label: 'ใบกำกับภาษี', prop: 'taxInvoice', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break text-red-exat', type: 'text' },
    { id: 'detail', name: 'detail', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(undefined),
    endDate: new FormControl(undefined),
    walletId: new FormControl(this.allWallet.walletId, [ Validators.required ])
  });

  public tempSearch: HistoryPayloadModel | undefined;

  public isLoading: boolean = false;
  public isLoadingSearch: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private transformDatePipe: TransformDatePipe
  ) {
    this.title = (this.activatedRoute as CustomeActivatedRouteModel).routeConfig.data?.label;
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.customerId)  {
      this.getCustomerInfo();
    }
  }

  getCustomerInfo() {
    this.isLoading = true;
    zip(
      this.getCustomer(),
      this.getWalletInfo()
    )
    .pipe()
    .subscribe({
      next: (info) => {
        if (info[0].customer) {
          this.customer = info[0].customer;
        }
        if (info[1].lstSummary) {
          this.wallets = [...[this.allWallet], ...info[1].lstSummary];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getCustomer() {
    const mockupData = {
      queryType: 2,
      customer: {
          id: this.customerId,
          requestParam: {
              reqId: "23498-sss-k339c-322s2",
              channelId: 1
          }
      }
    };
    return this.restApiService.post('get-customer', mockupData) as Observable<ReponseCustomerModel>;
  }

  getWalletInfo() {
    const mockupData = {
      id: this.customerId,
      requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: "1"
      }
    };
    return this.restApiService.post('get-summary', mockupData) as Observable<ReponseWalletSummaryModel>;
  }

  onSearch() {
    if (this.form.invalid || this.isLoadingSearch) return;
    this.isLoadingSearch = true;
    const searchValue = this.getSearchValue(1);
    this.tempSearch = searchValue;
    this.pages = searchValue.offset;
    this.loadHistory(searchValue);
  }

  getSearchValue(page: number): HistoryPayloadModel {
    const formValue = this.form.value;
    const { walletId, startDate } = formValue;
    const newStartDate = this.transformDatePipe.transform(startDate, 'YYYY-MM-DD', 'th');
    // const value: HistoryPayloadModel = { walletId: walletId, startDate: newStartDate ,offset: 1, limit: this.limitRow };
    const value: HistoryPayloadModel = { walletId: '5111000000180', startDate: '2024-03-01', offset: page, limit: this.limitRow  }
    return value;
  }

  loadHistory(data: HistoryPayloadModel) {
    this.isLoadingSearch = true;
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
        map(res => res as ResponseHistoryModel)
      )
      .subscribe({
        next: (res) => {
          console.log(res)
          // this.rows = res.transactions.filter(x => x.typeId === '3');
          this.rows = res.transactions;
          this.collectionSize = res.totalTransactions;
          this.isLoadingSearch = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoadingSearch = false;
        }
      })
  }

  onClear() {
    this.router.navigate(['/work-space/search-user']);
  }


  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

}
