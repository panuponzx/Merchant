import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'input-current-address',
  templateUrl: './input-current-address.component.html',
  styleUrl: './input-current-address.component.scss'
})
export class InputCurrentAddressComponent implements AfterContentInit, OnInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form!: FormGroup;
  @Input() public addressIdCardInfoForm: FormGroup | any;
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
    if(this.form?.get('isCurrentAddressSameIdcard')?.value) {
      this.patchValueAddressSameIdcard();
    }
  }

  onChangeSameAddress(event: any) {
    console.log("[onChangeSameAddress] event => ", event.target.checked);
    if(event.target.checked){
      this.patchValueAddressSameIdcard();
    }else {
      this.form.patchValue({
        addressNo: undefined,
        building: undefined,
        floor: undefined,
        villageNo: undefined,
        village: undefined,
        alley: undefined,
        soi: undefined,
        street: undefined,
        province: undefined,
        provinceName: undefined,
        district: undefined,
        districtName: undefined,
        subdistrict: undefined,
        subdistrictName: undefined,
        zipcode: undefined,
      });
      this.form.get('addressNo')?.enable();
      this.form.get('building')?.enable();
      this.form.get('floor')?.enable();
      this.form.get('villageNo')?.enable();
      this.form.get('village')?.enable();
      this.form.get('alley')?.enable();
      this.form.get('soi')?.enable();
      this.form.get('street')?.enable();
      this.form.get('province')?.enable();
      // this.form.get('district')?.enable();
      // this.form.get('subdistrict')?.enable();
      // this.form.get('zipcode')?.enable();
      
    }
  }

  patchValueAddressSameIdcard(): void {
    this.form.patchValue({
      addressNo: this.addressIdCardInfoForm.get('addressNo').value,
      building: this.addressIdCardInfoForm.get('building').value,
      floor: this.addressIdCardInfoForm.get('floor').value,
      villageNo: this.addressIdCardInfoForm.get('villageNo').value,
      village: this.addressIdCardInfoForm.get('village').value,
      alley: this.addressIdCardInfoForm.get('alley').value,
      soi: this.addressIdCardInfoForm.get('soi').value,
      street: this.addressIdCardInfoForm.get('street').value,
      province: this.addressIdCardInfoForm.get('province').value,
      provinceName: this.addressIdCardInfoForm.get('provinceName').value,
      district: this.addressIdCardInfoForm.get('district').value,
      districtName: this.addressIdCardInfoForm.get('districtName').value,
      subdistrict: this.addressIdCardInfoForm.get('subdistrict').value,
      subdistrictName: this.addressIdCardInfoForm.get('subdistrictName').value,
      zipcode: this.addressIdCardInfoForm.get('zipcode').value,
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
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.nextStep.emit('user-info');
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  
}
