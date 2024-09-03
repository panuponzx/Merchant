import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBeginResponse, IJuristicModel, IOtpEmailResponse, IVerifyOtpRequest } from 'src/app/core/interfaces';
import { CustomRegEx, RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-add-juristic',
  templateUrl: './add-juristic.component.html',
  styleUrl: './add-juristic.component.scss'
})
export class AddJuristicComponent implements OnInit {

  public step: number = 6;
  public transactionId: string = '';

  public emailOtpRequestForm: FormGroup;
  public mobileOtpRequestForm: FormGroup;
  public contactPersonForm: FormGroup;
  public juristicInfoForm: FormGroup
  public companyAddressForm: FormGroup;
  public etaxAddressForm: FormGroup;

  // public verifyEmailOtpRequest = {} as IVerifyOtpRequest;
  // public verifyMobileOtpRequest = {} as IVerifyOtpRequest;

  public otpEmailResponse = {} as IOtpEmailResponse;
  public juristicInfo = {} as IJuristicModel;

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

    this.emailOtpRequestForm = this.formBuilder.group({
      email: new FormControl(undefined, [Validators.required, Validators.pattern(CustomRegEx.RegExEmail)]),
    });

    this.mobileOtpRequestForm = this.formBuilder.group({
      mobile: new FormControl(undefined, [Validators.required]),
    });

    this.contactPersonForm = this.formBuilder.group({
      citizenId: new FormControl(undefined, Validators.required),
      laserCode: new FormControl(undefined, Validators.required),
      gender: new FormControl('M', Validators.required),
      cardExpDate: new FormControl(undefined, Validators.required),
      prefix: new FormControl(undefined, Validators.required),
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      birthDate: new FormControl(undefined, Validators.required),
      phone: new FormControl(undefined, Validators.required),
    });

    // this.contactPersonForm = this.formBuilder.group({
    //   citizenId: new FormControl('1459900715114', Validators.required),
    //   laserCode: new FormControl('ME2139451593999999', Validators.required),
    //   gender: new FormControl('M', Validators.required),
    //   cardExpDate: new FormControl(undefined, Validators.required),
    //   prefix: new FormControl(undefined, Validators.required),
    //   firstName: new FormControl('อธิวัฒน์', Validators.required),
    //   lastName: new FormControl('ทองมาก', Validators.required),
    //   birthDate: new FormControl(undefined, Validators.required),
    //   phone: new FormControl('0943485992', Validators.required),
    // });

    this.juristicInfoForm = this.formBuilder.group({
      taxId: new FormControl(undefined, Validators.required),
      companyName: new FormControl(undefined, Validators.required),
      branch: new FormControl(undefined, Validators.required),
      branchName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      branchNo: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });

    this.companyAddressForm = this.formBuilder.group({
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

    this.etaxAddressForm = this.formBuilder.group({
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
  }

  ngOnInit(): void {
    this.postBegin();
  }

  onNextStep() {
    this.step++;
    if (this.step === 12) {
      this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การลงทะเบียนสำเร็จ').then((res: boolean) => {
        if (res) this.router.navigate(['work-space/menu-option']);
      })
    }
  }

  onNextRequestOtpEmailStep(response: IOtpEmailResponse) {
    console.log("[onNextRequestOtpEmailStep] response => ", response);
    // this.verifyEmailOtpRequest.ref = response.ref;
    this.otpEmailResponse = response;
    this.step++;
  }

  onNextJuristicInfo(data: IJuristicModel) {
    this.juristicInfo = data;
    this.step++;
  }

  onBackStep() {
    this.step--;
    if (this.step === 0) {
      this.router.navigate(['work-space/add-user']);
    }
  }

  postBegin() {
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<any, IBeginResponse>(`onboarding/begin/juristic`, null).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          this.transactionId = res.data.txnId;
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
        this.router.navigate(['work-space/add-user']);
      }
    })
  }

}
