import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first, map } from 'rxjs';
import { DistrictModel, IDistrictModel, IProvinceModel, ISubDistrictModel, IZipcodeModel, ProvinceModel, ReponseZipcodeModel, SubdistrictModel, ZipcodeModel } from '../../../../../../../../../../core/interfaces';
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

  public provinceList: IProvinceModel[] = [];
  public districtList: IDistrictModel[] = [];
  public subDistrictsList: ISubDistrictModel[] = [];
  public zipCodeList: IZipcodeModel[] = [];

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {

  }

  ngOnInit(): void {
    // this.loadZipcode(true);
    this.loadProvince();
    console.log(this.form?.get('province')?.value);

    if (this.form?.get('province')?.value) this.loadDistrict(this.form?.get('province')?.value);
    if (this.form?.get('district')?.value) this.loadSubdistrict(this.form?.get('district')?.value);
    if (this.form?.get('subdistrict')?.value) this.loadZipCode(this.form?.get('subdistrict')?.value);
  }

  loadProvince() {
    this.restApiService.getWithModel<IProvinceModel[]>(`province`).pipe(first()).subscribe({
      next: (res) => {
        console.log("[loadProvince] res => ", res.data);
        this.provinceList = res.data;
        const provinceCode = this.form?.get('province')?.value;
        if (provinceCode) {
          console.log("[loadProvince] provinceCode => ", provinceCode);
          const province: IProvinceModel[] = this.provinceList.filter(x => x.id === provinceCode);
          console.log("[loadProvince] province => ", province);
          this.form?.get('provinceName')?.setValue(province[0].name);
        }
      },
      error: (err) => {

      }
    })
  }

  loadDistrict(provinceId: number) {
    this.restApiService.getWithModel<IDistrictModel[]>(`district/province/${provinceId}`).pipe(first()).subscribe({
      next: (res) => {
        this.districtList = res.data;
        const districtCode = this.form?.get('district')?.value;
        if (districtCode) {
          const district: IDistrictModel[] = this.districtList.filter(x => x.id === districtCode);
          this.form?.get('districtName')?.setValue(district[0].name);
        }
      },
      error: (err) => {

      }
    })
  }

  loadSubdistrict(districtId: number) {
    this.restApiService.getWithModel<ISubDistrictModel[]>(`subdistrict/district/${districtId}`).pipe(first()).subscribe({
      next: (res) => {
        this.subDistrictsList = res.data;
        const subdistrictCode = this.form?.get('subdistrict')?.value;
        if (subdistrictCode) {
          const subdistrict: ISubDistrictModel[] = this.subDistrictsList.filter(x => x.id === subdistrictCode);
          this.form?.get('subdistrictName')?.setValue(subdistrict[0].name);
        }
      },
      error: (err) => {

      }
    })
  }

  loadZipCode(subdistrictId: number) {
    this.restApiService.getWithModel<IZipcodeModel[]>(`zip-code/subdistrict/${subdistrictId}`).pipe(first()).subscribe({
      next: (res) => {
        this.zipCodeList = res.data;
        // this.form?.get('zipcode')?.enable();
        this.form?.get('zipcode')?.setValue(this.zipCodeList[0].code);
        console.log("[loadZipCode] zipCodeList => ", this.zipCodeList);
      },
      error: (err) => {

      }
    })
  }

  onChangeProvince(provinceId: number) {
    console.log("[onChangeProvince] provinceId => ", provinceId);
    if (provinceId) {
      if (this.provinceList.length > 0) {
        const province: IProvinceModel[] = this.provinceList.filter(x => x.id === provinceId);
        this.form?.get('provinceName')?.setValue(province[0].name);
      }
      this.form?.get('district')?.reset();
      this.form?.get('subdistrict')?.reset();
      this.form?.get('zipcode')?.reset();
      this.districtList = [];
      this.subDistrictsList = [];
      this.zipCodeList = [];
      this.loadDistrict(provinceId);
      this.form?.get('district')?.enable();
    } else {
      this.form?.get('district')?.reset();
      this.form?.get('subdistrict')?.reset();
      this.form?.get('zipcode')?.reset();
      this.districtList = [];
      this.subDistrictsList = [];
      this.zipCodeList = [];
    }
  }

  onChangeDistrict(districtId: number) {
    if (districtId) {
      if (this.districtList.length > 0) {
        const district: IDistrictModel[] = this.districtList.filter(x => x.id === districtId);
        this.form?.get('districtName')?.setValue(district[0].name);
      }
      this.form?.get('subdistrict')?.reset();
      this.form?.get('zipcode')?.reset();
      this.subDistrictsList = [];
      this.zipCodeList = [];
      this.loadSubdistrict(districtId);
      this.form?.get('subdistrict')?.enable();
    }
  }

  onChangeSubdistrict(subdistrictId: number) {
    if (subdistrictId) {
      if (this.subDistrictsList.length > 0) {
        const subdistrict: ISubDistrictModel[] = this.subDistrictsList.filter(x => x.id === subdistrictId);
        this.form?.get('subdistrictName')?.setValue(subdistrict[0].name);
      }
      this.form?.get('zipcode')?.reset();
      this.zipCodeList = [];
      this.loadZipCode(subdistrictId);
      this.form?.get('zipcode')?.enable();
    }
  }

  // loadZipcode(isInit: boolean) {
  //   if (this.form) {
  //     console.log("[loadZipcode] form => ", this.form.value);
  //     const formControl = this.form.controls;
  //     const zipcode = formControl['zipcode'].value
  //     if (zipcode) {
  //       this.isLoading = true;
  //       this.restApiService
  //         .get('zip-code/code/' + zipcode)
  //         .pipe(
  //           first(),
  //           map(res => res as ReponseZipcodeModel)
  //         )
  //         .subscribe({
  //           next: (res) => {
  //             this.zipcode = [...res.zipCodes];
  //             this.subdistricts = this.getSubdistrict(formControl['zipcode'].value);
  //             console.log("[loadZipcode] subdistricts => ", this.subdistricts);
  //             console.log("[loadZipcode] form => ", this.form?.value);
  //             if (isInit) {
  //               this.districts = this.getDistrict(formControl['subdistrictCode'].value);
  //               this.provinces = this.getProvince(formControl['districtCode'].value);
  //               console.log("[loadZipcode] getSubdistrictName => ", this.getSubdistrictName(formControl['subdistrictCode'].value));
  //               this.form?.get('subdistrictName')?.setValue(this.getSubdistrictName(formControl['subdistrictCode'].value));
  //               this.form?.get('districtName')?.setValue(this.getDistrictName(formControl['subdistrictCode'].value));
  //               this.form?.get('provinceName')?.setValue(this.getProvinceName(formControl['districtCode'].value));
  //               console.log("[loadZipcode] subdistrictCode => ", formControl['subdistrictCode'].value);
  //               console.log("[loadZipcode] districts => ", this.districts);
  //               console.log("[loadZipcode] provinces => ", this.provinces);
  //             }
  //             console.log("[loadZipcode] form => ", this.form?.value);
  //             this.isLoading = false;
  //           },
  //           error: (err) => {
  //             console.error(err);
  //             this.modalDialogService.handleError(err);
  //             // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
  //           }
  //         });
  //     }
  //   }
  // }

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
    } else {
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
      if (this.form) {
        const formControl = this.form.controls;
        formControl['subdistrictCode'].reset();
        formControl['districtCode'].reset();
        formControl['province'].reset();
        formControl['subdistrictName'].reset();
        formControl['districtName'].reset();
        formControl['provinceName'].reset();
        this.subdistricts = [];
        this.districts = [];
        this.provinces = [];
      }
      // this.loadZipcode(false);
    } else {
      if (this.form) {
        const formControl = this.form.controls;
        formControl['subdistrictCode'].reset();
        formControl['districtCode'].reset();
        formControl['province'].reset();
        formControl['subdistrictName'].reset();
        formControl['districtName'].reset();
        formControl['provinceName'].reset();
        this.subdistricts = [];
        this.districts = [];
        this.provinces = [];
      }
    }
  }

  // onChangeSubdistrict(event: number) {
  //   console.log("[onChangeSubdistrict] event => ", event)
  //   if (event) {
  //     this.districts = this.getDistrict(event);
  //     if (this.districts) {
  //       this.form?.get('subdistrictName')?.setValue(this.getSubdistrictName(event));
  //       console.log("[onChangeSubdistrict] districts => ", this.districts);
  //       this.form?.controls['districtCode'].setValue(this.districts[0].id);
  //       this.form?.get('districtName')?.setValue(this.getDistrictName(event));
  //       this.provinces = this.getProvince(this.districts[0].id);
  //       if (this.provinces) {
  //         this.form?.controls['province'].setValue(this.provinces[0].id);
  //         this.form?.get('provinceName')?.setValue(this.getProvinceName(this.form.get('districtCode')?.value));
  //       }
  //     }
  //   }
  // }

}
