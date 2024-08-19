import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map, Observable, of } from 'rxjs';
import { AddressModel, CustomerModel, IPrefixModel, ReponseCustomerModel } from '../../../../../../../../core/interfaces';
import { RestApiService, UtilitiesService } from '../../../../../../../../core/services';
import { TransformDatePipe } from '../../../../../../../../core/pipes';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { AddressTypeEnum } from 'src/app/core/enum/address.enum';
import prefixData from 'src/assets/data/prefix.json';

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

  // public customer: CustomerModel | undefined;
  // public addresses: AddressModel[] = [];
  public customer: ReponseCustomerModel | undefined;
  public requestParam: any = {};

  public settingEmailList = [
    'เปิดการใช้งาน',
    'ยังไม่เปิดการใช้งาน'
  ];

  public today: Date = new Date();

  public branchTypeList: { id: number, name: string }[] = [
    { id: 1, name: 'สาขาหลัก' },
    { id: 2, name: 'สาขาย่อย' },
  ];

  public prefixList: IPrefixModel[] = prefixData;
  prefixList$: Observable<IPrefixModel[]> = of([]);

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    birthdate: new FormControl(undefined, Validators.required),
    branchTypeId: new FormControl(undefined, Validators.required),
    cardExpDate: new FormControl(undefined, Validators.required),
    channelId: new FormControl(undefined, Validators.required),
    citizenDocId: new FormControl(undefined, Validators.required),
    citizenId: new FormControl(undefined, [Validators.required, Validators.pattern(/([a-zA-Z]{2,}[0-9]{5,})$|([0-9]{13,})$/)]),
    createDate: new FormControl(undefined, Validators.required),
    customerTypeId: new FormControl(undefined, Validators.required),
    customerTypeName: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined),
    firstName: new FormControl(undefined, Validators.required),
    gender: new FormControl(undefined, Validators.required),
    id: new FormControl(undefined, Validators.required),
    lastName: new FormControl(undefined, Validators.required),
    mobilePhone: new FormControl(undefined, Validators.required),
    occupation: new FormControl(undefined, Validators.required),
    status: new FormControl(undefined, Validators.required),
    taxId: new FormControl(undefined, Validators.required),
    title: new FormControl(undefined, Validators.required),
    corporateName: new FormControl(undefined, Validators.required),
    contactPhone: new FormControl(undefined, Validators.required),
    customerContactId: new FormControl(undefined, Validators.required),
    // corporatePhone: new FormControl(undefined),
    branchType: new FormControl(undefined, Validators.required),
    branchCode: new FormControl(undefined, Validators.required),
    branchName: new FormControl(undefined, Validators.required),
    current_address: new FormGroup({
      addressNo: new FormControl(undefined, [Validators.required]),
      building: new FormControl(undefined),
      createDate: new FormControl(undefined),
      customerId: new FormControl(undefined),
      floor: new FormControl(undefined),
      remark: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      typeId: new FormControl(undefined),
      typeName: new FormControl(undefined),
      alley: new FormControl(undefined),
      village: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      province: new FormControl(undefined, [Validators.required]),
      provinceName: new FormControl(undefined, [Validators.required]),
      district: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
      districtName: new FormControl(undefined, [Validators.required]),
      subdistrict: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
      subdistrictName: new FormControl(undefined, [Validators.required]),
      zipcode: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
    }),
    registration_address: new FormGroup({
      addressNo: new FormControl(undefined, [Validators.required]),
      building: new FormControl(undefined),
      createDate: new FormControl(undefined),
      customerId: new FormControl(undefined),
      floor: new FormControl(undefined),
      remark: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      typeId: new FormControl(undefined),
      typeName: new FormControl(undefined),
      alley: new FormControl(undefined),
      village: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      province: new FormControl(undefined, [Validators.required]),
      provinceName: new FormControl(undefined, [Validators.required]),
      district: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
      districtName: new FormControl(undefined, [Validators.required]),
      subdistrict: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
      subdistrictName: new FormControl(undefined, [Validators.required]),
      zipcode: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
    }),
    work_address: new FormGroup({
      addressNo: new FormControl(undefined, [Validators.required]),
      building: new FormControl(undefined),
      createDate: new FormControl(undefined),
      customerId: new FormControl(undefined),
      floor: new FormControl(undefined),
      remark: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      typeId: new FormControl(undefined),
      typeName: new FormControl(undefined),
      alley: new FormControl(undefined),
      village: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      province: new FormControl(undefined, [Validators.required]),
      provinceName: new FormControl(undefined, [Validators.required]),
      district: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
      districtName: new FormControl(undefined, [Validators.required]),
      subdistrict: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
      subdistrictName: new FormControl(undefined, [Validators.required]),
      zipcode: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
    }),
    etax_address: new FormGroup({
      addressNo: new FormControl(undefined, [Validators.required]),
      building: new FormControl(undefined),
      createDate: new FormControl(undefined),
      customerId: new FormControl(undefined),
      floor: new FormControl(undefined),
      remark: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      typeId: new FormControl(undefined),
      typeName: new FormControl(undefined),
      alley: new FormControl(undefined),
      village: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      province: new FormControl(undefined, [Validators.required]),
      provinceName: new FormControl(undefined, [Validators.required]),
      district: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
      districtName: new FormControl(undefined, [Validators.required]),
      subdistrict: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
      subdistrictName: new FormControl(undefined, [Validators.required]),
      zipcode: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
    })
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
    // this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การลงทะเบียนสำเร็จ');
    this.loadCustomer();
  }

  loadCustomer() {
    this.modalDialogService.loading();
    const mockupData = {
      queryType: 2,
      customer: {
        id: this.customerId,
        requestParam: this.restApiService.generateRequestParam()
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
          this.customer = res;
          this.requestParam = requestParam;
          this.setFormValue(res);
          this.activeAddressTab = this.getActiveAddressTab();
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.handleError(err);
          // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
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
    if (this.customerTypeId === '1' || this.customerTypeId === '2') {
      const data = {
        customer: {
          id: this.customerId,
          customerTypeId: this.customerTypeId,
          title: this.form.getRawValue().title,
          firstName: this.form.getRawValue().firstName,
          lastName: this.form.getRawValue().lastName,
          mobilePhone: this.form.getRawValue().mobilePhone,
          email: this.form.getRawValue().email,
          citizenDocId: this.form.getRawValue().citizenDocId,
          citizenId: this.form.getRawValue().citizenId,
          cardExpDate: cardExpDateFormat,
          birthdate: birthDateFormat,
          occupation: this.form.getRawValue().occupation,
          gender: this.form.getRawValue().gender,
          // taxId: this.form.getRawValue().taxId,
          requestParam: {
            reqId: this.requestParam.reqId,
            channelId: this.requestParam.channelId,
          }
        }, addresses: [
          ...(
            this.customerTypeId === '1' ? [{
              addressNo: this.form.getRawValue().registration_address.addressNo,
              alley: this.form.getRawValue().registration_address.alley,
              building: this.form.getRawValue().registration_address.building,
              // createDate: this.transformDatePipe.transform(this.form.getRawValue().registration_address.createDate, 'YYYY-MM-DD'),
              // customerId: this.form.getRawValue().registration_address.customerId,
              districtCode: this.form.getRawValue().registration_address.district,
              floor: this.form.getRawValue().registration_address.floor,
              provinceCode: this.form.getRawValue().registration_address.province,
              soi: this.form.getRawValue().registration_address.soi,
              street: this.form.getRawValue().registration_address.street,
              subdistrictCode: this.form.getRawValue().registration_address.subdistrict,
              // typeId: this.form.getRawValue().registration_address.typeId,
              typeId: 2,
              // typeName: this.form.getRawValue().registration_address.typeName,
              village: this.form.getRawValue().registration_address.village,
              villageNo: this.form.getRawValue().registration_address.villageNo,
              zipcode: this.form.getRawValue().registration_address.zipcode,
            }] : []
          ),
          {
            addressNo: this.form.getRawValue().current_address.addressNo,
            alley: this.form.getRawValue().current_address.alley,
            building: this.form.getRawValue().current_address.building,
            // createDate: this.transformDatePipe.transform(this.form.getRawValue().current_address.createDate, 'YYYY-MM-DD'),
            // customerId: this.form.getRawValue().current_address.customerId,
            districtCode: this.form.getRawValue().current_address.district,
            floor: this.form.getRawValue().current_address.floor,
            provinceCode: this.form.getRawValue().current_address.province,
            soi: this.form.getRawValue().current_address.soi,
            street: this.form.getRawValue().current_address.street,
            subdistrictCode: this.form.getRawValue().current_address.subdistrict,
            // typeId: this.form.getRawValue().current_address.typeId,
            typeId: AddressTypeEnum.CURRENT,
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
            districtCode: this.form.getRawValue().work_address.district,
            floor: this.form.getRawValue().work_address.floor,
            provinceCode: this.form.getRawValue().work_address.province,
            soi: this.form.getRawValue().work_address.soi,
            street: this.form.getRawValue().work_address.street,
            subdistrictCode: this.form.getRawValue().work_address.subdistrict,
            // typeId: this.form.getRawValue().work_address.typeId,
            typeId: AddressTypeEnum.COMPANY,
            // typeName: this.form.getRawValue().work_address.typeName,
            village: this.form.getRawValue().work_address.village,
            villageNo: this.form.getRawValue().work_address.villageNo,
            zipcode: this.form.getRawValue().work_address.zipcode,
          },
          {
            addressNo: this.form.getRawValue().etax_address.addressNo,
            alley: this.form.getRawValue().etax_address.alley,
            building: this.form.getRawValue().etax_address.building,
            districtCode: this.form.getRawValue().etax_address.district,
            floor: this.form.getRawValue().etax_address.floor,
            provinceCode: this.form.getRawValue().etax_address.province,
            soi: this.form.getRawValue().etax_address.soi,
            street: this.form.getRawValue().etax_address.street,
            subdistrictCode: this.form.getRawValue().etax_address.subdistrict,
            // typeId: this.form.getRawValue().etax_address.typeId,
            typeId: AddressTypeEnum.ETAX,
            village: this.form.getRawValue().etax_address.village,
            villageNo: this.form.getRawValue().etax_address.villageNo,
            zipcode: this.form.getRawValue().etax_address.zipcode,
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
            if (res.errorMessage === 'Success') {
              this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การลงทะเบียนสำเร็จ').then((res: boolean) => {
                if (res) this.loadCustomer();
              });
            } else {
              this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
            }
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            console.error(err);
            this.modalDialogService.handleError(err);
            // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
          }
        })
    } else if (this.customerTypeId === '3') {
      const data = {
        content: {
          addresses: [
            {
              addressNo: this.form.getRawValue().work_address.addressNo,
              alley: this.form.getRawValue().work_address.alley,
              building: this.form.getRawValue().work_address.building,
              // createDate: this.transformDatePipe.transform(this.form.getRawValue().work_address.createDate, 'YYYY-MM-DD'),
              customerId: this.form.getRawValue().work_address.customerId,
              districtCode: this.form.getRawValue().work_address.district,
              districtName: this.form.getRawValue().work_address.districtName,
              floor: this.form.getRawValue().work_address.floor,
              provinceCode: this.form.getRawValue().work_address.province,
              provinceName: this.form.getRawValue().work_address.provinceName,
              soi: this.form.getRawValue().work_address.soi,
              street: this.form.getRawValue().work_address.street,
              subdistrictCode: this.form.getRawValue().work_address.subdistrict,
              subdistrictName: this.form.getRawValue().work_address.subdistrictName,
              typeId: AddressTypeEnum.COMPANY,
              typeName: this.form.getRawValue().work_address.typeName,
              village: this.form.getRawValue().work_address.village,
              villageNo: this.form.getRawValue().work_address.villageNo,
              zipcode: this.form.getRawValue().work_address.zipcode,
            },
            {
              customerId: this.form.getRawValue().etax_address.customerId,
              addressNo: this.form.getRawValue().etax_address.addressNo,
              alley: this.form.getRawValue().etax_address.alley,
              building: this.form.getRawValue().etax_address.building,
              districtCode: this.form.getRawValue().etax_address.district,
              districtName: this.form.getRawValue().etax_address.districtName,
              floor: this.form.getRawValue().etax_address.floor,
              provinceCode: this.form.getRawValue().etax_address.province,
              provinceName: this.form.getRawValue().etax_address.provinceName,
              soi: this.form.getRawValue().etax_address.soi,
              street: this.form.getRawValue().etax_address.street,
              subdistrictCode: this.form.getRawValue().etax_address.subdistrict,
              subdistrictName: this.form.getRawValue().etax_address.subdistrictName,
              typeId: AddressTypeEnum.ETAX,
              typeName: this.form.getRawValue().etax_address.typeName,
              village: this.form.getRawValue().etax_address.village,
              villageNo: this.form.getRawValue().etax_address.villageNo,
              zipcode: this.form.getRawValue().etax_address.zipcode,
            },
          ],
          customer: {
            id: this.customerId,
            customerTypeId: this.customerTypeId,
            title: this.form.getRawValue().title,
            firstName: this.form.getRawValue().firstName,
            lastName: this.form.getRawValue().lastName,
            mobilePhone: this.form.getRawValue().mobilePhone,
            email: this.form.getRawValue().email,
            citizenDocId: this.form.getRawValue().citizenDocId,
            citizenId: this.form.getRawValue().taxId,
            corporateName: this.form.getRawValue().corporateName,
            branchTypeId: this.form.getRawValue().branchType,
            corporateBranch: this.form.getRawValue().branchName,
            branchId: this.form.getRawValue().branchCode,
            cardExpDate: cardExpDateFormat,
            birthdate: birthDateFormat,
            // occupation: this.form.getRawValue().occupation,
            gender: this.form.getRawValue().gender,
            // taxId: this.form.getRawValue().taxId,
          },
          customerContact: {
            id: this.form.get('customerContactId')?.value,
            citizenId: this.form.get('citizenId')?.value,
            dateOfBirth: birthDateFormat,
            title: this.form.get('title')?.value,
            firstName: this.form.get('firstName')?.value,
            lastName: this.form.get('lastName')?.value,
            gender: this.form.get('gender')?.value,
            phone: this.form.get('contactPhone')?.value,
          },
        }
      };
      this.modalDialogService.loading();
      this.restApiService
        .postBackOffice('customer/edit/juristic', data)
        .pipe(
          first(),
          map(res => res as any)
        ).subscribe({
          next: (res) => {
            // alert(res.errorMessage);
            this.modalDialogService.hideLoading();
            console.log("[onSubmit] res => ", res);
            if (res.errorMessage === 'Success') {
              this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การลงทะเบียนสำเร็จ').then((res: boolean) => {
                if (res) window.location.reload(); //this.loadCustomer();
              });
            } else {
              this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
            }
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            console.error(err);
            this.modalDialogService.handleError(err);
            // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
          }
        })
    }
  }

  onUpload() {

  }

  onChangeEmail() {

  }

  onCancel() {
    if (this.customer) {
      // this.setFormValue(this.customer, this.addresses);
      window.location.reload();
    }
  }

  setFormValue(res: ReponseCustomerModel) {
    this.isUpdated = false;
    const formControl = this.form.controls;
    // console.log("[setFormValue] dd", this.transformDatePipe.transform(customer.birthdate, null));
    if (res.customer?.birthdate) {
      formControl['birthdate'].setValue(new Date(res.customer.birthdate));
    }
    if (res.customer?.cardExpDate) {
      formControl['cardExpDate'].setValue(new Date(res.customer.cardExpDate));
    }
    this.onCheckPrefix(res.customer?.title);
    this.prefixList$ = of(this.prefixList);
    formControl['branchTypeId'].setValue(res.customer?.branchTypeId);
    formControl['channelId'].setValue(res.customer?.channelId);
    formControl['citizenDocId'].setValue(res.customer?.citizenDocId);
    formControl['citizenId'].setValue(this.utilitiesService.formatIdCard(res.customer?.citizenId));
    formControl['createDate'].setValue(res.customer?.createDate);
    formControl['customerTypeId'].setValue(res.customer?.customerTypeId);
    formControl['customerTypeName'].setValue(res.customer?.customerTypeName);
    formControl['firstName'].setValue(res.customer?.firstName);
    formControl['gender'].setValue(res.customer?.gender);
    formControl['id'].setValue(res.customer?.id);
    formControl['lastName'].setValue(res.customer?.lastName);
    formControl['mobilePhone'].setValue(res.customer?.mobilePhone);
    formControl['email'].setValue(res.customer?.email);
    formControl['occupation'].setValue(res.customer?.occupation);
    formControl['status'].setValue(res.customer?.status);
    formControl['taxId'].setValue(res.customer?.taxId);
    formControl['title'].setValue(res.customer?.title);
    if (res.customer.customerTypeId === 2) {
      formControl['customerContactId'].setValue(res.customerContact?.id);
      formControl['citizenId'].setValue(res.customerContact?.citizenId);
      formControl['taxId'].setValue(res.customer?.citizenId);
      formControl['contactPhone'].setValue(res.customerContact?.phone);
      formControl['corporateName'].setValue(res.customer?.corporateName);
      formControl['branchType'].setValue(res.customer?.branchTypeId);
      formControl['contactPhone'].setValue(res.customerContact?.phone);
      this.onChangeBranch(res.customer?.branchTypeId);
      formControl['branchName'].setValue(res.customer?.corporateBranch);
      formControl['branchCode'].setValue(res.customer?.branchId);
      // formControl['corporateName'].addValidators([Validators.required]);
      // formControl['corporateName'].updateValueAndValidity();
      // formControl['corporatePhone'].setValue(customer.corporatePhone);
      // formControl['corporatePhone'].addValidators([Validators.required]);
      // formControl['corporatePhone'].updateValueAndValidity();
      // formControl['branchType'].addValidators([Validators.required]);
      // formControl['branchType'].updateValueAndValidity();
      // formControl['branchName'].addValidators([ Validators.required ]);
      // formControl['branchName'].updateValueAndValidity();
      // formControl['branchCode'].addValidators([ Validators.required ]);
      // formControl['branchCode'].updateValueAndValidity();
    }
    res.addresses.forEach(x => {
      const newFormGroup = new FormGroup({
        addressNo: new FormControl(x.addressNo, [Validators.required]),
        building: new FormControl(x.building),
        createDate: new FormControl(x.createDate),
        customerId: new FormControl(x.customerId),
        // districtCode: new FormControl('1036', [ Validators.required ]), // Demo
        floor: new FormControl(x.floor),
        // provinceCode: new FormControl('19', [ Validators.required ]), // Demo
        remark: new FormControl(x.remark),
        soi: new FormControl(x.soi),
        street: new FormControl(x.street),
        // subdistrictCode: new FormControl('103602'), // Demo
        typeId: new FormControl(x.typeId),
        typeName: new FormControl(x.typeName),
        alley: new FormControl(x.alley),
        village: new FormControl(x.village),
        villageNo: new FormControl(x.villageNo),
        province: new FormControl(Number(x.provinceCode), [Validators.required]),
        provinceName: new FormControl(x.provinceName, [Validators.required]),
        district: new FormControl({ value: Number(x.districtCode), disabled: false }, [Validators.required]),
        districtName: new FormControl(x.districtName, [Validators.required]),
        subdistrict: new FormControl({ value: Number(x.subdistrictCode), disabled: false }, [Validators.required]),
        subdistrictName: new FormControl(x.subdistrictName, [Validators.required]),
        zipcode: new FormControl({ value: x.zipcode, disabled: false }, [Validators.required]),
        // zipcode: new FormControl('10210') // Demo
      });
      console.log('setFormValue typeId => ', x.typeId);
      if (x.typeId === 1) {
        formControl['current_address'] = newFormGroup;
      }
      if (x.typeId === 2) {
        formControl['registration_address'] = newFormGroup;
      }
      if (x.typeId === 3) {
        formControl['work_address'] = newFormGroup;
      }
      if (x.typeId === 4) {
        formControl['etax_address'] = newFormGroup;
      }
    });
    console.log("[setFormValue] => ", this.form.value);
    this.form.valueChanges.subscribe(x => {
      console.log("[valueChanges] x => ", x);
      this.isUpdated = true;
    });
    const currentAddressFormGroup = this.form.get('current_address') as FormGroup;
    const registrationAddressFormGroup = this.form.get('registration_address') as FormGroup;
    const workAddressFormGroup = this.form.get('work_address') as FormGroup;
    const etaxAddressFormGroup = this.form.get('etax_address') as FormGroup;
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
    etaxAddressFormGroup.valueChanges.subscribe(changes => {
      this.isUpdated = true;
    });

  }

  addTagPrefixPromise(name: string) {
    return new Promise((resolve) => {
      resolve({
        label: name,
        value: name
      })
    });
  }

  onCheckPrefix(prefix: string | null | undefined) {
    if (!prefix) return;
    const foundPrefix = this.prefixList.find((element) => element.value === prefix);
    if (!foundPrefix) {
      this.prefixList.push({
        label: prefix,
        value: prefix
      });
    }
  }

  onChangeBranch(id: number) {
    if (id === 1) {
      this.form?.get('branchName')?.setValue('สาขาใหญ่');
      this.form?.get('branchCode')?.setValue('00000');
      this.form?.get('branchName')?.disable();
      this.form?.get('branchCode')?.disable();
    } else if (id === 2) {
      this.form?.get('branchName')?.setValue('');
      this.form?.get('branchCode')?.setValue('');
      this.form?.get('branchName')?.enable();
      this.form?.get('branchCode')?.enable();
    }
  }

}
