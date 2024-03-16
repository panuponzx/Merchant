import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Observable, zip } from 'rxjs';
import { CustomColumnModel, CustomeActivatedRouteModel, CustomerModel, ReponseCustomerModel, ReponseWalletSummaryModel, RowActionEventModel, WalletSummaryModel, PassageInformationModel, PassageInformationPayloadModel, ResponsePassageInformationModel } from '../../../../../../core/interfaces';
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

  public rows: PassageInformationModel[] = [];
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'createDate', name: 'Create Date', label: 'วันที่ และ เวลา', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'route', name: 'Route', label: 'สายทาง', prop: 'route', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'building', name: 'Building', label: 'อาคารด่าน', prop: 'building', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'walletName', name: 'Wallet Name', label: 'กระเป่าเงิน', prop: 'wallet.walletName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'properties.obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'properties.smartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'amount', name: 'amount', label: 'จำนวนเงิน', prop: 'properties.amount', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'number', numberFormat: '1.2-2' },
    { id: 'taxInvoice', name: 'Tax Invoice', label: 'ใบกำกับภาษี', prop: 'taxInvoice', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'check-uncheck' },
    { id: 'cancel', name: 'Cancel', label: 'การยกเลิก', prop: 'isCancelled', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-red-exat', textCondition1: 'ยกเลิกแล้ว', textCondition2: '-' } },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description',iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(undefined),
    endDate: new FormControl(undefined),
    walletId: new FormControl(this.allWallet.walletId, [ Validators.required ])
  });

  public tempSearch: PassageInformationPayloadModel | undefined;

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
      this.loadCustomerInfo();
    }
  }

  loadCustomerInfo() {
    this.isLoading = true;
    zip(
      this.loadCustomer(),
      this.loadWalletInfo()
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

  loadCustomer() {
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

  loadWalletInfo() {
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
    const searchValue = this.getSearchValue(1);
    this.tempSearch = searchValue;
    this.pages = searchValue.page;
    this.loadPassageInformation(searchValue);
  }

  getSearchValue(page: number): PassageInformationPayloadModel {
    const formValue = this.form.value;
    const { walletId, startDate, endDate } = formValue;
    const from = this.transformDatePipe.transform(startDate, 'YYYY-MM-DD');
    const to = this.transformDatePipe.transform(endDate, 'YYYY-MM-DD');
    const value: PassageInformationPayloadModel = { walletId: walletId, from: from, to: to, page: page }
    return value;
  }

  loadPassageInformation(data: PassageInformationPayloadModel) {
    this.isLoadingSearch = true;
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
      .postBackOffice('transaction-history/get-passage', mockupData)
      .pipe(
        first(),
        map(res => res as ResponsePassageInformationModel)
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
          this.tempSearch = undefined;
          this.isLoadingSearch = false;
        }
      })
  }

  onClear() {
    this.router.navigate(['/work-space/search-user']);
  }

  onChangePage(event: number) {
    this.pages = event;
    const searchValue = this.getSearchValue(this.pages);
    this.tempSearch = this.tempSearch;
    this.loadPassageInformation(searchValue);
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

}
