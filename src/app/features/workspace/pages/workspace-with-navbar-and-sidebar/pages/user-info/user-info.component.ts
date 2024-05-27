import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, zip, map } from 'rxjs';
import { RestApiService } from '../../../../../../core/services';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomeActivatedRouteModel, CustomerModel, IWalletInfoModel, ReponseCustomerModel, ReponseWalletSummaryModel, ResponseModel, WalletSummaryModel } from '../../../../../../core/interfaces';
import { CustomerTypePipe } from '../../../../../../core/pipes';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {

  public title: string | undefined;

  public customerId: string | null = null;
  public customerTypeId: string | null = null;

  public wallets: IWalletInfoModel[] = [];

  public activeTab: 'general-info' | 'wallet-info' | 'loyalty-point-info' | 'device-list' | 'e-tax' | string | null ;

  public customer: CustomerModel | undefined;
  public walletTotal: number = 0;
  public totalLoyaltyPoint: number=0;
  public totalBalance: number=0;

  public isLoading: boolean = false;

  constructor(
    private restApiService: RestApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerTypePipe: CustomerTypePipe,
    private modalDialogService: ModalDialogService
  ) {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.title = (this.activatedRoute as CustomeActivatedRouteModel).routeConfig.data?.label;
    this.router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe(() => this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab'));
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
          // this.customer.customerTypeId = 2; //Demo
          // this.customer.citizenDocId = 4; // Demo
          this.customerTypeId = this.customerTypePipe.transform(this.customer, 'id');
        }
        if (info[1].data) {
          this.walletTotal = info[1].data.length;
          console.log("[loadCustomerInfo] info => ", info);
          this.totalLoyaltyPoint = info[1].data.reduce((a, b) => a + b.totalPointBalance, 0);
          this.totalBalance = info[1].data.reduce((a, b) => a + b.totalBalance, 0);
        }
        this.isLoading = false;
        console.log("[loadCustomerInfo] customerTypeId => ", this.customerTypeId);
        console.log("[loadCustomerInfo] customer => ", this.customer);
        console.log("[loadCustomerInfo] customerId => ", this.customerId);

      },
      error: (err) => {
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
    // return this.restApiService.post('get-summary', mockupData) as Observable<ReponseWalletSummaryModel>;
    return this.restApiService.postBackOffice('wallet/get-wallets', mockupData) as Observable<ResponseModel<IWalletInfoModel[]>>;
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/user-info/' + event.nextId + '/' + this.customerId
    this.router.navigate([url], { replaceUrl: true });
  }

  onClear() {
    this.router.navigate(['/work-space/search-user']);
  }

}
