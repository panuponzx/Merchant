import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-etax-address',
  templateUrl: './input-etax-address.component.html',
  styleUrl: './input-etax-address.component.scss'
})
export class InputEtaxAddressComponent implements AfterContentInit, OnInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form!: FormGroup;
  @Input() public addressIdCardInfoForm!: FormGroup;
  @Input() public addressCurrentInfoForm!: FormGroup;
  @Input() public addressWorkInfoForm!: FormGroup;
  @Input() public identityType: number = 0;
  @Input() public customerType: number = 0;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();

  public footerHeight: number = 0;

  ngAfterContentInit(): void {
    const element = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = element.offsetHeight;
  }

  ngOnInit(): void {
    if(this.form.get('isSameWorkAddress')?.value) {
      this.patchValueAddressSameIdcard(this.addressIdCardInfoForm);
    }
  }

  onChangeSameAddress(event: any) {
    console.log(event.target.value);
    console.log("[onChangeSameAddress] event => ", this.form.get('isEtaxAddressSame')?.value);
    switch (this.form.get('isEtaxAddressSame')?.value) {
      case "1":
        this.patchValueAddressSameIdcard(this.addressIdCardInfoForm);
        break;
      case "2":
        this.patchValueAddressSameIdcard(this.addressCurrentInfoForm);
        break;
      case "3":
        this.patchValueAddressSameIdcard(this.addressWorkInfoForm);
        break;
      case "4":
        this.form.reset();
        this.form.get('isEtaxAddressSame')?.setValue("4");
        this.form.get('addressNo')?.enable();
        this.form.get('building')?.enable();
        this.form.get('floor')?.enable();
        this.form.get('villageNo')?.enable();
        this.form.get('village')?.enable();
        this.form.get('alley')?.enable();
        this.form.get('soi')?.enable();
        this.form.get('street')?.enable();
        this.form.get('province')?.enable();
        break;
      default:
        break;
    }
  }

  onChangeSameWorkAddress(event: any): void {
    console.log("[onChangeSameWorkAddress] event => ", event.target.checked);
    if (event.target.checked) {
      this.patchValueAddressSameIdcard(this.addressIdCardInfoForm);
    } else {
      this.form.reset();
      this.form.get('addressNo')?.enable();
      this.form.get('building')?.enable();
      this.form.get('floor')?.enable();
      this.form.get('villageNo')?.enable();
      this.form.get('village')?.enable();
      this.form.get('alley')?.enable();
      this.form.get('soi')?.enable();
      this.form.get('street')?.enable();
      this.form.get('province')?.enable();
    }
  }

  patchValueAddressSameIdcard(sameForm: FormGroup): void {
    this.form.patchValue({
      addressNo: sameForm.get('addressNo')?.value,
      building: sameForm.get('building')?.value,
      floor: sameForm.get('floor')?.value,
      villageNo: sameForm.get('villageNo')?.value,
      village: sameForm.get('village')?.value,
      alley: sameForm.get('alley')?.value,
      soi: sameForm.get('soi')?.value,
      street: sameForm.get('street')?.value,
      province: sameForm.get('province')?.value,
      provinceName: sameForm.get('provinceName')?.value,
      district: sameForm.get('district')?.value,
      districtName: sameForm.get('districtName')?.value,
      subdistrict: sameForm.get('subdistrict')?.value,
      subdistrictName: sameForm.get('subdistrictName')?.value,
      zipcode: sameForm.get('zipcode')?.value,
    });
    this.form.get('addressNo')?.disable();
    this.form.get('building')?.disable();
    this.form.get('floor')?.disable();
    this.form.get('villageNo')?.disable();
    this.form.get('village')?.disable();
    this.form.get('alley')?.disable();
    this.form.get('soi')?.disable();
    this.form.get('street')?.disable();
    this.form.get('province')?.disable();
    this.form.get('district')?.disable();
    this.form.get('subdistrict')?.disable();
    this.form.get('zipcode')?.disable();
  }

  onBack() {
    this.previousStep.emit('etax-address');
  }

  onNext() {
    this.nextStep.emit('etax-address');
  }

}
