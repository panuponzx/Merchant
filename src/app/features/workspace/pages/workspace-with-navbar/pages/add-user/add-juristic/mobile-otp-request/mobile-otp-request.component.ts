import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOtpEmailResponse } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { CountdownService } from 'src/app/core/services/countdown/countdown.service';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'mobile-otp-request',
  templateUrl: './mobile-otp-request.component.html',
  styleUrl: './mobile-otp-request.component.scss'
})
export class MobileOtpRequestComponent {

  @Input() form!: FormGroup;
  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<IOtpEmailResponse>();
  @Output() backStep = new EventEmitter<void>();

  constructor(
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService,
    private countdownService: CountdownService
  ) { }

  onSubmit() {
    this.postRequestOtpMobile();
  }

  onBack() {
    this.backStep.emit();
  }

  postRequestOtpMobile() {
    const paylaod = {
      contact: this.form.get('mobile')?.value
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<any, IOtpEmailResponse>(`onboarding/${this.transactionId}/otp/mobile/request`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          this.countdownService.startCountdown(15);
          this.nextStep.emit(res.data);
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }
}
