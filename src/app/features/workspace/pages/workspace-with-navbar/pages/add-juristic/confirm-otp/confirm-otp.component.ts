import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IOtpEmailResponse, IVerifyOtpRequest } from 'src/app/core/interfaces';
import { RestApiService, CustomRegEx } from 'src/app/core/services';
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
    private restApiService: RestApiService
  ) {
    this.form = this.formBuilder.group({
      otp: new FormControl(undefined, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    });
  }

  get otpControl(): FormControl {
    return this.form.get('otp') as FormControl;
  }

  onSubmit() {
    if(this.verifyOtpType === 'email') {
      this.postVerifyEmail();
    }else if(this.verifyOtpType === 'mobile') {

    }
  }

  onBack() {
    this.backStep.emit();
  }

  postVerifyEmail() {
    const paylaod = {
      otp: this.form.get('otp')?.value,
      ref: this.verifyOtpRequest.ref
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<IVerifyOtpRequest, any>(`onboarding/${this.transactionId}/otp/email/verify`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if(res.errorMessage === "Success") {
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

  }
  
}
