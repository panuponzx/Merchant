import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputComponent } from 'ng-otp-input';
import { first, map } from 'rxjs';
import { IEmailOtpModel, IEmailOtpVerifyModel, ResponseModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-email-verification-modal',
  templateUrl: './email-verification-modal.component.html',
  styleUrl: './email-verification-modal.component.scss'
})
export class EmailVerificationModalComponent {
  @ViewChild('ngOtpInput') ngOtpInputRef:any;

  public stepEnum = {
    SENT_OTP: "sent-otp",
    CONFIRM_OTP: "confirm-otp",
    SUCCESS: "success",
  }
  public step: string = this.stepEnum.SENT_OTP;
  public ngOtpConfig={
    length: 6,
    allowNumbersOnly: true
  }
  // public form: FormGroup;
  public otpCtrl: FormControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public isLoading: boolean = false;
  public otpData: IEmailOtpModel = {} as IEmailOtpModel;
  public otpDelay: number = 0;
  public otpDelayInterval: any | undefined;
  public errorMessage: string | undefined;



  constructor(private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    public ngbActiveModal: NgbActiveModal,
    private modalDialogService: ModalDialogService) {

  }

  ngOnDestroy() {
    if(this.otpDelayInterval) clearInterval(this.otpDelayInterval);
  }

  onDismisModal() {
    this.ngbActiveModal.dismiss(false);
  }

  onBackStep() {
    this.step = this.stepEnum.SENT_OTP;
  }

  onSentOtp() {
    this.isLoading = true;
    this.errorMessage = undefined;
    this.postSentOtp();
  }

  onSentOtpAgain() {
    this.otpDelay = -1;
    this.postSentOtp();
  }

  startInterval(minute: number = 1) {
    this.otpDelay = 1*60;
    if(this.otpDelayInterval) clearInterval(this.otpDelayInterval);
    this.otpDelayInterval = setInterval(() => {
      this.otpDelay--;
      // console.log(this.otpDelay);

      if (this.otpDelay == 0) {
        clearInterval(this.otpDelayInterval);
      }
    }, 1000);
  }

  postSentOtp() {
    const data = {
      recipientEmail: this.email.value,
    };
    this.modalDialogService.loading();
    this.restApiService.postBackOffice('notification/email-otp', data).pipe(
      first(),
    ).subscribe(
      {
        next: (response) => {
          let data = response as ResponseModel<IEmailOtpModel>;
          this.otpData = data.data;
          this.isLoading = false;
          this.modalDialogService.hideLoading();
        },
        error: (error) => {
          console.error(error.error);
          this.errorMessage = `Server Error: ${error.error.errorMessage}`;
          this.isLoading = false;
          this.modalDialogService.hideLoading();
        },
        complete: () => {
          this.step = this.stepEnum.CONFIRM_OTP;
          this.modalDialogService.hideLoading();
          this.startInterval(parseFloat(this.otpData.limit_minute));
        }
      }
    )
  }

  postSentOtpVerify() {
    this.modalDialogService.loading();
    this.isLoading = true;
    this.errorMessage = undefined;
    const data = {
      verifyToken: this.otpData.verify_token,
      verifyCode: this.otpCtrl.value,
      refCode: this.otpData.ref_code,
    };

    this.restApiService.postBackOffice('notification/email-otp-verify', data).pipe(
      first(),
      map((response) => {
        let res = response as ResponseModel<IEmailOtpVerifyModel>;
        if(res.data.verified === false) {
          throw new Error("OTP is invalid");
        }
        return res;
      }),
    ).subscribe(
      {
        next: (response) => {
          this.isLoading = false;
          this.modalDialogService.hideLoading();
        },
        error: (error) => {
          this.ngOtpInputRef.setValue('');
          console.error(error.message || error.error.errorMessage);
          this.errorMessage = `Server Error: ${error.message || error.error.errorMessage}`;
          this.isLoading = false;
          this.modalDialogService.hideLoading();
        },
        complete: () => {
          console.log("complete");
          this.modalDialogService.hideLoading();
          this.ngbActiveModal.close(this.email.value);
        }
      }
    )
  }

}
