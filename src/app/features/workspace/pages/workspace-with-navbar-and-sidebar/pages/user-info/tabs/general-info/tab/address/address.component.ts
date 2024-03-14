import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first, map } from 'rxjs';
import { DistrictModel, ProvinceModel, ReponseZipcodeModel, SubdistrictModel, ZipcodeModel } from '../../../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../../../core/services';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {

  @Input() public submitted: boolean = false;
  @Input() public form: FormGroup | undefined;

  public districts: DistrictModel[] = [];
  public subdistricts: SubdistrictModel[] = [];
  public provinces: ProvinceModel[] = [];

  public zipcode: ZipcodeModel[] = [];

  public isLoading: boolean = false;

  constructor(
    private restApiService: RestApiService
  ) {

  }

  ngOnInit(): void {
    this.loadZipcode(true);
  }

  loadZipcode(isInit: boolean) {
    if (this.form) {
      console.log("[loadZipcode] form => ", this.form.value);
      const formControl = this.form.controls;
      const zipcode = formControl['zipcode'].value
      if (zipcode) {
        this.isLoading = true;
        this.restApiService
          .get('zip-code/code/' + zipcode)
          .pipe(
            first(),
            map(res => res as ReponseZipcodeModel)
          )
          .subscribe({
            next: (res) => {
              this.zipcode = [...res.zipCodes];
              this.subdistricts = this.getSubdistrict(formControl['zipcode'].value);
              console.log("[loadZipcode] subdistricts => ", this.subdistricts);
              console.log("[loadZipcode] form => ", this.form?.value);
              if (isInit) {
                this.districts = this.getDistrict(formControl['subdistrictCode'].value);
                this.provinces = this.getProvince(formControl['districtCode'].value);
              }
              this.isLoading = false;
            },
            error: (err) => {
              console.error(err);
            }
          });
      }
    }
  }

  getSubdistrict(zipcode: string | undefined | null): SubdistrictModel[] {
    if (zipcode) {
      const subdistricts = this.zipcode.map(x => x.subdistrict);
      return subdistricts;
    } else {
      return [];
    }
  }

  getDistrict(subdistrictCode: number | undefined | null): DistrictModel[] {
    if (subdistrictCode) {
      const districts = this.subdistricts.filter(x => x.id === subdistrictCode).map(x => x.district);
    return districts;
    } else {
      return [];
    }
  }

  getProvince(districtCode: number | undefined | null): ProvinceModel[] {
    if (districtCode) {
      const provinces = this.districts.filter(x => x.id === districtCode).map(x => x.province);
      return provinces;
    } else {
      return [];
    }
  }

  onChangeZipcode(event: string) {
    if (event && event.length >= 5) {
      this.loadZipcode(false);
    } else {
      if (this.form) {
        const formControl = this.form.controls;
              formControl['subdistrictCode'].reset();
              formControl['districtCode'].reset();
              formControl['provinceCode'].reset();
        this.subdistricts = [];
        this.districts = [];
        this.provinces = [];
      }
    }
  }

  onChangeSubdistrict(event: number) {
    console.log("[onChangeSubdistrict] event => ", event)
    if (event) {
      this.districts = this.getDistrict(event);
      if (this.districts) {
        console.log("[onChangeSubdistrict] districts => ", this.districts);
        this.form?.controls['districtCode'].setValue(this.districts[0].id);
        this.provinces = this.getProvince(this.districts[0].id);
        if (this.provinces) {
          this.form?.controls['provinceCode'].setValue(this.provinces[0].id);
        }
      }
    }
  }

}
