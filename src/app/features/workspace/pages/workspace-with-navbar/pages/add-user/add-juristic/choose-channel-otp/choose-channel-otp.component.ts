import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IJuristicConfirmRequest } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'choose-channel-otp',
  templateUrl: './choose-channel-otp.component.html',
  styleUrl: './choose-channel-otp.component.scss'
})
export class ChooseChannelOtpComponent {

  @Input() emailOtpRequest!: FormGroup;
  @Input() mobileOtpRequest!: FormGroup;
  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<void>();
  @Output() backStep = new EventEmitter<void>();
  
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) {
    this.form = this.formBuilder.group({
      channelOtp: new FormControl(undefined, Validators.required),
    });
  }
  

  onSubmit() {
    this.postConfirmJuristic();
  }

  onBack() {
    this.backStep.emit();
  }

  postConfirmJuristic() {
    const channelOtp = this.form.get('channelOtp')?.value
    const paylaod: IJuristicConfirmRequest = {
      useEmailApplicationResult: channelOtp === 'email' ? true : false,
      useMobileApplicationResult: channelOtp === 'sms' ? true : false,
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<IJuristicConfirmRequest, any>(`onboarding/${this.transactionId}/confirm`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          this.nextStep.emit();
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }
  
}
