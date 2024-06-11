import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ErrorHandler, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first, firstValueFrom, throwError } from 'rxjs';
import { CarInfoModel, ICarMasterData, IProvinceMasterData, ResponseMessageModel, ResponseModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import Swal from 'sweetalert2';
import { CustomerModel } from '../../../../../../core/interfaces';


@Component({
  selector: 'app-edit-car-modal',
  templateUrl: './edit-car-modal.component.html',
  styleUrl: './edit-car-modal.component.scss'
})
export class EditCarModalComponent {

  @Input() public carInfo: CarInfoModel = {} as CarInfoModel;
  @Input() public walletIdList: number[] = [];
  @Input() public brands: CarInfoModel[] = [];
  @Input() public selectedProvince: CarInfoModel[] = [];
  @Input() public models: CarInfoModel[] = [];
  @Input() public customer: CustomerModel | undefined;

  public form: FormGroup = this.formBuilder.group({
    licensePlate: new FormControl(undefined, Validators.required),
    fullnameCarOwner: new FormControl({ value: undefined, disabled: true }, Validators.required),
    brand: new FormControl(undefined, Validators.required),
    model: new FormControl(undefined, Validators.required),
    yearRegistration: new FormControl(undefined, Validators.required),
    remark: new FormControl(undefined),
    obuPan: new FormControl({ value: undefined, disabled: true }, Validators.required),
    smartcardNo: new FormControl({ value: undefined, disabled: true }, Validators.required),
    isType9: new FormControl(undefined, Validators.required),
    walletId: new FormControl(undefined, Validators.required),
    province: new FormControl(undefined, Validators.required),
    color: new FormControl(undefined, Validators.required),
  });



  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private ngbModal: NgbModal,
    private restApiService: RestApiService,
  ) {
  }



  ngOnInit() {
    this.brand();
    this.form.get('licensePlate')?.setValue(this.carInfo.licensePlate);
    this.form.get('fullnameCarOwner')?.setValue((this.customer?.title ? this.customer.title + ' ' : '') + this.customer?.firstName + ' ' + this.customer?.lastName);
    this.form.get('province')?.setValue(this.carInfo.province);
    this.form.get('brand')?.setValue(this.carInfo.brand);
    this.form.get('model')?.setValue(this.carInfo.model);
    this.form.get('yearRegistration')?.setValue(this.carInfo.yearRegistration);
    this.form.get('remark')?.setValue(this.carInfo.remark);
    this.form.get('obuPan')?.setValue(this.carInfo.obuPan);
    this.form.get('smartcardNo')?.setValue(this.carInfo.smartcardNo);
    this.form.get('isType9')?.setValue(this.carInfo.isType9);
    this.form.get('walletId')?.setValue(this.carInfo.walletId);
    this.form.get('color')?.setValue(this.carInfo.color);
    this.provinceList();
    this.brand();

  }

  // brand select dropdown
  brand() {
    this.restApiService.getBackOffice('master-data/car-model').subscribe(
      (Response: any) => {
        if (Array.isArray(Response.data)) {

          this.brands = Response.data.map((value: { brand: string; }) => { return value.brand });
        }
      });
  }

  //province select dropdown
  provinceList() {
    this.restApiService.getBackOffice('master-data/province').subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {

          this.selectedProvince = response.data.map((value: { provinceName: string; }) => { return value.provinceName });
        }
      });
  }

  onDeactivate() {
    Swal.fire({
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      inputPlaceholder: "กรุณาระบุ",
      title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการยกเลิกอุปกรณ์</h2>',
      html: '<label>กรุณายืนยัน</label><br><label class="required-field" style="text-align: left;width: 100%;">หมายเหตุ</label>',
      showCancelButton: true,
      customClass: {
        confirmButton: "custom-btn btn-type-1 red ms-2",
        cancelButton: "custom-btn btn-type-1 outline"
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      confirmButtonText: "ยกเลิกอุปกรณ์",
      cancelButtonText: "กลับ",
      reverseButtons: true,
      inputValidator: (remark) => {
        return new Promise((resolve) => {
          if (remark) {
            resolve("Mock Alert");
          } else {
            resolve("กรุณาระบุหมายเหตุ");
          }
        });
      },
      preConfirm: async (remark) => {
        try {

        } catch (error: any) {
          console.error(error);
          if (error instanceof HttpResponse) {
            Swal.showValidationMessage(`
              Request failed: ${error.body?.errorCode}, ${error.body?.errorMessage}
            `);
          }
          else {
            Swal.showValidationMessage(`Some thing failed`);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngbActiveModal.close(true);
      }
    });
  }

  onSuspend() {
    Swal.fire({
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      inputPlaceholder: "กรุณาระบุ",
      title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการอายัดอุปกรณ์</h2>',
      html: '<label>กรุณายืนยัน</label><br><label class="required-field" style="text-align: left;width: 100%;">หมายเหตุ</label>',
      showCancelButton: true,
      customClass: {
        confirmButton: "custom-btn btn-type-1 red ms-2",
        cancelButton: "custom-btn btn-type-1 outline"
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      confirmButtonText: "อายัดชั่วคราว",
      cancelButtonText: "กลับ",
      reverseButtons: true,
      inputValidator: (remark) => {
        return new Promise((resolve) => {
          if (remark) {
            resolve();
          } else {
            resolve("กรุณาระบุหมายเหตุ");
          }
        });
      },
      preConfirm: async (remark) => {
        try {
          const payload = {
            obu: {
              obuPan: this.carInfo.obuPan,
              smartcardNo: this.carInfo.smartcardNo,
            },
            wallet: {
              id: this.carInfo.walletId.toString(),
            },
          };
          await firstValueFrom(this.restApiService.postBackOffice('faremedia/suspend-obu-by-staff', payload).pipe(first()))
          // return response.json();
        } catch (error: any) {
          console.error(error);
          if (error instanceof HttpResponse) {
            Swal.showValidationMessage(`
            Request failed: ${error.body?.errorCode}, ${error.body?.errorMessage}
          `);
          }
          else {
            Swal.showValidationMessage(`Some thing failed`);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngbActiveModal.close(true);
      }
    });


  }

  onActive() {
    Swal.fire({
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      inputPlaceholder: "กรุณาระบุ",
      title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการอายัดอุปกรณ์</h2>',
      html: '<label>กรุณายืนยัน</label><br><label class="required-field" style="text-align: left;width: 100%;">หมายเหตุ</label>',
      showCancelButton: true,
      customClass: {
        confirmButton: "custom-btn btn-type-1 blue ms-2",
        cancelButton: "custom-btn btn-type-1 outline"
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      confirmButtonText: "ยกเลิกการอายัด",
      cancelButtonText: "กลับ",
      reverseButtons: true,
      inputValidator: (remark) => {
        return new Promise((resolve) => {
          if (remark) {
            resolve();
          } else {
            resolve("กรุณาระบุหมายเหตุ");
          }
        });
      },
      preConfirm: async (remark) => {
        try {
          const payload = {
            obu: {
              obuPan: this.carInfo.obuPan,
              smartcardNo: this.carInfo.smartcardNo,
            },
            wallet: {
              id: this.carInfo.walletId.toString(),
            },
          };
          await firstValueFrom(this.restApiService.postBackOffice('faremedia/active-obu-by-staff', payload).pipe(first()))
          // return response.json();
        } catch (error: any) {
          console.error(error);
          if (error instanceof HttpResponse) {
            Swal.showValidationMessage(`
            Request failed: ${error.body?.errorCode}, ${error.body?.errorMessage}
          `);
          }
          else {
            Swal.showValidationMessage(`Some thing failed`);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngbActiveModal.close(true);
      }
    });
  }

  onEnter() {
    Swal.fire({
      title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการแก้ไข</h2>',
      html: '<label>กรุณายืนยัน</label>',
      showCancelButton: true,
      customClass: {
        confirmButton: "custom-btn btn-type-1 blue ms-2",
        cancelButton: "custom-btn btn-type-1 outline"
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "กลับ",
      reverseButtons: true,
      preConfirm: async () => {
        try {
          const payload = {
            obu: {
              obuPan: this.carInfo.obuPan,
              smartcardNo: this.carInfo.smartcardNo,
              walletId: this.form.get('walletId')?.value, //this.carInfo.walletId,
              isType9: this.form.get('isType9')?.value, //this.carInfo.isType9
            },
            car: {
              brand: this.form.get('brand')?.value, //this.carInfo.brand,
              model: this.form.get('model')?.value, //this.carInfo.model,
              licensePlate: this.form.get('licensePlate')?.value, //this.carInfo.licensePlate,
              yearRegistration: this.form.get('yearRegistration')?.value, //this.carInfo.yearRegistration,
              color: this.form.get('color')?.value, //this.carInfo.color,
              remark: this.form.get('remark')?.value, //this.carInfo.remark,
              province: this.form.get('province')?.value, //this.carInfo.province
            },
          };
          console.log('load', payload);

          const res = await firstValueFrom(this.restApiService.postBackOffice('faremedia/edit-info-obu', payload).pipe(first()))
          console.log('reponse', res);
          // return response.json();
        } catch (error: any) {
          console.error(error);
          if (error instanceof HttpResponse) {
            Swal.showValidationMessage(`
            Request failed: ${error.body?.errorCode}, ${error.body?.errorMessage}
          `);
          }
          else {
            Swal.showValidationMessage(`Some thing failed`);
          }
        }

      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngbActiveModal.close(true);
      }
    });


  }

  onClose() {
    this.ngbActiveModal.close(false);
  }



}
