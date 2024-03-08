import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { CustomColumnModel, CustomeActivatedRouteModel, CustomerModel, ReponseCustomerModel, ReponseWalletSummaryModel, WalletSummaryModel } from '../../../../../../core/interfaces';
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

  public limitRow: number = 5;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: '#', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'licensePlate', name: 'licensePlate', label: 'ทะเบียนรถ', prop: 'licensePlate', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'brand', name: 'Brand', label: 'ยี่ห้อ', prop: 'brand', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'model', name: 'Model', label: 'รุ่น', prop: 'model', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'yearRegistration', name: 'yearRegistration', label: 'ปีจดทะเบียน', prop: 'yearRegistration', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'smartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'walletId', name: 'Wallet ID', label: 'หมายเลขกระเป๋าเงินที่ผูก', prop: 'walletId', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(undefined),
    endDate: new FormControl(undefined),
    wallet: new FormControl(this.allWallet, [ Validators.required ])
  });

  public isLoading: boolean = false;
  public isLoadingSearch: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService
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
    if (this.form.invalid) return;
    this.isLoadingSearch = true;

  }

  loadHistory(data: { offset: number, limit: number, walletId: string }) {
    const mockupData = {
      requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: "1"
      },
      date: '',
      walletId: data.walletId,
      limit: data.limit,
      offset: data.offset
    };
    this.restApiService.post('get-transactions-history', mockupData) as Observable<ReponseWalletSummaryModel>;
  }

  onClear() {
    this.router.navigate(['/work-space/search-user']);
  }

}
