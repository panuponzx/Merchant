import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, zip } from 'rxjs';
import { WalletTypeEnum } from 'src/app/core/enum/wallet.enum';
import { CustomeActivatedRouteModel, CustomerModel, IWalletInfoModel, ReponseCustomerModel, ResponseModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
// import { WalletTypeEnum } from 'src/app/core/enums/wallet.enum';

@Component({
  selector: 'app-bill-information',
  templateUrl: './bill-information.component.html',
  styleUrl: './bill-information.component.scss'
})
export class BillInformationComponent {
  customerId: string | null;
  initAllWallet: IWalletInfoModel = {
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
  public minDate: Date | undefined;
  public title: string | undefined;
  public customer: CustomerModel | undefined;
  public isLoading: boolean = false;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(new Date(), [Validators.required]),
    endDate: new FormControl(new Date(), [Validators.required]),
    walletId: new FormControl(this.initAllWallet.id, [Validators.required])
  });
  public wallets: IWalletInfoModel[] = [];
  public activeTab: 'waiting-payment' | 'paid-payment' | string | null;

  constructor(
    private router: Router,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private activatedRoute: ActivatedRoute) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.title = (this.activatedRoute as CustomeActivatedRouteModel).routeConfig.data?.label;
  }

  ngOnInit() {
    this.onInitData();

    const today = new Date();
    this.minDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  }

  onInitData() {
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
            let wallet = info[1].data.filter(x => {
              return [WalletTypeEnum.CORPORATE_POSTPAID_BILLIING,
              WalletTypeEnum.INDIVIDUAL_POSTPAID_BILLING].includes(x.typeId)
            })
            this.wallets = [this.initAllWallet,].concat(wallet)

            // todo: wallet == 0 show no data
          }
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          console.error(err);
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
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
    console.log(this.form.value);
    console.log(this.form.value['startDate']);
  }

  onClear() {
    this.router.navigate(['work-space/search-user']);
  }

  onChangeNav(event: NgbNavChangeEvent) {
    console.log(event);
    const url = 'work-space/bill-information/' + event.nextId + '/' + this.customerId
    this.router.navigate([url], { replaceUrl: true });
  }
}
