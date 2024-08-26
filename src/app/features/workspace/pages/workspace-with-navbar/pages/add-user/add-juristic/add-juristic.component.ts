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

  public step: number = 1;
  public transactionId: string = '';

  public emailOtpRequest: FormGroup;
  public mobileOtpRequest: FormGroup;
  public companyAddressform: FormGroup;
  public etaxAddressform: FormGroup;

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

    this.emailOtpRequest = this.formBuilder.group({
      email: new FormControl(undefined, [Validators.required, Validators.pattern(CustomRegEx.RegExEmail)]),
    });

    this.mobileOtpRequest = this.formBuilder.group({
      mobile: new FormControl(undefined, [Validators.required]),
    });

    this.companyAddressform = this.formBuilder.group({
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

    this.etaxAddressform = this.formBuilder.group({
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
        if(res.errorMessage === "Success") {
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
