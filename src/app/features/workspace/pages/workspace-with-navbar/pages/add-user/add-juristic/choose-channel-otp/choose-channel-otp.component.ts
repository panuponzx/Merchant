import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
    this.nextStep.emit();
  }

  onBack() {
    this.backStep.emit();
  }
  
}
