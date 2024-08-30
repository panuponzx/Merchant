import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IOtpEmailResponse, IVerifyOtpRequest } from 'src/app/core/interfaces';
import { RestApiService, CustomRegEx } from 'src/app/core/services';
import { CountdownService } from 'src/app/core/services/countdown/countdown.service';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.scss'
})
export class ConfirmOtpComponent {

  @Input() transactionId!: string;
  @Input() verifyOtpType: 'email' | 'mobile' = 'email';
  @Input() verifyOtpRequest!: IOtpEmailResponse;

  @Output() nextStep = new EventEmitter<void>();
  @Output() backStep = new EventEmitter<void>();

  form: FormGroup;

  public ngOtpConfig = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'custom-input-otp'
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService,
    public countdownService: CountdownService
  ) {
    this.form = this.formBuilder.group({
      otp: new FormControl(undefined, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    });
  }

  get otpControl(): FormControl {
    return this.form.get('otp') as FormControl;
  }

  onSubmit() {
    if (this.verifyOtpType === 'email') {
      this.postVerifyEmail();
    } else if (this.verifyOtpType === 'mobile') {
      this.postVerifyMobile();
    }
  }

  onBack() {
    this.backStep.emit();
  }

  postVerifyEmail() {
    const paylaod = {
      otp: this.form.get('otp')?.value,
      sysReference: this.verifyOtpRequest.sysReference
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<IVerifyOtpRequest, any>(`onboarding/${this.transactionId}/otp/email/verify`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          this.countdownService.resetStartCountdown();
          this.nextStep.emit(res.data);
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  postVerifyMobile() {
    const paylaod = {
      otp: this.form.get('otp')?.value,
      sysReference: this.verifyOtpRequest.sysReference
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<IVerifyOtpRequest, any>(`onboarding/${this.transactionId}/otp/mobile/verify`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          this.countdownService.resetStartCountdown();
          this.nextStep.emit(res.data);
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onResend() {
    if (this.verifyOtpType === 'email') {
      this.postRequestOtpEmail();
    } else if (this.verifyOtpType === 'mobile') {
      this.postRequestOtpMobile();
    }
  }

  postRequestOtpEmail() {
    const paylaod = {
      contact: this.verifyOtpRequest.sendTo
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<any, IOtpEmailResponse>(`onboarding/${this.transactionId}/otp/email/request`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if(res.errorMessage === "Success") {
          this.countdownService.startCountdown(res.data.timeoutInSec);
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  postRequestOtpMobile() {
    const paylaod = {
      contact: this.verifyOtpRequest.sendTo
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<any, IOtpEmailResponse>(`onboarding/${this.transactionId}/otp/mobile/request`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          this.countdownService.startCountdown(15);
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

}
