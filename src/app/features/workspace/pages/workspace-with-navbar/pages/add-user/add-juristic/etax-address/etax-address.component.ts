import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'etax-address',
  templateUrl: './etax-address.component.html',
  styleUrl: './etax-address.component.scss'
})
export class EtaxAddressComponent implements OnInit {

  @Input() form!: FormGroup;
  @Input() companyAddressForm!: FormGroup;
  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<void>();
  @Output() backStep = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) { }

  ngOnInit(): void {
    if(this.form.get('isCurrentAddressSameIdcard')?.value) {
      this.patchValueAddressSameIdcard();
    }
  }

  onSubmit() {
    // this.postSaveJuristicInfo();
  }

  onBack() {
    this.backStep.emit();
  }

  onChangeSameAddress(event: any) {
    console.log("[onChangeSameAddress] event => ", event.target.checked);
    if (event.target.checked) {
      this.patchValueAddressSameIdcard();
    } else {
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
      addressNo: this.companyAddressForm.get('addressNo')?.value,
      building: this.companyAddressForm.get('building')?.value,
      floor: this.companyAddressForm.get('floor')?.value,
      villageNo: this.companyAddressForm.get('villageNo')?.value,
      village: this.companyAddressForm.get('village')?.value,
      alley: this.companyAddressForm.get('alley')?.value,
      soi: this.companyAddressForm.get('soi')?.value,
      street: this.companyAddressForm.get('street')?.value,
      province: this.companyAddressForm.get('province')?.value,
      provinceName: this.companyAddressForm.get('provinceName')?.value,
      district: this.companyAddressForm.get('district')?.value,
      districtName: this.companyAddressForm.get('districtName')?.value,
      subdistrict: this.companyAddressForm.get('subdistrict')?.value,
      subdistrictName: this.companyAddressForm.get('subdistrictName')?.value,
      zipcode: this.companyAddressForm.get('zipcode')?.value,
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

}
