import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RestApiService } from '../../../../../../../../core/services';
import { Subject, debounceTime, distinctUntilChanged, first, map, of, switchMap } from 'rxjs';
import { ReponseCustomerModel } from '../../../../../../../../core/interfaces';

@Component({
  selector: 'input-idcard-address',
  templateUrl: './input-idcard-address.component.html',
  styleUrl: './input-idcard-address.component.scss'
})
export class InputIdcardAddressComponent implements AfterContentInit, OnInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form: FormGroup | any;
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
      if(searchText.length === 5) {
        return this.restApiService.get(`zip-code/code/${searchText}`);
      }else {
        return of([]);
      }
    })).subscribe(async (res: any) => {
      console.log("[subscribe] res => ", res);
      this.form.get('subDistrict')?.setValue(undefined);
      this.form.get('district')?.setValue(undefined);
      this.form.get('province')?.setValue(undefined);
      this.postalCodeList = await res.zipCodes;
      console.log("[subscribe] res => ", this.postalCodeList);
      if(this.postalCodeList && this.postalCodeList.length === 0) return;
      if(res && Object.keys(res).length === 0) return;
      if(!this.form.get('subDistrict').value && !this.form.get('district').value && !this.form.get('province').value) {
        this.districtList = [this.postalCodeList[0].subdistrict.district];
        this.provinceList = [this.postalCodeList[0].subdistrict.district.province];
        this.form.get('subDistrict').setValue(this.postalCodeList[0]);
        this.form.get('district').setValue(this.postalCodeList[0].subdistrict.district);
        this.form.get('province').setValue(this.postalCodeList[0].subdistrict.district.province);
      }
    });
  }

  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
  }

  ngOnInit(): void {
    if(this.form?.value.postalCode &&this.form?.value.postalCode.length === 5) {
      this.postalCodeChanged.next(this.form?.value.postalCode);
    }
  }

  onKeyUpPostalCode(event: any) {
    this.postalCodeChanged.next(event.target.value);
  }

  onChangeSubDistrict(even: any) {
    console.log("[onChangeSubDistrict] even => ", even);
    this.districtList = [even.subdistrict.district];
    this.form.get('district')?.patchValue(undefined);
    this.form.get('province')?.patchValue(undefined);
    this.provinceList = [];
    console.log("[onChangeSubDistrict] districtList => ", this.districtList);
  }

  onChangeDistrict(even: any) {
    console.log("[onChangeDistrict] even => ", even);
    this.provinceList = [even.province];
    this.form.get('province')?.setValue(undefined);
  }

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.nextStep.emit('user-info');
  }

}
