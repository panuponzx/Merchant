import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { zip, Observable } from 'rxjs';
import { CustomerModel, WalletSummaryModel, HistoryPayloadModel, CustomeActivatedRouteModel, ReponseCustomerModel, ReponseWalletSummaryModel, IWalletInfoModel, ResponseModel } from '../../../../../../core/interfaces';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrl: './payment-information.component.scss'
})
export class PaymentInformationComponent implements OnInit {

  public title: string | undefined;

  public customerId: string | null = null;
  public customer: CustomerModel | undefined;

  public activeTab: 'billing-pending' | 'pay-information' | 'topup-information' = 'billing-pending';

  public wallets: IWalletInfoModel[] = [];
  public allWallet: IWalletInfoModel = {
    totalBalance: 0,
    statusName: '',
    totalPointBalance: 0,
    id: 0,
    name: 'ทุกกระเป๋า',
    statusId: 0,
    typeId: 0,
    typeName: 'ทุกกระเป๋า',
    creditBalance: 0,
    lastUse: new Date(),
    totalPoint: 0
  }


  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(undefined, [ Validators.required ]),
    endDate: new FormControl(undefined, [ Validators.required ]),
    walletId: new FormControl(this.allWallet.id, [ Validators.required ])
  });

  public tempSearch: HistoryPayloadModel | undefined;
  public limitRow: number = 10;

  public isLoading: boolean = false;
  public isLoadingSearch: boolean = false;

  public maxDate: Date = new Date();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private transformDatePipe: TransformDatePipe,
    private modalDialogService: ModalDialogService
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
    this.modalDialogService.loading();
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
        if (info[1].data) {
          this.wallets = [this.allWallet, ].concat(info[1].data)
        }
        this.isLoading = false;
        this.modalDialogService.hideLoading();
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        console.error(err);
        this.modalDialogService.handleError(err);
        // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
      }
    })
  }

  loadCustomer() {
    const mockupData = {
      queryType: 2,
      customer: {
          id: this.customerId,
          requestParam: this.restApiService.generateRequestParam()
      }
    };
    return this.restApiService.post('get-customer', mockupData) as Observable<ReponseCustomerModel>;
  }

  loadWalletInfo() {
    const mockupData = {
      id: this.customerId,
    };
    // return this.restApiService.post('get-summary', mockupData) as Observable<ReponseWalletSummaryModel>;
    return this.restApiService.postBackOffice('wallet/get-wallets', mockupData) as Observable<ResponseModel<IWalletInfoModel[]>>;
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
