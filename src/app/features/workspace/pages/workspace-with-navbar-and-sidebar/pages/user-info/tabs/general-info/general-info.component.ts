import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { AddressModel, CustomerModel, ReponseCustomerModel } from '../../../../../../../../core/interfaces';
import { RestApiService, UtilitiesService } from '../../../../../../../../core/services';
import { TransformDatePipe } from '../../../../../../../../core/pipes';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';

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
  public requestParam: any = {};

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
    private utilitiesService: UtilitiesService,
    private transformDatePipe: TransformDatePipe,
    private modalDialogService: ModalDialogService
  ) {
  }

  ngOnInit(): void {
    // this.modalDialogService.loading();
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
          console.log("[loadCustomer] res => ", res);
          const customer = res.customer;
          const addresses = res.addresses;
          const requestParam = res.requestParam;
          this.customer = customer;
          this.addresses = addresses;
          this.requestParam = requestParam;
          this.setFormValue(customer, addresses);
          this.activeAddressTab = this.getActiveAddressTab();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  getActiveAddressTab(): AddressTabsType | undefined {
    switch (this.customerTypeId) {
      case '1': {
        return 'address-on-the-card'
      }
      case '2': {
        return 'current-address'
      }
      case '3': {
        return 'work-address'
      }
      default: {
        return undefined;
      }
    }
  }

  onUpdate() {
    console.log("[onUpdate] form => ", this.form.getRawValue());
    const cardExpDateFormat = this.transformDatePipe.transform(this.form.get('cardExpDate')?.value, 'YYYY-MM-DD');
    const birthDateFormat = this.transformDatePipe.transform(this.form.get('birthdate')?.value, 'YYYY-MM-DD');
    const data = {
      customer: {
        id: this.customerId,
        // customerTypeId: this.form.getRawValue().customerType,
        title: this.form.getRawValue().title,
        firstName: this.form.getRawValue().firstName,
        lastName: this.form.getRawValue().lastName,
        mobilePhone: this.form.getRawValue().mobilePhone,
        email: this.form.getRawValue().email,
        // citizenDocId: this.form.getRawValue().citizenDocId,
        // citizenId: this.form.getRawValue().citizenId,
        cardExpDate: cardExpDateFormat,
        birthDate: birthDateFormat,
        occupation: this.form.getRawValue().occupation,
        gender: this.form.getRawValue().gender,
        // taxId: this.form.getRawValue().taxId,
        requestParam: {
          reqId: this.requestParam.reqId,
          channelId: this.requestParam.channelId,
        }
      }, addresses: [
        {
          addressNo: this.form.getRawValue().registration_address.addressNo,
          alley: this.form.getRawValue().registration_address.alley,
          building: this.form.getRawValue().registration_address.building,
          // createDate: this.transformDatePipe.transform(this.form.getRawValue().registration_address.createDate, 'YYYY-MM-DD'),
          // customerId: this.form.getRawValue().registration_address.customerId,
          districtCode: this.form.getRawValue().registration_address.districtCode,
          floor: this.form.getRawValue().registration_address.floor,
          provinceCode: this.form.getRawValue().registration_address.provinceCode,
          soi: this.form.getRawValue().registration_address.soi,
          street: this.form.getRawValue().registration_address.street,
          subdistrictCode: this.form.getRawValue().registration_address.subdistrictCode,
          typeId: this.form.getRawValue().registration_address.typeId,
          // typeName: this.form.getRawValue().registration_address.typeName,
          village: this.form.getRawValue().registration_address.village,
          villageNo: this.form.getRawValue().registration_address.villageNo,
          zipcode: this.form.getRawValue().registration_address.zipcode,
        },
        {
          addressNo: this.form.getRawValue().current_address.addressNo,
          alley: this.form.getRawValue().current_address.alley,
          building: this.form.getRawValue().current_address.building,
          // createDate: this.transformDatePipe.transform(this.form.getRawValue().current_address.createDate, 'YYYY-MM-DD'),
          // customerId: this.form.getRawValue().current_address.customerId,
          districtCode: this.form.getRawValue().current_address.districtCode,
          floor: this.form.getRawValue().current_address.floor,
          provinceCode: this.form.getRawValue().current_address.provinceCode,
          soi: this.form.getRawValue().current_address.soi,
          street: this.form.getRawValue().current_address.street,
          subdistrictCode: this.form.getRawValue().current_address.subdistrictCode,
          typeId: this.form.getRawValue().current_address.typeId,
          // typeName: this.form.getRawValue().current_address.typeName,
          village: this.form.getRawValue().current_address.village,
          villageNo: this.form.getRawValue().current_address.villageNo,
          zipcode: this.form.getRawValue().current_address.zipcode,
        },
        {
          addressNo: this.form.getRawValue().work_address.addressNo,
          alley: this.form.getRawValue().work_address.alley,
          building: this.form.getRawValue().work_address.building,
          // createDate: this.transformDatePipe.transform(this.form.getRawValue().work_address.createDate, 'YYYY-MM-DD'),
          // customerId: this.form.getRawValue().work_address.customerId,
          districtCode: this.form.getRawValue().work_address.districtCode,
          floor: this.form.getRawValue().work_address.floor,
          provinceCode: this.form.getRawValue().work_address.provinceCode,
          soi: this.form.getRawValue().work_address.soi,
          street: this.form.getRawValue().work_address.street,
          subdistrictCode: this.form.getRawValue().work_address.subdistrictCode,
          typeId: this.form.getRawValue().work_address.typeId,
          // typeName: this.form.getRawValue().work_address.typeName,
          village: this.form.getRawValue().work_address.village,
          villageNo: this.form.getRawValue().work_address.villageNo,
          zipcode: this.form.getRawValue().work_address.zipcode,
        },
      ]
    };
    this.modalDialogService.loading();
    this.restApiService
        .post('edit-customer', data)
        .pipe(
          first(),
          map(res => res as any)
        ).subscribe({
          next: (res) => {
            // alert(res.errorMessage);
            this.modalDialogService.hideLoading();
            console.log("[onSubmit] res => ", res);
            if(res.errorMessage === 'Success'){
              this.modalDialogService.info('สำเร็จ');
              this.loadCustomer();
            }
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            console.error(err);
          }
        })
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
    console.log("[setFormValue] dd", this.transformDatePipe.transform(customer.birthdate, null));
    
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
      formControl['corporateName'].addValidators([Validators.required]);
      formControl['corporateName'].updateValueAndValidity();
      formControl['corporatePhone'].setValue(customer.corporatePhone);
      formControl['corporatePhone'].addValidators([Validators.required]);
      formControl['corporatePhone'].updateValueAndValidity();
      formControl['branchType'].addValidators([Validators.required]);
      formControl['branchType'].updateValueAndValidity();
      // formControl['branchName'].addValidators([ Validators.required ]);
      // formControl['branchName'].updateValueAndValidity();
      // formControl['branchCode'].addValidators([ Validators.required ]);
      // formControl['branchCode'].updateValueAndValidity();
    }
    addresses.forEach(x => {
      const newFormGroup = new FormGroup({
        addressNo: new FormControl(x.addressNo, [Validators.required]),
        building: new FormControl(x.building),
        createDate: new FormControl(x.createDate),
        customerId: new FormControl(x.customerId),
        districtCode: new FormControl(Number(x.districtCode), [Validators.required]),
        // districtCode: new FormControl('1036', [ Validators.required ]), // Demo
        floor: new FormControl(x.floor),
        provinceCode: new FormControl(Number(x.provinceCode), [Validators.required]),
        // provinceCode: new FormControl('19', [ Validators.required ]), // Demo
        remark: new FormControl(x.remark),
        soi: new FormControl(x.soi),
        street: new FormControl(x.street),
        subdistrictCode: new FormControl(Number(x.subdistrictCode), [Validators.required]),
        // subdistrictCode: new FormControl('103602'), // Demo
        typeId: new FormControl(x.typeId),
        typeName: new FormControl(x.typeName),
        alley: new FormControl(x.alley),
        village: new FormControl(x.village),
        villageNo: new FormControl(x.villageNo),
        zipcode: new FormControl(x.zipcode, [Validators.required])
        // zipcode: new FormControl('10210') // Demo
      });
      console.log('setFormValue typeId => ', x.typeId);
      if (x.typeId === 1) {
        formControl['registration_address'] = newFormGroup;
      }
      if (x.typeId === 2) {
        formControl['current_address'] = newFormGroup;
      }
      if (x.typeId === 3) {
        formControl['work_address'] = newFormGroup;
      }
    });
    this.form.valueChanges.subscribe(x => {
      console.log("[valueChanges] x => ", x);
      this.isUpdated = true;
    });
    const currentAddressFormGroup = this.form.get('current_address') as FormGroup;
    const registrationAddressFormGroup = this.form.get('registration_address') as FormGroup;
    const workAddressFormGroup = this.form.get('work_address') as FormGroup;
    currentAddressFormGroup.valueChanges.subscribe(changes => {
      console.log('Current Address changes:', changes);
      this.isUpdated = true;
    });
    registrationAddressFormGroup.valueChanges.subscribe(changes => {
      console.log('Registration Address changes:', changes);
      this.isUpdated = true;
    });
    workAddressFormGroup.valueChanges.subscribe(changes => {
      console.log('Work Address changes:', changes);
      this.isUpdated = true;
    });

  }

}
