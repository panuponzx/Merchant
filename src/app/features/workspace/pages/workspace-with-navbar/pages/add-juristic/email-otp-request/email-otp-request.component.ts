import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IOtpEmailResponse } from 'src/app/core/interfaces';
import { CustomRegEx, RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'email-otp-request',
  templateUrl: './email-otp-request.component.html',
  styleUrl: './email-otp-request.component.scss'
})
export class EmailOtpRequestComponent {

  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<IOtpEmailResponse>();
  @Output() backStep = new EventEmitter<void>();

  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl(undefined, [Validators.required, Validators.pattern(CustomRegEx.RegExEmail)]),
    });
  }

  onSubmit() {
    this.postRequestOtpEmail();
  }

  onBack() {
    this.backStep.emit();
  }

  postRequestOtpEmail() {
    const paylaod = {
      contact: this.form.get('email')?.value
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<any, IOtpEmailResponse>(`onboarding/${this.transactionId}/otp/email/request`, paylaod).subscribe({
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
  
}
