import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { first, map, Observable, zip } from 'rxjs';
import { WalletTypeEnum } from 'src/app/core/enum/wallet.enum';
import { CustomeActivatedRouteModel, CustomerModel, IBill, IWalletInfoModel, ReponseCustomerModel, ResponseModel } from 'src/app/core/interfaces';
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
  today = new Date();
  public minDate: Date = moment(this.today).subtract(1, 'years').toDate();
  public maxDate: Date = this.today;
  public title: string | undefined;
  public customer: CustomerModel | undefined;
  public dataIsLoading: boolean = false;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(this.minDate, [Validators.required]),
    endDate: new FormControl(this.maxDate, [Validators.required]),
    walletId: new FormControl(this.initAllWallet.id, [Validators.required])
  });
  public wallets: IWalletInfoModel[] = [];
  public bills: IBill[] = [];
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
    return this.restApiService.postBackOffice('wallet/get-wallets', mockupData) as Observable<ResponseModel<IWalletInfoModel[]>>;
  }

  loadBillWaitingPayment(walletId: number, startDate: Date, endDate: Date) {
    this.dataIsLoading = true;
    const payload = {
      walletId: walletId,
      startDate: moment(startDate).format('YYYY-MM'),
      endDate: moment(endDate).format('YYYY-MM'),
    };
    return this.restApiService
      .postBackOffice('bill/get/unpaid', payload)
      .pipe(
        first(),
        map(res => res as ResponseModel<IBill[]>)
      ).subscribe({
        next: (res) => {
          this.bills = res.data;
          this.dataIsLoading = false;
        },
        error: (err) => {
          this.dataIsLoading = false;
          console.error(err);
          this.modalDialogService.handleError(err);
        }
      });
  }

  loadBillPaidPayment(walletId: number, startDate: Date, endDate: Date) {
    this.dataIsLoading = true;
    const payload = {
      walletId: walletId,
      startDate: moment(startDate).format('YYYY-MM'),
      endDate: moment(endDate).format('YYYY-MM'),
    };
    return this.restApiService
      .postBackOffice('bill/get/paid', payload)
      .pipe(
        first(),
        map(res => res as ResponseModel<IBill[]>)
      ).subscribe({
        next: (res) => {
          this.bills = res.data;
          this.dataIsLoading = false;
        },
        error: (err) => {
          this.dataIsLoading = false;
          console.error(err);
          this.modalDialogService.handleError(err);
        }
      });
  }

  onSearch() {
    if(this.activeTab === 'waiting-payment') {
      this.loadBillWaitingPayment(this.form.value.walletId, this.form.value.startDate, this.form.value.endDate);
    }else if(this.activeTab === 'paid-payment') {
      this.loadBillPaidPayment(this.form.value.walletId, this.form.value.startDate, this.form.value.endDate);
    }
  }

  onClear() {
    this.router.navigate(['work-space/search-user']);
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/bill-information/' + event.nextId + '/' + this.customerId
    this.router.navigate([url], { replaceUrl: true });
  }
}
