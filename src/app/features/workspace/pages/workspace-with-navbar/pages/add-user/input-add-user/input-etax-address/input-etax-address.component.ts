import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, distinctUntilChanged, switchMap, of } from 'rxjs';
import { RestApiService } from 'src/app/core/services';

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
  public postalCodeChanged = new Subject<string>();
  public postalCodeList: any = [];
  public subDistrictList: any = [];
  public districtList: any = [];
  public provinceList: any = [];

  constructor(private restApiService: RestApiService) {
    this.postalCodeChanged.pipe(distinctUntilChanged(), switchMap((searchText: any) => {
      if (searchText.length === 5) {
        return this.restApiService.get(`zip-code/code/${searchText}`);
      } else {
        return of([]);
      }
    })).subscribe(async (res: any) => {
      console.log("[subscribe] res => ", res);
      this.postalCodeList = await res.zipCodes;
      console.log("[subscribe] res => ", this.postalCodeList);
      if (this.postalCodeList && this.postalCodeList.length === 0 || res && Object.keys(res).length === 0) {
        this.form.get('subDistrict')?.disable();
        this.form.get('subDistrict')?.setValue(undefined);
        this.form.get('district')?.setValue(undefined);
        this.form.get('province')?.setValue(undefined);
      } else {
        this.form.get('subDistrict')?.enable();
      };
    });
  }

  ngAfterContentInit(): void {
    const element = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = element.offsetHeight;
  }

  ngOnInit(): void {
    if (this.form?.value.postalCode && this.form?.value.postalCode.length === 5) {
      this.postalCodeChanged.next(this.form?.value.postalCode);
    }
    if(this.form.get('isSameWorkAddress')?.value) {
      this.patchValueAddressSameIdcard(this.addressIdCardInfoForm);
    }
  }

  onKeyUpPostalCode(event: any) {
    this.postalCodeChanged.next(event.target.value);
  }

  onChangeSubDistrict(even: any) {
    this.districtList = [even.subdistrict.district];
    this.provinceList = [even.subdistrict.district.province];
    this.form.get('district')?.setValue(this.districtList[0]);
    this.form.get('province')?.setValue(this.provinceList[0]);
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
        this.form.get('postalCode')?.enable();
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
      this.form.get('postalCode')?.enable();
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
      postalCode: sameForm.get('postalCode')?.value,
      subDistrict: sameForm.get('subDistrict')?.value,
      district: sameForm.get('district')?.value,
      province: sameForm.get('province')?.value,
    });
    this.form.get('addressNo')?.disable();
    this.form.get('building')?.disable();
    this.form.get('floor')?.disable();
    this.form.get('villageNo')?.disable();
    this.form.get('village')?.disable();
    this.form.get('alley')?.disable();
    this.form.get('soi')?.disable();
    this.form.get('street')?.disable();
    this.form.get('postalCode')?.disable();
    this.form.get('subDistrict')?.disable();
    // this.form.get('district').disable();
    // this.form.get('province').disable();
  }

  onBack() {
    this.previousStep.emit('etax-address');
  }

  onNext() {
    this.nextStep.emit('etax-address');
  }

}
