import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerInfoModel } from 'src/app/core/interfaces/curomerInfo.interface';
import { CustomerInfoService } from 'src/app/core/services/cutomer-info-service/customer-info.service';

@Component({
  selector: 'app-input-result-otp',
  templateUrl: './input-result-otp.component.html',
  styleUrl: './input-result-otp.component.scss'
})
export class InputResultOtpComponent {

  contactForm: FormGroup;

  @Input() public customerType: number = 0;
  @Input() public mobileNumber: number | null = null;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();

  public footerHeight: number = 0;
  public email: string = '';
  public phone: string = '';
 
  constructor(
    private formBuilder: FormBuilder,
    private customerInfoService: CustomerInfoService
  ) 
  {
    this.contactForm = this.formBuilder.group({
      contactMethod: ['email'], 
    });
  }
  ngOnInit(): void {
    const customerInfo = this.customerInfoService.getCustomerInfo();
    if (customerInfo!=null){
      this.email = customerInfo.email;
      this.phone = customerInfo.phone;
    }else{
    // mock data model
      const mockCustomerInfo : CustomerInfoModel ={
        email: "mockCustomerInfo@email.com",
        phone: "0123456789"
      }
      this.customerInfoService.setCustomerInfo(mockCustomerInfo);
    }
    console.log(this.email, this.phone);
  }
}
