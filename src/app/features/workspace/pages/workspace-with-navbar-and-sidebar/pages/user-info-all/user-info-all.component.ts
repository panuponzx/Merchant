import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, Observable } from 'rxjs';
import { CustomColumnModel, CustomeActivatedRouteModel, CustomerModel, DistrictModel, IFaremediaReturnedResponse, IWalletInfoModel, ProvinceModel, ReponseCustomerModel, ReponseZipcodeModel, ResponseModel, RowActionEventModel, SubdistrictModel, ZipcodeModel } from 'src/app/core/interfaces';
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
    { id: 'registerDate', name: 'registerDate', label: 'วันที่สมัคร', prop: 'updateDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'DD/MM/BBBB HH:mm:ss', locale: 'th' } },
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

  public pageReturnSize: number = 5;
  public pagesReturn: number = 1;
  public collectionReturnSize: number = 0;
  public isReturnLoading: boolean = false;
  public columnsReturn: CustomColumnModel[] = [
    // { id: 'obuSerialNo', name: 'OBU serial no.', label: 'เลขบัญชี', prop: 'faremediaValue', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'หมายเลข OBU.', prop: 'newObu', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'หมายเลขสมาร์ทการ์ด', prop: 'newSmartCard', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    // { id: 'status', name: 'Status', label: 'สถานะบัตร', prop: 'faremediaStatus', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carLicensePlate', name: 'carLicensePlate', label: 'ทะเบียนรถ', prop: 'carPlate', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carLicensePlateProvince', name: 'carLicensePlateProvince', label: 'จังหวัด', prop: 'carPlateProvince', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'displayCreateDateTime', name: 'displayCreateDateTime', label: 'วันที่ดำเนินการ', prop: 'displayCreateDateTime', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
  ];
  public returnList: IFaremediaReturnedResponse[] = [];

  public pageChangeSize: number = 5;
  public pagesChange: number = 1;
  public collectionChangeSize: number = 0;
  public isChangeLoading: boolean = false;
  public columnsChange: CustomColumnModel[] = [
    // { id: 'obuSerialNo', name: 'OBU serial no.', label: 'เลขบัญชี', prop: 'faremediaValue', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'oldObu', name: 'oldObu', label: 'หมายเลข OBU. เก่า', prop: 'oldObu', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'newObu', name: 'newObu', label: 'หมายเลข OBU. ใหม่', prop: 'newObu', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'oldSmartCard', name: 'oldSmartCard', label: 'หมายเลขสมาร์ทการ์ดเก่า', prop: 'oldSmartCard', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'newSmartCard', name: 'newSmartCard', label: 'หมายเลขสมาร์ทการ์ดใหม่', prop: 'newSmartCard', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'balance', name: 'balance', label: 'Balance', prop: 'displayBalance', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'displayCreateDateTime', name: 'displayCreateDateTime', label: 'วันที่ดำเนินการ', prop: 'displayCreateDateTime', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
  ];
  public changeList: any[] = [];

  public districts: DistrictModel[] = [];
  public subdistricts: SubdistrictModel[] = [];
  public provinces: ProvinceModel[] = [];

  public zipcode: ZipcodeModel[] = [];

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
      prefix: new FormControl({ value: undefined, disabled: true }, Validators.required),
      firstName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      lastName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      birthdate: new FormControl({ value: undefined, disabled: true }, Validators.required),
      customerType: new FormControl({ value: undefined, disabled: true }, Validators.required),
      prefixEng: new FormControl({ value: undefined, disabled: true }, Validators.required),
      firstNameEng: new FormControl({ value: undefined, disabled: true }, Validators.required),
      lastNameEng: new FormControl({ value: undefined, disabled: true }, Validators.required),
      gender: new FormControl({ value: undefined, disabled: true }, Validators.required),
      citizenId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      address: new FormControl({ value: undefined, disabled: true }, Validators.required),
      subdistrictCode: new FormControl(undefined, Validators.required),
      subdistrictName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      provinceCode: new FormControl(undefined, Validators.required),
      provinceName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      zipcode: new FormControl({ value: undefined, disabled: true }, Validators.required),
      mobilePhone: new FormControl({ value: undefined, disabled: true }, Validators.required),
      corporatePhone: new FormControl({ value: undefined, disabled: true }, Validators.required),
      homePhone: new FormControl({ value: undefined, disabled: true }, Validators.required),
      email: new FormControl({ value: undefined, disabled: true }, Validators.required),
      remark: new FormControl({ value: undefined, disabled: true }, Validators.required),
      walletId: new FormControl(undefined, Validators.required),
      walletBalance: new FormControl(undefined, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.loadCustomer();
      this.loadWalletInfo();
      this.loadReturnFaremedia();
      this.loadChangeFaremedia();
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
        this.setFormValue(res);
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
    this.restApiService.postBackOfficeWithModelWithRequestParam<null, IFaremediaReturnedResponse[]>(`action-log/get/returned/faremedia/customer/${this.customerId}`, null).subscribe(({
      next: (res) => {
        this.collectionReturnSize = res.data.length;
        this.returnList = res.data;
      },
      error: (err) => {

      }
    }))
  }

  loadChangeFaremedia() {
    (this.restApiService.postBackOfficeWithModelWithRequestParam(`action-log/get/changed/faremedia/customer/${this.customerId}`, null) as Observable<any>).subscribe(({
      next: (res) => {
        console.log("[loadChangeFaremedia] res => ", res);
        this.collectionChangeSize = res.data.length;
        this.changeList = res.data;
      },
      error: (err) => {

      }
    }))
  }

  setFormValue(res: ReponseCustomerModel) {
    this.form.get('prefix')?.setValue(res.customer.title);
    this.form.get('firstName')?.setValue(res.customer.firstName);
    this.form.get('lastName')?.setValue(res.customer.lastName);
    this.form.get('prefixEng')?.setValue(res.customer.titleEng);
    this.form.get('firstNameEng')?.setValue(res.customer.firstNameEng);
    this.form.get('lastNameEng')?.setValue(res.customer.lastNameEng);
    this.form.get('birthdate')?.setValue(res.customer.birthdate);

    this.form.get('gender')?.setValue(res.customer.gender);
    this.form.get('customerType')?.setValue(res.customer.customerTypeName);
    this.form.get('citizenId')?.setValue(res.customer.citizenId);
    const address = `${res.addresses[0].addressNo} ${res.addresses[0].soi} ${res.addresses[0].street} `;
    this.form.get('address')?.setValue(address);
    this.form.get('subdistrictCode')?.setValue(Number(res.addresses[0].subdistrictCode));
    this.form.get('provinceCode')?.setValue(Number(res.addresses[0].provinceCode));
    this.form.get('zipcode')?.setValue(res.addresses[0].zipcode);
    this.form.get('mobilePhone')?.setValue(res.customer.mobilePhone);
    // this.form.get('corporatePhone')?.setValue(res.customer.mobilePhone);
    // this.form.get('homePhone')?.setValue(res.customer.mobilePhone);
    this.form.get('email')?.setValue(res.customer.email);
    this.loadZipcode();
  }

  onChangeWallet(walletId: number) {
    // this.form.get('walletBalance')?.setValue(this.walletsList[0].totalBalance);
    this.getFaremediaByWalletId(walletId);
  }

  onChangeWalletPage(event: number) {
    this.pagesWallet = event;
    this.getFaremediaByWalletId(this.form.get('walletId')?.value);
  }

  loadZipcode() {
    const zipcode = this.form.get('zipcode')?.value;
    if (zipcode && zipcode.length === 5) {
      this.restApiService
        .get('zip-code/code/' + zipcode)
        .pipe(
          first(),
          map(res => res as ReponseZipcodeModel)
        )
        .subscribe({
          next: (res) => {
            this.zipcode = [...res.zipCodes];
            this.subdistricts = this.getSubdistrict(zipcode);
            this.districts = this.getDistrict(this.form.get('subdistrictCode')?.value);
            this.provinces = this.getProvince(this.form.get('districtCode')?.value);
            console.log("[loadZipcode] subdistricts => ", this.subdistricts);
            console.log("[loadZipcode] districts => ", this.districts);
            console.log("[loadZipcode] provinces => ", this.provinces);

            this.form?.get('subdistrictName')?.setValue(this.getSubdistrictName(this.form.get('subdistrictCode')?.value));
            this.form?.get('districtName')?.setValue(this.getDistrictName(this.form.get('subdistrictCode')?.value));
            this.form?.get('provinceName')?.setValue(this.getDistrict(this.form.get('subdistrictCode')?.value)[0].province.name);
          },
          error: (err) => {
            console.error(err);
            this.modalDialogService.handleError(err);
          }
        });
    }
  }

  getSubdistrict(zipcode: string | undefined | null): SubdistrictModel[] {
    if (zipcode) {
      const subdistricts = this.zipcode.map(x => x.subdistrict);
      return subdistricts;
    } else {
      return [];
    }
  }

  getSubdistrictName(subdistrictId: number): string | null {
    if (subdistrictId) {
      const subdistrictsName = this.subdistricts.filter(x => x.id === subdistrictId);
      console.log("[getSubdistrictName] subdistrictsName => ", subdistrictsName);
      return subdistrictsName[0].name;
    } else {
      return null;
    }
  }

  getDistrict(subdistrictCode: number | undefined | null): DistrictModel[] {
    if (subdistrictCode) {
      const districts = this.subdistricts.filter(x => x.id === subdistrictCode).map(x => x.district);
      return districts;
    } else {
      return [];
    }
  }

  getDistrictName(subdistrictCode: number): string | null {
    if (subdistrictCode) {
      const districts = this.subdistricts.filter(x => x.id === subdistrictCode).map(x => x.district);
      return districts[0].name;
    } else {
      return null;
    }
  }


  getProvince(districtCode: number | undefined | null): ProvinceModel[] {
    if (districtCode) {
      const provinces = this.districts.filter(x => x.id === districtCode).map(x => x.province);
      return provinces;
    } else {
      return [];
    }
  }

  getProvinceName(districtCode: number): string | null {
    if (districtCode) {
      const provinces = this.districts.filter(x => x.id === districtCode).map(x => x.province);
      return provinces[0].name;
    } else {
      return null;
    }
  }

  onWalletAction(event: RowActionEventModel) {

  }

  onChangeReturnPage(event: number) {
    this.pagesReturn = event;
  }

  onReturnAction(event: RowActionEventModel) {

  }

  onChangeFaremediaChangePage(event: number) {
    this.pagesChange = event;
  }

  onFaremediaChangeAction(event: RowActionEventModel) {

  }


}
