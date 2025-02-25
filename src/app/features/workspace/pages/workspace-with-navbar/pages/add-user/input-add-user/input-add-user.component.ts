import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomRegEx, RestApiService } from '../../../../../../../core/services';
import { first, map } from 'rxjs';
import { TransformDatePipe } from '../../../../../../../core/pipes';
import { ModalDialogService } from '../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { AddressTypeEnum } from 'src/app/core/enum/address.enum';

@Component({
  selector: 'app-input-add-user',
  templateUrl: './input-add-user.component.html',
  styleUrl: './input-add-user.component.scss'
})
export class InputAddUserComponent {

  public step: number = 1;
  public customerType: number = 1;
  public refCode: string | undefined;

  public userInfoForm!: FormGroup;
  public addressInfoForm: FormGroup;
  public addressCurrentInfoForm: FormGroup;
  public occupationDetailForm: FormGroup;
  public addressEtaxForm: FormGroup;
  public juristicInfoForm: FormGroup;
  public juristicAttachDocument: FormGroup;
  public termCoditionForm: FormGroup;
  public otpRequestForm: FormGroup;
  public otpConfirmForm: FormGroup;
  public identityTypeForm: FormGroup;
  nextStep: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private transformDatePipe: TransformDatePipe,
    private modalDialogService: ModalDialogService
  ) {
    this.userInfoForm = this.formBuilder.group({
      // identityType: new FormControl(1, Validators.required),
      prefix: new FormControl(undefined, Validators.required),
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      birthDate: new FormControl(undefined, Validators.required),
      // phone: new FormControl(undefined, Validators.required),
      citizenId: new FormControl(undefined, Validators.required),
      cardExpDate: new FormControl(undefined, Validators.required),
      gender: new FormControl('M', Validators.required),
    });
    this.addressInfoForm = this.formBuilder.group({
      addressNo: new FormControl(undefined, Validators.required),
      building: new FormControl(undefined),
      floor: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      village: new FormControl(undefined),
      alley: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      province: new FormControl({ value: undefined, disabled: false }, Validators.required),
      provinceName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      district: new FormControl({ value: undefined, disabled: true }, Validators.required),
      districtName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      subdistrict: new FormControl({ value: undefined, disabled: true }, Validators.required),
      subdistrictName: new FormControl({ value: undefined, disabled: false }, Validators.required),
      zipcode: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });
    // this.addressInfoForm = this.formBuilder.group({
    //   addressNo: new FormControl('216', Validators.required),
    //   building: new FormControl(undefined),
    //   floor: new FormControl(undefined),
    //   villageNo: new FormControl(undefined),
    //   village: new FormControl(undefined),
    //   alley: new FormControl(undefined),
    //   soi: new FormControl('อนามัยงามเจริญ31'),
    //   street: new FormControl(undefined),
    //   province: new FormControl({ value: 1, disabled: false }, Validators.required),
    //   provinceName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
    //   district: new FormControl({ value: 21, disabled: false }, Validators.required),
    //   districtName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
    //   subdistrict: new FormControl({ value: 88, disabled: false }, Validators.required),
    //   subdistrictName: new FormControl({ value: undefined, disabled: false }, Validators.required),
    //   zipcode: new FormControl({ value: '10150', disabled: false }, Validators.required),
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
      province: new FormControl({ value: undefined, disabled: false }, Validators.required),
      provinceName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      district: new FormControl({ value: undefined, disabled: true }, Validators.required),
      districtName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      subdistrict: new FormControl({ value: undefined, disabled: true }, Validators.required),
      subdistrictName: new FormControl({ value: undefined, disabled: false }, Validators.required),
      zipcode: new FormControl({ value: undefined, disabled: true }, Validators.required),
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
      province: new FormControl({ value: undefined, disabled: false }, Validators.required),
      provinceName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      district: new FormControl({ value: undefined, disabled: true }, Validators.required),
      districtName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      subdistrict: new FormControl({ value: undefined, disabled: true }, Validators.required),
      subdistrictName: new FormControl({ value: undefined, disabled: false }, Validators.required),
      zipcode: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });

    // this.occupationDetailForm = this.formBuilder.group({
    //   occupation: new FormControl('Dev', Validators.required),
    //   companyName: new FormControl('Seen', Validators.required),
    //   addressNo: new FormControl('499', Validators.required),
    //   building: new FormControl('Benchachinda'),
    //   floor: new FormControl('LL'),
    //   villageNo: new FormControl(undefined),
    //   village: new FormControl(undefined),
    //   alley: new FormControl(undefined),
    //   soi: new FormControl(undefined),
    //   street: new FormControl('กำแพงเพชร6'),
    //   zipcode: new FormControl('10900', Validators.required),
    //   subDistrict: new FormControl(undefined, Validators.required),
    //   district: new FormControl({value: undefined, disabled: true}, Validators.required),
    //   province: new FormControl({value: undefined, disabled: true}, Validators.required),
    // });

    this.addressEtaxForm = this.formBuilder.group({
      isEtaxAddressSame: new FormControl("4"),
      isSameWorkAddress: new FormControl(undefined),
      addressNo: new FormControl(undefined, Validators.required),
      building: new FormControl(undefined),
      floor: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      village: new FormControl(undefined),
      alley: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      province: new FormControl({ value: undefined, disabled: false }, Validators.required),
      provinceName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      district: new FormControl({ value: undefined, disabled: true }, Validators.required),
      districtName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      subdistrict: new FormControl({ value: undefined, disabled: true }, Validators.required),
      subdistrictName: new FormControl({ value: undefined, disabled: false }, Validators.required),
      zipcode: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });

    this.juristicInfoForm = this.formBuilder.group({
      taxId: new FormControl(undefined, Validators.required),
      companyName: new FormControl(undefined, Validators.required),
      branch: new FormControl(undefined, Validators.required),
      branchName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      branchNo: new FormControl({ value: undefined, disabled: true }, Validators.required),
      // companyNumber: new FormControl(undefined, Validators.required),
    });

    this.juristicAttachDocument = this.formBuilder.group({
      attachDocument: new FormControl(undefined),
    });

    this.termCoditionForm = this.formBuilder.group({

    });

    this.otpRequestForm = this.formBuilder.group({
      email: new FormControl(undefined, [Validators.required, Validators.pattern(CustomRegEx.RegExEmail)]),
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

    this.identityTypeForm = this.formBuilder.group({
      identityType: new FormControl(undefined, Validators.required),
    });

  }

  onPreviousStep(step: string) {
    console.log("[onPreviousStep] befor step => ", this.step);
    this.step--;
    if (this.step === 0) {
      this.router.navigate(['work-space/add-user']);
    }
    console.log("[onPreviousStep] after step => ", this.step);
    if (this.customerType === 1 && this.step === 8 && this.identityTypeForm.get('identityType')?.value === 3) {
      this.step = 7;
    }
  }

  onNextStep(step: string) {
    console.log("[onNextStep] befor step => ", this.step);
    this.step++;
    console.log("[onNextStep] after step => ", this.step);
    if (this.customerType === 1 && this.step === 8 && this.identityTypeForm.get('identityType')?.value === 3) {
      this.step = 9;
    }
  }

  onSubmit() {
    console.log("[onSubmit] addressCurrentInfoForm => ", this.addressCurrentInfoForm.value);
    const cardExpDateFormat = this.transformDatePipe.transform(this.userInfoForm.get('cardExpDate')?.value, 'YYYY-MM-DD');
    const birthDateFormat = this.transformDatePipe.transform(this.userInfoForm.get('birthDate')?.value, 'YYYY-MM-DD');
    if (this.customerType === 1) {
      const data = {
        customer: {
          customerTypeId: this.customerType,
          title: this.userInfoForm.get('prefix')?.value,
          firstName: this.userInfoForm.get('firstName')?.value,
          lastName: this.userInfoForm.get('lastName')?.value,
          mobilePhone: this.otpRequestForm.get('mobilePhone')?.value,
          email: this.otpRequestForm.get('email')?.value,
          citizenDocId: this.identityTypeForm.get('identityType')?.value,
          citizenId: this.userInfoForm.get('citizenId')?.value,
          cardExpDate: cardExpDateFormat,
          birthdate: birthDateFormat,
          occupation: this.occupationDetailForm.get('occupation')?.value,
          gender: this.userInfoForm.get('gender')?.value,
          taxId: ''
        }, addresses: [
          ...(
            this.identityTypeForm.get('identityType')?.value !== 3 ? [{
              typeId: AddressTypeEnum.REGISTRATION,
              addressNo: this.addressInfoForm.get('addressNo')?.value,
              building: this.addressInfoForm.get('building')?.value,
              floor: this.addressInfoForm.get('floor')?.value,
              villageNo: this.addressInfoForm.get('villageNo')?.value,
              village: this.addressInfoForm.get('village')?.value,
              alley: this.addressInfoForm.get('alley')?.value,
              soi: this.addressInfoForm.get('soi')?.value,
              street: this.addressInfoForm.get('street')?.value,
              provinceCode: this.addressInfoForm.get('province')?.getRawValue(),
              districtCode: this.addressInfoForm.get('district')?.getRawValue(),
              subdistrictCode: this.addressInfoForm.get('subdistrict')?.getRawValue(),
              // provinceCode: "03",
              // districtCode: "04",
              // subdistrictCode: "99",
              zipcode: this.addressInfoForm.get('zipcode')?.value,
            }] : []
          ),
          {
            typeId: AddressTypeEnum.CURRENT,
            addressNo: this.addressCurrentInfoForm.get('addressNo')?.value,
            building: this.addressCurrentInfoForm.get('building')?.value,
            floor: this.addressCurrentInfoForm.get('floor')?.value,
            villageNo: this.addressCurrentInfoForm.get('villageNo')?.value,
            village: this.addressCurrentInfoForm.get('village')?.value,
            alley: this.addressCurrentInfoForm.get('alley')?.value,
            soi: this.addressCurrentInfoForm.get('soi')?.value,
            street: this.addressCurrentInfoForm.get('street')?.value,
            provinceCode: this.addressCurrentInfoForm.get('province')?.value,
            districtCode: this.addressCurrentInfoForm.get('district')?.value,
            subdistrictCode: this.addressCurrentInfoForm.get('subdistrict')?.value,
            // provinceCode: "03",
            // districtCode: "04",
            // subdistrictCode: "99",
            zipcode: this.addressCurrentInfoForm.get('zipcode')?.value,
          },
          {
            typeId: AddressTypeEnum.COMPANY,
            addressNo: this.occupationDetailForm.get('addressNo')?.value,
            building: this.occupationDetailForm.get('building')?.value,
            floor: this.occupationDetailForm.get('floor')?.value,
            villageNo: this.occupationDetailForm.get('villageNo')?.value,
            village: this.occupationDetailForm.get('village')?.value,
            alley: this.occupationDetailForm.get('alley')?.value,
            soi: this.occupationDetailForm.get('soi')?.value,
            street: this.occupationDetailForm.get('street')?.value,
            provinceCode: this.occupationDetailForm.get('province')?.value,
            districtCode: this.occupationDetailForm.get('district')?.value,
            subdistrictCode: this.occupationDetailForm.get('subdistrict')?.value,
            // provinceCode: "03",
            // districtCode: "04",
            // subdistrictCode: "99",
            zipcode: this.occupationDetailForm.get('zipcode')?.value,
          },
          {
            typeId: AddressTypeEnum.ETAX,
            addressNo: this.addressEtaxForm.get('addressNo')?.value,
            building: this.addressEtaxForm.get('building')?.value,
            floor: this.addressEtaxForm.get('floor')?.value,
            villageNo: this.addressEtaxForm.get('villageNo')?.value,
            village: this.addressEtaxForm.get('village')?.value,
            alley: this.addressEtaxForm.get('alley')?.value,
            soi: this.addressEtaxForm.get('soi')?.value,
            street: this.addressEtaxForm.get('street')?.value,
            provinceCode: this.addressEtaxForm.get('province')?.value,
            districtCode: this.addressEtaxForm.get('district')?.value,
            subdistrictCode: this.addressEtaxForm.get('subdistrict')?.value,
            zipcode: this.addressEtaxForm.get('zipcode')?.value,
          },
        ]

      }
      console.log("[onSubmit] add-customer => ", data);
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
            this.modalDialogService.handleError(err);
            // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
          }
        })
    } else if (this.customerType === 2) {
      // const file: File = this.juristicAttachDocument.get('attachDocument')?.value;
      const data = {
        customer: {
          customerTypeId: this.customerType,
          title: this.userInfoForm.get('prefix')?.value,
          firstName: this.userInfoForm.get('firstName')?.value,
          lastName: this.userInfoForm.get('lastName')?.value,
          mobilePhone: this.otpRequestForm.get('mobilePhone')?.value,
          email: this.otpRequestForm.get('email')?.value,
          // citizenDocId: this.userInfoForm.get('identityType')?.value,
          citizenDocId: 4,
          // citizenId: this.userInfoForm.get('citizenId')?.value,
          citizenId: this.juristicInfoForm.get('taxId')?.value,
          // cardExpDate: cardExpDateFormat,
          birthdate: birthDateFormat,
          // occupation: this.occupationDetailForm.get('occupation')?.value,
          gender: this.userInfoForm.get('gender')?.value,
          // taxId: this.juristicInfoForm.get('taxId')?.value,
          corporateName: this.juristicInfoForm.get('companyName')?.value,
          branchTypeId: this.juristicInfoForm.get('branch')?.value,
          corporateBranch: this.juristicInfoForm.get('branchName')?.value,
          branchId: this.juristicInfoForm.get('branchNo')?.value,
        },
        customerContact: {
          citizenId: this.userInfoForm.get('citizenId')?.value,
          dateOfBirth: birthDateFormat,
          title: this.userInfoForm.get('prefix')?.value,
          firstName: this.userInfoForm.get('firstName')?.value,
          lastName: this.userInfoForm.get('lastName')?.value,
          gender: this.userInfoForm.get('gender')?.value,
          phone: this.userInfoForm.get('phone')?.value,
        },
        addresses: [
          {
            typeId: AddressTypeEnum.COMPANY,
            addressNo: this.addressInfoForm.get('addressNo')?.value,
            building: this.addressInfoForm.get('building')?.value,
            floor: this.addressInfoForm.get('floor')?.value,
            villageNo: this.addressInfoForm.get('villageNo')?.value,
            village: this.addressInfoForm.get('village')?.value,
            alley: this.addressInfoForm.get('alley')?.value,
            soi: this.addressInfoForm.get('soi')?.value,
            street: this.addressInfoForm.get('street')?.value,
            provinceCode: this.addressInfoForm.get('province')?.value,
            provinceName: this.addressInfoForm.get('provinceName')?.value,
            districtCode: this.addressInfoForm.get('district')?.value,
            districtName: this.addressInfoForm.get('districtName')?.value,
            subdistrictCode: this.addressInfoForm.get('subdistrict')?.value,
            subdistrictName: this.addressInfoForm.get('subdistrictName')?.value,
            // provinceCode: "03",
            // districtCode: "04",
            // subdistrictCode: "99",
            zipcode: this.addressInfoForm.get('zipcode')?.value,
          },
          {
            typeId: AddressTypeEnum.ETAX,
            addressNo: this.addressEtaxForm.get('addressNo')?.value,
            building: this.addressEtaxForm.get('building')?.value,
            floor: this.addressEtaxForm.get('floor')?.value,
            villageNo: this.addressEtaxForm.get('villageNo')?.value,
            village: this.addressEtaxForm.get('village')?.value,
            alley: this.addressEtaxForm.get('alley')?.value,
            soi: this.addressEtaxForm.get('soi')?.value,
            street: this.addressEtaxForm.get('street')?.value,
            provinceCode: this.addressEtaxForm.get('province')?.value,
            provinceName: this.addressEtaxForm.get('provinceName')?.value,
            districtCode: this.addressEtaxForm.get('district')?.value,
            districtName: this.addressEtaxForm.get('districtName')?.value,
            subdistrictCode: this.addressEtaxForm.get('subdistrict')?.value,
            subdistrictName: this.addressEtaxForm.get('subdistrictName')?.value,
            zipcode: this.addressEtaxForm.get('zipcode')?.value,
          },
        ]

      }
      console.log("[onSubmit] add/juristic => ", data);
      this.modalDialogService.loading();
      this.restApiService
        .postAddForJuristic('customer/add/juristic', data)
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
            this.modalDialogService.handleError(err);
            // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
          }
        })
    }
  }

}
