import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../../../../../../core/services';
import { first, map } from 'rxjs';
import { TransformDatePipe } from '../../../../../../../core/pipes';
import { ModalDialogService } from '../../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-input-add-user',
  templateUrl: './input-add-user.component.html',
  styleUrl: './input-add-user.component.scss'
})
export class InputAddUserComponent {

  public step: number = 5;
  public customerType: number = 0;
  public refCode: string | undefined; 

  public userInfoForm!: FormGroup;
  public addressInfoForm: FormGroup;
  public addressCurrentInfoForm: FormGroup;
  public occupationDetailForm: FormGroup;
  public juristicInfoForm: FormGroup;
  public juristicAttachDocument: FormGroup;
  public otpRequestForm: FormGroup;
  public otpConfirmForm: FormGroup;
  nextStep: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private transformDatePipe: TransformDatePipe,
    private modalDialogService: ModalDialogService
  ) {
    const customerTypeStr = this.activatedRoute.snapshot.paramMap.get('customerType');
    if (customerTypeStr === 'personal-info') {
      this.customerType = 1;
      this.userInfoForm = this.formBuilder.group({
        identityType: new FormControl(1, Validators.required),
        firstName: new FormControl(undefined, Validators.required),
        lastName: new FormControl(undefined, Validators.required),
        birthDate: new FormControl(undefined, Validators.required),
        phone: new FormControl(undefined, Validators.required),
        citizenId: new FormControl(undefined, Validators.required),
        cardExpDate: new FormControl(undefined, Validators.required),
        gender: new FormControl('M', Validators.required),
      });
    } else if (customerTypeStr === 'juristic-info') {
      this.customerType = 2;
      this.userInfoForm = this.formBuilder.group({
        identityType: new FormControl(1, Validators.required),
        firstName: new FormControl(undefined, Validators.required),
        lastName: new FormControl(undefined, Validators.required),
        birthDate: new FormControl(undefined, Validators.required),
        phone: new FormControl(undefined, Validators.required),
        // citizenId: new FormControl(undefined, Validators.required),
        // cardExpDate: new FormControl(undefined, Validators.required),
        gender: new FormControl('M', Validators.required),
      });
    }
    console.log("[AddUserInfo] customerType => ", this.customerType);

    this.addressInfoForm = this.formBuilder.group({
      addressNo: new FormControl(undefined, Validators.required),
      building: new FormControl(undefined),
      floor: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      village: new FormControl(undefined),
      alley: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      postalCode: new FormControl(undefined, Validators.required),
      subDistrict: new FormControl({ value: undefined, disabled: true }, Validators.required),
      district: new FormControl({ value: undefined, disabled: true }, Validators.required),
      province: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });
    // this.addressInfoForm = this.formBuilder.group({
    //   addressNo: new FormControl('216', Validators.required),
    //   building: new FormControl(undefined),
    //   floor: new FormControl(undefined),
    //   soi: new FormControl('อนามัยงามเจริญ31'),
    //   street: new FormControl('พระรามที่2'),
    //   postalCode: new FormControl('10150', Validators.required),
    //   subDistrict: new FormControl(undefined, Validators.required),
    //   district: new FormControl({ value: undefined, disabled: false }, Validators.required),
    //   province: new FormControl(undefined, Validators.required),
    // });
    this.addressCurrentInfoForm = this.formBuilder.group({
      isCurrentAddressSameIdcard: new FormControl(false, Validators.required),
      addressNo: new FormControl(undefined, Validators.required),
      building: new FormControl(undefined),
      floor: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      village: new FormControl(undefined),
      alley: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      postalCode: new FormControl(undefined, Validators.required),
      subDistrict: new FormControl({ value: undefined, disabled: true }, Validators.required),
      district: new FormControl({ value: undefined, disabled: true }, Validators.required),
      province: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });

    this.occupationDetailForm = this.formBuilder.group({
      occupation: new FormControl(undefined, Validators.required),
      companyName: new FormControl(undefined, Validators.required),
      addressNo: new FormControl(undefined, Validators.required),
      building: new FormControl(undefined),
      floor: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      village: new FormControl(undefined),
      alley: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      postalCode: new FormControl(undefined, Validators.required),
      subDistrict: new FormControl({ value: undefined, disabled: true }, Validators.required),
      district: new FormControl({ value: undefined, disabled: true }, Validators.required),
      province: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });

    // this.occupationDetailForm = this.formBuilder.group({
    //   occupation: new FormControl('Dev', Validators.required),
    //   companyName: new FormControl('Seen', Validators.required),
    //   addressNo: new FormControl('499', Validators.required),
    //   building: new FormControl('Benchachinda'),
    //   floor: new FormControl('LL'),
    //   soi: new FormControl(undefined),
    //   street: new FormControl('กำแพงเพชร6'),
    //   postalCode: new FormControl('10900', Validators.required),
    //   subDistrict: new FormControl(undefined, Validators.required),
    //   district: new FormControl({value: undefined, disabled: true}, Validators.required),
    //   province: new FormControl({value: undefined, disabled: true}, Validators.required),
    // });

    this.juristicInfoForm = this.formBuilder.group({
      taxId: new FormControl(undefined, Validators.required),
      companyName: new FormControl(undefined, Validators.required),
      branch: new FormControl(undefined, Validators.required),
      branchName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      branchNo: new FormControl({ value: undefined, disabled: true }, Validators.required),
      // companyNumber: new FormControl(undefined, Validators.required),
    });

    this.juristicAttachDocument = this.formBuilder.group({
      attachDocument: new FormControl(undefined, Validators.required),
    });

    this.otpRequestForm = this.formBuilder.group({
      mobilePhone: new FormControl(undefined, [Validators.required, Validators.minLength(10)])
    });

    this.otpConfirmForm = this.formBuilder.group({
      digit_1: [, Validators.required],
      digit_2: [, Validators.required],
      digit_3: [, Validators.required],
      digit_4: [, Validators.required],
      digit_5: [, Validators.required],
      digit_6: [, Validators.required],
    });

  }

  onPreviousStep(step: string) {
    // console.log("[onPreviousStep] step => ", step);
    console.log("[onPreviousStep] step => ", this.step);
    this.step--;
    if (this.step === 0) {
      this.router.navigate(['work-space/add-user']);
    }
    if (this.step === 2 && this.userInfoForm.get('identityType')?.value === 3) {
      this.step = 1;
    }
  }

  onNextStep(step: string) {
    console.log("[onNextStep] step => ", step);
    console.log("[onNext] form => ", this.addressInfoForm.value);
    if (this.step === 1 && this.userInfoForm.get('identityType')?.value === 3) {
      this.step = 3;
    } else {
      this.step++;
    }
  }

  onSubmit(event: boolean) {
    console.log("[onSubmit] event => ", event);
    console.log("[onSubmit] addressCurrentInfoForm => ", this.addressCurrentInfoForm.value);
    const currentAddressProvince = this.addressCurrentInfoForm.get('province')?.value;
    const currentAddressDistrict = this.addressCurrentInfoForm.get('district')?.value;
    const currentAddressSubDistrict = this.addressCurrentInfoForm.get('subDistrict')?.value;
    const registrationAddressProvince = this.addressInfoForm.get('province')?.value;
    const registrationAddressDistrict = this.addressInfoForm.get('district')?.value;
    const registrationAddressSubDistrict = this.addressInfoForm.get('subDistrict')?.value;
    const companyAddressProvince = this.occupationDetailForm.get('province')?.value;
    const companyAddressDistrict = this.occupationDetailForm.get('district')?.value;
    const companyAddressSubDistrict = this.occupationDetailForm.get('subDistrict')?.value;
    const cardExpDateFormat = this.transformDatePipe.transform(this.userInfoForm.get('cardExpDate')?.value, 'YYYY-MM-DD');
    const birthDateFormat = this.transformDatePipe.transform(this.userInfoForm.get('birthDate')?.value, 'YYYY-MM-DD');
    if (this.customerType === 1) {
      const data = {
        customer: {
          customerTypeId: this.customerType,
          title: 'นาย',
          firstName: this.userInfoForm.get('firstName')?.value,
          lastName: this.userInfoForm.get('lastName')?.value,
          mobilePhone: this.userInfoForm.get('phone')?.value,
          // email: 'atiiwwat2@gmail.com',
          citizenDocId: this.userInfoForm.get('identityType')?.value,
          citizenId: this.userInfoForm.get('citizenId')?.value,
          cardExpDate: cardExpDateFormat,
          birthdate: birthDateFormat,
          occupation: this.occupationDetailForm.get('occupation')?.value,
          gender: this.userInfoForm.get('gender')?.value,
          taxId: '',
          requestParam: {
            reqId: "12345",
            channelId: 1,
          }
        }, addresses: [
          ...(
            this.userInfoForm.get('identityType')?.value !== 3 ? [{
              typeId: "1",
              addressNo: this.addressInfoForm.get('addressNo')?.value,
              building: this.addressInfoForm.get('building')?.value,
              floor: this.addressInfoForm.get('floor')?.value,
              villageNo: this.addressInfoForm.get('villageNo')?.value,
              village: this.addressInfoForm.get('village')?.value,
              alley: this.addressInfoForm.get('alley')?.value,
              soi: this.addressInfoForm.get('soi')?.value,
              street: this.addressInfoForm.get('street')?.value,
              provinceCode: registrationAddressProvince?.id,
              districtCode: registrationAddressDistrict?.id,
              subdistrictCode: registrationAddressSubDistrict?.subdistrict.id,
              // provinceCode: "03",
              // districtCode: "04",
              // subdistrictCode: "99",
              zipcode: this.addressInfoForm.get('postalCode')?.value,
            }] : []
          ),
          {
            typeId: "2",
            addressNo: this.addressCurrentInfoForm.get('addressNo')?.value,
            building: this.addressCurrentInfoForm.get('building')?.value,
            floor: this.addressCurrentInfoForm.get('floor')?.value,
            villageNo: this.addressCurrentInfoForm.get('villageNo')?.value,
            village: this.addressCurrentInfoForm.get('village')?.value,
            alley: this.addressCurrentInfoForm.get('alley')?.value,
            soi: this.addressCurrentInfoForm.get('soi')?.value,
            street: this.addressCurrentInfoForm.get('street')?.value,
            provinceCode: currentAddressProvince.id,
            districtCode: currentAddressDistrict.id,
            subdistrictCode: currentAddressSubDistrict.subdistrict.id,
            // provinceCode: "03",
            // districtCode: "04",
            // subdistrictCode: "99",
            zipcode: this.addressCurrentInfoForm.get('postalCode')?.value,
          },
          {
            typeId: "3",
            addressNo: this.occupationDetailForm.get('addressNo')?.value,
            building: this.occupationDetailForm.get('building')?.value,
            floor: this.occupationDetailForm.get('floor')?.value,
            villageNo: this.occupationDetailForm.get('villageNo')?.value,
            village: this.occupationDetailForm.get('village')?.value,
            alley: this.occupationDetailForm.get('alley')?.value,
            soi: this.occupationDetailForm.get('soi')?.value,
            street: this.occupationDetailForm.get('street')?.value,
            provinceCode: companyAddressProvince.id,
            districtCode: companyAddressDistrict.id,
            subdistrictCode: companyAddressSubDistrict.subdistrict.id,
            // provinceCode: "03",
            // districtCode: "04",
            // subdistrictCode: "99",
            zipcode: this.occupationDetailForm.get('postalCode')?.value,
          },
        ]

      }
      this.modalDialogService.loading();
      this.restApiService
        .post('add-customer', data)
        .pipe(
          first(),
          map(res => res as any)
        ).subscribe({
          next: (res) => {
            this.modalDialogService.hideLoading();
            if (res.errorMessage === "Success") {
              console.log("[onSubmit] res => ", res);
              this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การลงทะเบียนสำเร็จ');
              this.router.navigate(['work-space/menu-option']);
            } else {
              this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
            }

          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            console.error(err);
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', `${err.body.errorMessage}`);
          }
        })
    } else if (this.customerType === 2) {
      const file: File = this.juristicAttachDocument.get('attachDocument')?.value;
      const data = {
        customer: {
          customerTypeId: this.customerType,
          title: 'นาย',
          firstName: this.userInfoForm.get('firstName')?.value,
          lastName: this.userInfoForm.get('lastName')?.value,
          mobilePhone: this.userInfoForm.get('phone')?.value,
          // email: 'atiiwwat2@gmail.com',
          // citizenDocId: this.userInfoForm.get('identityType')?.value,
          citizenDocId: 4,
          // citizenId: this.userInfoForm.get('citizenId')?.value,
          citizenId: this.juristicInfoForm.get('taxId')?.value,
          // cardExpDate: cardExpDateFormat,
          birthdate: birthDateFormat,
          // occupation: this.occupationDetailForm.get('occupation')?.value,
          gender: this.userInfoForm.get('gender')?.value,
          taxId: this.juristicInfoForm.get('taxId')?.value,
          corporateName: this.juristicInfoForm.get('companyName')?.value,
          branchTypeId: this.juristicInfoForm.get('branch')?.value,
          corporateBranch: this.juristicInfoForm.get('branchName')?.value,
          branchId: this.juristicInfoForm.get('branchNo')?.value,
          requestParam: {
            reqId: "12345",
            channelId: 1,
          }
        }, addresses: [
          {
            typeId: "3",
            addressNo: this.addressInfoForm.get('addressNo')?.value,
            building: this.addressInfoForm.get('building')?.value,
            floor: this.addressInfoForm.get('floor')?.value,
            villageNo: this.addressInfoForm.get('villageNo')?.value,
            village: this.addressInfoForm.get('village')?.value,
            alley: this.addressInfoForm.get('alley')?.value,
            soi: this.addressInfoForm.get('soi')?.value,
            street: this.addressInfoForm.get('street')?.value,
            provinceCode: registrationAddressProvince?.id,
            provinceName: registrationAddressProvince?.name,
            districtCode: registrationAddressDistrict?.id,
            districtName: registrationAddressDistrict?.name,
            subdistrictCode: registrationAddressSubDistrict?.subdistrict.id,
            subdistrictName: registrationAddressSubDistrict?.subdistrict.name,
            // provinceCode: "03",
            // districtCode: "04",
            // subdistrictCode: "99",
            zipcode: this.addressInfoForm.get('postalCode')?.value,
          },
        ]

      }
      console.log("[onSubmit] data2 => ", data);
      this.modalDialogService.loading();
      this.restApiService
        .postAddForJuristic('customer/add/juristic', data, file)
        .pipe(
          first(),
          map(res => res as any)
        ).subscribe({
          next: (res) => {
            this.modalDialogService.hideLoading();
            if (res.errorMessage === "Success") {
              console.log("[onSubmit] res => ", res);
              this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การลงทะเบียนสำเร็จ');
              this.router.navigate(['work-space/menu-option']);
            } else {
              this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
            }

          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            console.error(err);
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', `${err.body.errorMessage}`);
          }
        })
    }
  }

}
