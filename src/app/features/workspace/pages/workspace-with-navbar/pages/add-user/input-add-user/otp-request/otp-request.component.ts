import { AfterContentInit, Component, ElementRef, ErrorHandler, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerInfoModel } from 'src/app/core/interfaces/curomerInfo.interface';
import { CustomerInfoService } from 'src/app/core/services/cutomer-info-service/customer-info.service';

@Component({
  selector: 'otp-request',
  templateUrl: './otp-request.component.html',
  styleUrl: './otp-request.component.scss'
})
export class OtpRequestComponent implements AfterContentInit, OnInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form!: FormGroup;
  @Input() public step: number = 0;
  @Input() public customerType: number = 0;
  // @Input() public mobileNumber!: number;

  @Output() public mobileNumber!: number;
  @Output() public refCode: string | undefined;
  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();


  footerHeight: number = 0;


  constructor(
    private customerInfoService: CustomerInfoService

  ) { }

  ngOnInit(): void {
    if (this.step === 2) {
      this.form.get('email')?.enable();
      this.form.get('mobilePhone')?.disable();
    } else if (this.step === 4) {
      this.form.get('email')?.disable();
      this.form.get('mobilePhone')?.enable();
    }
  }


  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
  }

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    if (this.form.invalid) return;

    const mobileNumber = this.form.get('mobilePhone')?.value;
    const email = this.form.get('email')?.value; // Correctly get email from form control
    console.log(email);
    if (this.step === 2) {
      const customerInfo: CustomerInfoModel = {
        email: email,
        phone: ''
      };
      this.customerInfoService.setCustomerInfo(customerInfo);
    } else if (this.step === 4) {
      const customerInfo = this.customerInfoService.getCustomerInfo();
      const newCustomerInfo: CustomerInfoModel = {
        email: customerInfo !== null ? customerInfo.email : email,
        phone: mobileNumber
      };
      this.customerInfoService.setCustomerInfo(newCustomerInfo);
    }
    this.nextStep.emit('user-info');
  }


}
