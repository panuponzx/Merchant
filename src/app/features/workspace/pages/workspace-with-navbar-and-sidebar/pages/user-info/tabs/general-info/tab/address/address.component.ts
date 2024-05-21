import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first, map } from 'rxjs';
import { DistrictModel, ProvinceModel, ReponseZipcodeModel, SubdistrictModel, ZipcodeModel } from '../../../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../../../core/services';
import { ModalDialogService } from '../../../../../../../../../../core/services/modal-dialog/modal-dialog.service';

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
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
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
                console.log("[loadZipcode] getSubdistrictName => ", this.getSubdistrictName(formControl['subdistrictCode'].value));
                this.form?.get('subdistrictName')?.setValue(this.getSubdistrictName(formControl['subdistrictCode'].value));
                this.form?.get('districtName')?.setValue(this.getDistrictName(formControl['subdistrictCode'].value));
                this.form?.get('provinceName')?.setValue(this.getProvinceName(formControl['districtCode'].value));
                console.log("[loadZipcode] subdistrictCode => ", formControl['subdistrictCode'].value);
                console.log("[loadZipcode] districts => ", this.districts);
                console.log("[loadZipcode] provinces => ", this.provinces);
              }
              console.log("[loadZipcode] form => ", this.form?.value);
              this.isLoading = false;
            },
            error: (err) => {
              console.error(err);
              this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', `${err.body.errorMessage}`);
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

  getSubdistrictName(subdistrictId: number): string | null {
    if (subdistrictId) {
      const subdistrictsName = this.subdistricts.filter(x => x.id === subdistrictId);
      console.log("[getSubdistrictName] subdistrictsName => ", subdistrictsName[0].name);
      return subdistrictsName[0].name;
    }else {
      return null;
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

  getDistrictName(subdistrictCode: number): string | null {
    if (subdistrictCode) {
      const districts = this.subdistricts.filter(x => x.id === subdistrictCode).map(x => x.district);
      return districts[0].name;
    } else {
      return null;
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

  getProvinceName(districtCode: number): string | null {
    if (districtCode) {
      const provinces = this.districts.filter(x => x.id === districtCode).map(x => x.province);
      return provinces[0].name;
    } else {
      return null;
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
        formControl['subdistrictName'].reset();
        formControl['districtName'].reset();
        formControl['provinceName'].reset();
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
        this.form?.get('subdistrictName')?.setValue(this.getSubdistrictName(event));
        console.log("[onChangeSubdistrict] districts => ", this.districts);
        this.form?.controls['districtCode'].setValue(this.districts[0].id);
        this.form?.get('districtName')?.setValue(this.getDistrictName(event));
        this.provinces = this.getProvince(this.districts[0].id);
        if (this.provinces) {
          this.form?.controls['provinceCode'].setValue(this.provinces[0].id);
          this.form?.get('provinceName')?.setValue(this.getProvinceName(this.form.get('districtCode')?.value));
        }
      }
    }
  }

}
