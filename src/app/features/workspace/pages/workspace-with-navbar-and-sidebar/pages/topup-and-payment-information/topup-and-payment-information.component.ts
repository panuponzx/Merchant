import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { CustomeActivatedRouteModel, CustomerModel, ReponseCustomerModel, ReponseWalletSummaryModel, WalletSummaryModel } from '../../../../../../core/interfaces';
import { HistoryPayloadModel } from '../../../../../../core/interfaces/payload.interface';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { RestApiService } from '../../../../../../core/services';

@Component({
  selector: 'app-topup-and-payment-information',
  templateUrl: './topup-and-payment-information.component.html',
  styleUrl: './topup-and-payment-information.component.scss'
})
export class TopupAndPaymentInformationComponent implements OnInit {

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
    startDate: new FormControl(undefined),
    endDate: new FormControl(undefined),
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
  }

  getSearchValue(page: number): HistoryPayloadModel {
    const formValue = this.form.value;
    const { walletId, startDate, endDate } = formValue;
    const newStartDate = this.transformDatePipe.transform(startDate, 'YYYY-MM-DD', 'th');
    const newEndDate = this.transformDatePipe.transform(endDate, 'YYYY-MM-DD', 'th');
    // const value: HistoryPayloadModel = { walletId: walletId, startDate: newStartDate, endDate: newEndDate, offset: 1, limit: this.limitRow };
    const value: HistoryPayloadModel = { walletId: '5111000000180', startDate: '2024-03-01', endDate: endDate, offset: 1, limit: this.limitRow };
    return value;
  }

  onClear() {
    this.router.navigate(['work-space/search-user']);
  }

  onLoading(event: boolean) {
    this.isLoadingSearch = event;
  }

}
