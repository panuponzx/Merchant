import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { CustomColumnModel, CustomeActivatedRouteModel, CustomerModel, IWalletInfoModel, ReponseCustomerModel, ResponseModel, RowActionEventModel } from 'src/app/core/interfaces';
import { CustomerTypePipe } from 'src/app/core/pipes';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-user-info-all',
  templateUrl: './user-info-all.component.html',
  styleUrl: './user-info-all.component.scss'
})
export class UserInfoAllComponent implements OnInit {

  public title: string | undefined;
  public customerId: string | null = null;
  public customerTypeId: string | null = null;

  public customer: CustomerModel | undefined;

  public isLoading: boolean = false;

  public form: FormGroup;

  public walletsList: IWalletInfoModel[] = [];
  public fareMediaList: any[] = [];
  public pageWalletSize: number = 5;
  public pagesWallet: number = 1;
  public collectionWalletSize: number = 0;
  public isWalletLoading: boolean = false;
  public columnsWallet: CustomColumnModel[] = [
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'หมายเลข OBU.', prop: 'faremediaValue', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'หมายเลขสมาร์ทการ์ด', prop: 'walletSmartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'faremediaStatus', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'licensePlate', name: 'licensePlate', label: 'ทะเบียนรถ', prop: 'plateNo', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'registerDate', name: 'registerDate', label: 'วันที่สมัคร', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D/MM/BBBB', locale: 'th' } },
    // { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    // { id: 'carModel', name: 'carModel', label: 'ยี่ห้อ', prop: 'carModel', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'model', name: 'Model', label: 'รุ่น', prop: 'carSubmodel', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'color', name: 'Color', label: 'สีรถ', prop: 'carColor', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'licensePlate', name: 'licensePlate', label: 'หมายเลขทะเบียนรถ', prop: 'plateNo', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'yearRegistration', name: 'yearRegistration', label: 'ปีจดทะเบียน', prop: 'carYear', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'faremediaValue', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'walletSmartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    // { id: 'status', name: 'Status', label: 'สถานะ', prop: 'faremediaStatus', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'edit', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];
  public rowsWallet: any[] = [];

  constructor(
    private restApiService: RestApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerTypePipe: CustomerTypePipe,
    private modalDialogService: ModalDialogService,
    private formBuilder: FormBuilder
  ) {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.title = (this.activatedRoute as CustomeActivatedRouteModel).routeConfig.data?.label;
    this.form = this.formBuilder.group({
      prefix: new FormControl(undefined, Validators.required),
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      walletId: new FormControl(undefined, Validators.required),
      walletBalance: new FormControl(undefined, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.loadCustomer();
      this.loadWalletInfo();
      this.loadReturnFaremedia();
    }
  }

  loadCustomer() {
    const mockupData = {
      queryType: 2,
      customer: {
        id: this.customerId,
        requestParam: this.restApiService.generateRequestParam()
      }
    };
    (this.restApiService.post('get-customer', mockupData) as Observable<ReponseCustomerModel>).subscribe(({
      next: (res) => {
        console.log("[loadCustomer res => ", res);
        this.customer = res.customer;
        this.customerTypeId = this.customerTypePipe.transform(this.customer, 'id');

      },
      error: (err) => {

      }
    }))
  }

  // loadWallet() {
  //   const mockupData = {
  //     queryType: 2,
  //     customer: {
  //       id: this.customerId,
  //       requestParam: this.restApiService.generateRequestParam()
  //     }
  //   };
  //   (this.restApiService.post('faremedia/get/wallet-id', mockupData) as Observable<ReponseCustomerModel>).subscribe(({
  //     next: (res) => {
  //       console.log("[loadCustomer res => ", res);
  //       this.customer = res.customer;
  //       this.customerTypeId = this.customerTypePipe.transform(this.customer, 'id');

  //     },
  //     error: (err) => {

  //     }
  //   }))
  // }

  loadWalletInfo() {
    const mockupData = {
      id: this.customerId,
    };
    (this.restApiService.postBackOffice('wallet/get-wallets', mockupData) as Observable<ResponseModel<IWalletInfoModel[]>>).subscribe(({
      next: (res) => {
        console.log("[loadWalletInfo] res => ", res);
        this.walletsList = res.data;
        if (this.walletsList && this.walletsList.length > 0) {
          this.form.get('walletId')?.setValue(this.walletsList[0].id);
          this.form.get('walletBalance')?.setValue(this.walletsList[0].totalBalance);
          this.getFaremediaByWalletId(this.walletsList[0].id);
        }
      },
      error: (error) => {

      }
    }))
  }

  getFaremediaByWalletId(walletId: number) {
    this.fareMediaList[walletId] = [];
    const payload = {
      walletId: walletId,
      page: this.pagesWallet,
      limit: this.pageWalletSize
    };
    (this.restApiService.postBackOffice('faremedia/get/wallet-id', payload) as Observable<any>).subscribe(({
      next: (res) => {
        console.log("[loadCustomer res => ", res);
        this.collectionWalletSize = res.data.totalElements;
        this.setFareMedia(res.data.elements, walletId);
      },
      error: (err) => {

      }
    }))
  }

  setFareMedia(data: any, walletId: any) {
    let faremedia: any = [];
    for (const index of Object.keys(data)) {
      let faremediaIndex = data[index];
      faremedia.push(faremediaIndex);
    }
    console.log("[setFareMedia] walletId => ", walletId);
    console.log("[setFareMedia] faremedia => ", faremedia);

    if (faremedia.length > 0) {
      faremedia.forEach((wallet: any) => {
        const walletOBU = wallet.filter((wallet: any) =>
          wallet.faremediaType?.toLowerCase().includes("obu")
        );
        const walletSmartcard = wallet.filter((wallet: any) =>
          wallet.faremediaType?.toLowerCase().includes("smart card")
        );
        console.log("[setFareMedia] walletOBU => ", walletOBU);
        console.log("[setFareMedia] walletSmartcard => ", walletSmartcard);
        console.log("[setFareMedia] walletOBU[0] => ", walletOBU[0]);
        console.log("[setFareMedia] walletSmartcard[0]?.faremediaValue => ", walletSmartcard[0]?.faremediaValue);
        this.fareMediaList[walletId].push({ ...walletOBU[0], ...{ walletSmartcardNo: walletSmartcard[0]?.faremediaValue } });
      });
    }
    console.log(this.fareMediaList[walletId]);
  }

  loadReturnFaremedia() {
    const payload = {
      content: {}
    };
    (this.restApiService.postBackOffice(`faremedia/get/returned/customer/${this.customerId}`, payload) as Observable<any>).subscribe(({
      next: (res) => {
        console.log("[loadReturnFaremedia] res => ", res);
      },
      error: (err) => {

      }
    }))
  }

  onChangeWallet(walletId: number) {
    // this.form.get('walletBalance')?.setValue(this.walletsList[0].totalBalance);
    this.getFaremediaByWalletId(walletId);
  }

  onChangeWalletPage(event: number) {
    this.pagesWallet = event;
    this.getFaremediaByWalletId(this.form.get('walletId')?.value);
  }

  onWalletAction(event: RowActionEventModel) {

  }


}
