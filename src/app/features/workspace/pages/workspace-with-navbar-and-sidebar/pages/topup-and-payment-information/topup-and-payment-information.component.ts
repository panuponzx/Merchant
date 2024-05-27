import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concat, zip } from 'rxjs';
import { CustomeActivatedRouteModel, CustomerModel, IWalletInfoModel, ReponseCustomerModel, ReponseWalletSummaryModel, ResponseModel, WalletSummaryModel } from '../../../../../../core/interfaces';
import { HistoryPayloadModel } from '../../../../../../core/interfaces/payload.interface';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';

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

  public wallets: IWalletInfoModel[] = [];
  public allWallet: IWalletInfoModel = {
    totalBalance: 0,
    statusNmae: '',
    totalPointBalance: 0,
    id: 0,
    name: 'ทุกกระเป๋า',
    statusId: 0,
    typeId: 0,
    typeName: 'ทุกกระเป๋า',
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
        this.modalDialogService.hideLoading();
        this.isLoading = false;
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        console.error(err);
        this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
      }
    })
  }

  loadCustomer() {
    const mockupData = {
      queryType: 2,
      customer: {
          id: this.customerId,
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
    // if (this.form.invalid || this.isLoadingSearch) return;
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
