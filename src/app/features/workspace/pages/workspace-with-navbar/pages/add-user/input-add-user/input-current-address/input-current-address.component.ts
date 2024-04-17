import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, distinctUntilChanged, of, switchMap } from 'rxjs';
import { RestApiService } from '../../../../../../../../core/services';

@Component({
  selector: 'input-current-address',
  templateUrl: './input-current-address.component.html',
  styleUrl: './input-current-address.component.scss'
})
export class InputCurrentAddressComponent implements AfterContentInit, OnInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form: FormGroup | any;
  @Input() public addressIdCardInfoForm: FormGroup | any;
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
      }else {
        this.form.get('subDistrict')?.enable();
      };
    });
  }
  
  ngAfterContentInit(): void {
    const element = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = element.offsetHeight;
  }

  ngOnInit(): void {
    if(this.form?.value.postalCode &&this.form?.value.postalCode.length === 5) {
      this.postalCodeChanged.next(this.form?.value.postalCode);
    }
    if(this.form.get('isCurrentAddressSameIdcard').value) {
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
        postalCode: undefined,
        subDistrict: undefined,
        district: undefined,
        province: undefined,
      });
      this.form.get('addressNo').enable();
      this.form.get('building').enable();
      this.form.get('floor').enable();
      this.form.get('villageNo').enable();
      this.form.get('village').enable();
      this.form.get('alley').enable();
      this.form.get('soi').enable();
      this.form.get('street').enable();
      this.form.get('postalCode').enable();
      // this.form.get('subDistrict').enable();
      // this.form.get('district').enable();
      // this.form.get('province').enable();
    }
  }

  onKeyUpPostalCode(event: any) {
    this.postalCodeChanged.next(event.target.value);
  }

  onChangeSubDistrict(even: any) {
    console.log("[onChangeSubDistrict] even => ", even);
    this.districtList = [even.subdistrict.district];
    this.provinceList = [even.subdistrict.district.province];
    this.form.get('district')?.setValue(this.districtList[0]);
    this.form.get('province')?.setValue(this.provinceList[0]);
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
      postalCode: this.addressIdCardInfoForm.get('postalCode').value,
      subDistrict: this.addressIdCardInfoForm.get('subDistrict').value,
      district: this.addressIdCardInfoForm.get('district').value,
      province: this.addressIdCardInfoForm.get('province').value,
    });
    this.form.get('addressNo').disable();
    this.form.get('building').disable();
    this.form.get('floor').disable();
    this.form.get('villageNo').disable();
    this.form.get('village').disable();
    this.form.get('alley').disable();
    this.form.get('soi').disable();
    this.form.get('street').disable();
    this.form.get('postalCode').disable();
    this.form.get('subDistrict').disable();
    // this.form.get('district').disable();
    // this.form.get('province').disable();
  }

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.nextStep.emit('user-info');
  }

  
}
