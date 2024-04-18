import { Component, OnInit } from '@angular/core';
import { CustomeActivatedRouteModel, CustomerModel, HistoryPayloadModel, ReponseCustomerModel, ReponseWalletSummaryModel, WalletSummaryModel } from '../../../../../../core/interfaces';
import { Observable, zip } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../../../../../core/services';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-information',
  templateUrl: './transfer-information.component.html',
  styleUrl: './transfer-information.component.scss'
})
export class TransferInformationComponent implements OnInit {

  public title: string | undefined;

  public customerId: string | null = null;
  public customer: CustomerModel | undefined;

  public activeTab: 'billing-pending' | 'pay-information' | 'topup-information' = 'billing-pending';

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

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(undefined, [ Validators.required ]),
    endDate: new FormControl(undefined, [ Validators.required ]),
    walletId: new FormControl(this.allWallet.walletId, [ Validators.required ])
  });

  public tempSearch: HistoryPayloadModel | undefined;
  public limitRow: number = 10;

  public isLoading: boolean = false;
  public isLoadingSearch: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private transformDatePipe: TransformDatePipe
  ) {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.title = (this.activatedRoute as CustomeActivatedRouteModel).routeConfig.data?.label;
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
      error: (err: any) => {
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
  }

  getSearchValue(page: number): HistoryPayloadModel {
    const formValue = this.form.value;
    const { walletId, startDate, endDate } = formValue;
    const from = this.transformDatePipe.transform(startDate, 'YYYY-MM-DD', 'th');
    const to = this.transformDatePipe.transform(endDate, 'YYYY-MM-DD', 'th');
    const value: HistoryPayloadModel = { walletId: walletId, from: from, to: to, page: page };
    return value;
  }

  onClear() {
    this.router.navigate(['work-space/search-user']);
  }

  onLoading(event: boolean) {
    this.isLoadingSearch = event;
  }

}

