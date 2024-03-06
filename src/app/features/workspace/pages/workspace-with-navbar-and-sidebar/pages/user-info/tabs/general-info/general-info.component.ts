import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { AddressModel, CustomerModel, ReponseCustomerModel } from '../../../../../../../../core/interfaces';
import { CustomerTypePipe } from '../../../../../../../../core/pipes';
import { RestApiService, UtilitiesService } from '../../../../../../../../core/services';

@Component({
  selector: 'general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss'
})
export class GeneralInfoComponent {

  @Input() public customerId: string | null = null;
  public customerTypeId: string | null = null;

  public settingEmailList = [
    'เปิดการใช้งาน',
    'ยังไม่เปิดการใช้งาน'
  ];
  public minDate: Date = new Date();

  public customer: CustomerModel | undefined;
  public addressed: AddressModel[] = [];

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
    current_address: new FormGroup({}),
    registration_address: new FormGroup({})
  });

  public isUpdated: boolean = false;

  public activeTab: 'address-on-the-card' | 'current-address' = 'address-on-the-card';

  constructor(
    private restApiService: RestApiService,
    private customerTypePipe: CustomerTypePipe,
    private utilitiesService: UtilitiesService
  ) {
  }

  ngOnInit(): void {
    this.getCustomer();
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
    this.restApiService
      .post('get-customer', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseCustomerModel)
      )
      .subscribe({
        next: (response) => {
          const customer = response.customer;
          const addresses = response.addresses;
          this.customer = customer;
          this.addressed = addresses;
          const customerTypeId = this.customerTypePipe.transform(customer, 'id');
          this.customerTypeId = customerTypeId;
          this.setFormValue(customer, addresses);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  onUpdate() {

  }

  onUpload() {

  }

  onChangeEmail() {

  }

  onCancel() {
    if (this.customer && this.addressed) {
      this.setFormValue(this.customer, this.addressed);
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
                });
      this.form.valueChanges.subscribe(x => {
        this.isUpdated = true;
      });
  }

}
