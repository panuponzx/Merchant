import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { AddressModel, CustomerModel, ReponseCustomerModel } from '../../../../../../../../core/interfaces';
import { RestApiService, UtilitiesService } from '../../../../../../../../core/services';

type AddressTabsType = 'address-on-the-card' | 'current-address' | 'work-address';
type DetailTabsType = 'company-detail' | 'contact-detail';

@Component({
  selector: 'general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss'
})
export class GeneralInfoComponent {

  @Input() public customerId: string | null = null;
  @Input() public customerTypeId: string | null = null;

  public customer: CustomerModel | undefined;
  public addresses: AddressModel[] = [];

  public settingEmailList = [
    'เปิดการใช้งาน',
    'ยังไม่เปิดการใช้งาน'
  ];

  public minDate: Date = new Date();

  public branchTypeList: { id: number, name: string }[] = [
    { id: 1, name: 'สาขาหลัก' },
    { id: 2, name: 'สาขาย่อย' },
  ];



  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    birthdate: new FormControl(undefined, Validators.required),
    branchTypeId: new FormControl(undefined, Validators.required),
    cardExpDate: new FormControl(undefined, Validators.required),
    channelId: new FormControl(undefined, Validators.required),
    citizenDocId: new FormControl(undefined, Validators.required),
    citizenId: new FormControl(undefined, Validators.required),
    createDate: new FormControl(undefined, Validators.required),
    customerTypeId: new FormControl(undefined, Validators.required),
    customerTypeName: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, Validators.required),
    firstName: new FormControl(undefined, Validators.required),
    gender: new FormControl(undefined, Validators.required),
    id: new FormControl(undefined, Validators.required),
    lastName: new FormControl(undefined, Validators.required),
    mobilePhone: new FormControl(undefined, Validators.required),
    occupation: new FormControl(undefined, Validators.required),
    status: new FormControl(undefined, Validators.required),
    taxId: new FormControl(undefined, Validators.required),
    title: new FormControl(undefined, Validators.required),
    corporateName: new FormControl(undefined),
    corporatePhone: new FormControl(undefined),
    branchType: new FormControl(undefined),
    branchName: new FormControl(undefined),
    branchCode: new FormControl(undefined),
    current_address: new FormGroup({}),
    registration_address: new FormGroup({}),
    work_address: new FormGroup({})
  });

  public isUpdated: boolean = false;

  public activeAddressTab: AddressTabsType | undefined;
  public activeDetailTab: DetailTabsType = 'company-detail';

  constructor(
    private restApiService: RestApiService,
    private utilitiesService: UtilitiesService
  ) {
  }

  ngOnInit(): void {
    this.loadCustomer();
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
    this.restApiService
      .post('get-customer', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseCustomerModel)
      )
      .subscribe({
        next: (res) => {
          const customer = res.customer;
          const addresses = res.addresses;
          this.customer = customer;
          this.addresses = addresses;
          this.setFormValue(customer, addresses);
          this.activeAddressTab = this.getActiveAddressTab();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  getActiveAddressTab(): AddressTabsType | undefined {
    switch(this.customerTypeId) {
      case '1' : {
        return 'address-on-the-card'
      }
      case '2' : {
        return 'current-address'
      }
      case '3' : {
        return 'work-address'
      }
      default : {
        return undefined;
      }
    }
  }

  onUpdate() {

  }

  onUpload() {

  }

  onChangeEmail() {

  }

  onCancel() {
    if (this.customer && this.addresses) {
      this.setFormValue(this.customer, this.addresses);
    }
  }

  setFormValue(customer: CustomerModel, addresses: AddressModel[]) {
    this.isUpdated = false;
    const formControl = this.form.controls;
                formControl['birthdate'].setValue(customer.birthdate);
                formControl['branchTypeId'].setValue(customer.branchTypeId);
                formControl['cardExpDate'].setValue(customer.cardExpDate);
                formControl['channelId'].setValue(customer.channelId);
                formControl['citizenDocId'].setValue(customer.citizenDocId);
                formControl['citizenId'].setValue(this.utilitiesService.formatIdCard(customer.citizenId));
                formControl['createDate'].setValue(customer.createDate);
                formControl['customerTypeId'].setValue(customer.customerTypeId);
                formControl['customerTypeName'].setValue(customer.customerTypeName);
                formControl['email'].setValue(customer.email);
                formControl['firstName'].setValue(customer.firstName);
                formControl['gender'].setValue(customer.gender);
                formControl['id'].setValue(customer.id);
                formControl['lastName'].setValue(customer.lastName);
                formControl['mobilePhone'].setValue(customer.mobilePhone);
                formControl['occupation'].setValue(customer.occupation);
                formControl['status'].setValue(customer.status);
                formControl['taxId'].setValue(customer.taxId);
                formControl['title'].setValue(customer.title);
                if (this.customerId === '3') {
                  formControl['corporateName'].setValue(customer.corporateName);
                  formControl['corporateName'].addValidators([ Validators.required ]);
                  formControl['corporateName'].updateValueAndValidity();
                  formControl['corporatePhone'].setValue(customer.corporatePhone);
                  formControl['corporatePhone'].addValidators([ Validators.required ]);
                  formControl['corporatePhone'].updateValueAndValidity();
                  formControl['branchType'].addValidators([ Validators.required ]);
                  formControl['branchType'].updateValueAndValidity();
                  // formControl['branchName'].addValidators([ Validators.required ]);
                  // formControl['branchName'].updateValueAndValidity();
                  // formControl['branchCode'].addValidators([ Validators.required ]);
                  // formControl['branchCode'].updateValueAndValidity();
                }
                addresses.forEach(x => {
                  const newFormGroup = new FormGroup({
                    addressNo: new FormControl(x.addressNo, [ Validators.required ]),
                    building: new FormControl(x.building),
                    createDate: new FormControl(x.createDate),
                    customerId: new FormControl(x.customerId),
                    districtCode: new FormControl(x.districtCode, [ Validators.required ]),
                    floor: new FormControl(x.floor),
                    provinceCode: new FormControl(x.provinceCode, [ Validators.required ]),
                    remark: new FormControl(x.remark),
                    soi: new FormControl(x.soi),
                    street: new FormControl(x.street),
                    subdistrictCode: new FormControl(x.subdistrictCode, [ Validators.required ]),
                    typeId: new FormControl(x.typeId),
                    typeName: new FormControl(x.typeName),
                    alley: new FormControl(x.alley),
                    village: new FormControl(x.village),
                    villageNo: new FormControl(x.villageNo),
                    zipcode: new FormControl(x.zipcode, [ Validators.required ])
                  });
                  if (x.typeId === 1) {
                    formControl['registration_address'] = newFormGroup;
                  }
                  if (x.typeId === 2) {
                    formControl['current_address'] = newFormGroup;
                  }
                  if (x.typeId === 2) {
                    formControl['work_address'] = newFormGroup;
                  }
                });
      this.form.valueChanges.subscribe(x => {
        this.isUpdated = true;
      });
  }

}
