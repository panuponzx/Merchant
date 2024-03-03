import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, zip, map } from 'rxjs';
import { RestApiService } from '../../../../../../core/services';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModel, ReponseCustomerModel, ReponseWalletSummaryModel, WalletSummaryModel } from '../../../../../../core/interfaces';
import { CustomerTypePipe } from '../../../../../../core/pipes';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {

  public customerId: string | null = null;
  public customerTypeId: string | null = null;

  public activeTab: string | null;

  public customer: CustomerModel | undefined;
  public walletTotal: number = 0;
  public totalLoyaltyPoint: number = 0;
  public totalBalance: number = 0;

  constructor(
    private restApiService: RestApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerTypePipe: CustomerTypePipe
  ) {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe(() => this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab'));
  }

  ngOnInit(): void {
    if (this.customerId)  {
      this.getCustomerInfo();
    }
  }

  getCustomerInfo() {
    const subscribe = zip(
      this.getCustomer(),
      this.getWalletInfo()
    )
    .pipe()
    .subscribe({
      next: (info) => {
        if (info[0].customer) {
          this.customer = info[0].customer;
          this.customerTypeId = this.customerTypePipe.transform(this.customer, 'id');
        }
        if (info[1].lstSummary) {
          this.walletTotal = info[1].lstSummary.length;
          this.totalLoyaltyPoint = info[1].lstSummary.reduce((a, b) => a + b.totalPointBalance, 0);
          this.totalBalance = info[1].lstSummary.reduce((a, b) => a + b.totalBalance, 0);
        }
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

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/user-info/' + event.nextId + '/' + this.customerId
    this.router.navigate([url], { replaceUrl: true });
  }

  onClear() {
    this.router.navigate(['/work-space/search-user']);
  }

}
