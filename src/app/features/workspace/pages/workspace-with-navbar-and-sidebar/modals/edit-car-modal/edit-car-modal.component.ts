import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ErrorHandler, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first, firstValueFrom, map, Observable, throwError } from 'rxjs';
import { CarInfoModel, IAPendingRequestDetailCancelObuResponse, ICarMasterData, ICarModal, IProvinceMasterData, IProvinceModal, IResponseCarModal, IResponseProvinceModal, ResponseMessageModel, ResponseModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import Swal from 'sweetalert2';
import { CustomerModel } from '../../../../../../core/interfaces';
import { CancelObuModalComponent } from '../cancel-obu-modal/cancel-obu-modal.component';
import { SuspendModalComponent } from '../suspend-modal/suspend-modal.component';
import { ChangeObuModalComponent } from '../change-obu-modal/change-obu-modal.component';

@Component({
  selector: 'app-edit-car-modal',
  templateUrl: './edit-car-modal.component.html',
  styleUrl: './edit-car-modal.component.scss'
})
export class EditCarModalComponent {

  @Input() public customer: CustomerModel | undefined;
  @Input() public carInfo: CarInfoModel | any = {} as CarInfoModel;
  @Input() public walletIdList: number[] = [];
  @Input() public walletId: any = undefined;
  @Input() public canEditType: boolean = true;
  @Input() public walletName: string = '';
  @Input() public isType9: boolean = false;
  public brandList: ICarModal[] = [];
  public isRequestCancelObu: boolean = false;
  provinceList: IProvinceModal[] = [];

  public form: FormGroup = this.formBuilder.group({
    licensePlate: new FormControl(undefined, Validators.required),
    fullnameCarOwner: new FormControl({ value: undefined, disabled: true }, Validators.required),
    brand: new FormControl(undefined, Validators.required),
    model: new FormControl(undefined, Validators.required),
    yearRegistration: new FormControl(undefined, Validators.required),
    remark: new FormControl({ value: undefined, disabled: true }),
    obuPan: new FormControl({ value: undefined, disabled: true }, Validators.required),
    smartcardNo: new FormControl({ value: undefined, disabled: true }, Validators.required),
    isType9: new FormControl(undefined, Validators.required),
    walletId: new FormControl(undefined, Validators.required),
    province: new FormControl(undefined, Validators.required),
    color: new FormControl(undefined, Validators.required),
    walletName: new FormControl({ value: undefined, disabled: true }),
  });



  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private restApiService: RestApiService,
    private ngbModal: NgbModal
  ) {
  }

  ngOnInit() {
    console.log('carInfo', this.carInfo);
    this.loadBrand();
    this.loadProvince();
    this.form.get('licensePlate')?.setValue(this.carInfo.plateNo);
    this.form.get('fullnameCarOwner')?.setValue((this.customer?.title ? this.customer.title + ' ' : '') + this.customer?.firstName + ' ' + this.customer?.lastName);
    this.form.get('province')?.setValue(this.carInfo.plateProvince);
    this.form.get('brand')?.setValue(this.carInfo.carModel);
    this.form.get('model')?.setValue(this.carInfo.carSubmodel);
    this.form.get('yearRegistration')?.setValue(this.carInfo.carYear);
    // this.form.get('remark')?.setValue(this.carInfo.remark);
    this.form.get('obuPan')?.setValue(this.carInfo.faremediaValue);
    this.form.get('smartcardNo')?.setValue(this.carInfo.walletSmartcardNo);
    this.form.get('isType9')?.setValue(this.carInfo.isType9);
    this.form.get('walletId')?.setValue(this.walletId);
    this.form.get('color')?.setValue(this.carInfo.carColor);
    this.form.get("walletName")?.setValue(this.walletName);
    if (!this.canEditType) {
      this.form.get('isType9')?.disable();
    }
    if (this.isType9) {
      this.form.get('walletId')?.disable();
    }
    console.log('form', this.form.getRawValue());

    this._loadRequestReturnObu().subscribe({
      next: (res) => {
        console.log('res', res);
        if (res.data.status === 0) {
          this.isRequestCancelObu = true;
        }else{
          this.isRequestCancelObu = false;
        }
        console.log('isRequestCancelObu', this.isRequestCancelObu);
      },
      error: (err) => {
        console.error("[_loadRequestReturnObu] err => ", err);
        this.isRequestCancelObu = false;
      }
    });
  }

  // brand select dropdown
  loadBrand() {
    this.restApiService.getBackOffice('master-data/car-model').pipe(first(), map(res => res as IResponseCarModal)).subscribe({
      next: (res) => {
        this.brandList = res.data;
      },
      error: (err) => {
        console.error("[loadBrand] err => ", err);
      }
    })
  }

  //province select dropdown
  loadProvince() {
    this.restApiService.getBackOffice('master-data/province').pipe(first(), map(res => res as IResponseProvinceModal)).subscribe({
      next: (res) => {
        this.provinceList = res.data;
      },
      error: (err) => {
        console.error("[loadProvince] err => ", err);
      }
    });
  }

  onDeactivate() {
    const modalRef = this.ngbModal.open(CancelObuModalComponent, {
      windowClass: 'cancel-car-modal',
      centered: true,
      // backdrop: 'static',
      size: 'md',
      scrollable: true,
      keyboard: false,
    });
    modalRef.componentInstance.carInfo = this.carInfo;
    modalRef.componentInstance.customer = this.customer;
    modalRef.componentInstance.isType9 = this.isType9;
    // modalRef.componentInstance.walletIdList = this.walletList.map((x) => x.walletId);
    modalRef.componentInstance.walletId = this.walletId;
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[showTableModal] result => ', result);
          // this.loadWalletInfo();
          window.location.reload();
        }
      },
      (reason) => {
        console.log('[showTableModal] reason => ', reason);
      }
    );

    // Swal.fire({
    //   input: "text",
    //   inputAttributes: {
    //     autocapitalize: "off"
    //   },
    //   inputPlaceholder: "กรุณาระบุ",
    //   title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการยกเลิกอุปกรณ์</h2>',
    //   html: '<label>กรุณายืนยัน</label><br><label class="required-field" style="text-align: left;width: 100%;">หมายเหตุ</label>',
    //   showCancelButton: true,
    //   customClass: {
    //     confirmButton: "custom-btn btn-type-1 red ms-2",
    //     cancelButton: "custom-btn btn-type-1 outline"
    //   },
    //   buttonsStyling: false,
    //   showLoaderOnConfirm: true,
    //   confirmButtonText: "ยกเลิกอุปกรณ์",
    //   cancelButtonText: "กลับ",
    //   reverseButtons: true,
    //   inputValidator: (remark) => {
    //     return new Promise((resolve) => {
    //       if (remark) {
    //         resolve("Mock Alert");
    //       } else {
    //         resolve("กรุณาระบุหมายเหตุ");
    //       }
    //     });
    //   },
    //   preConfirm: async (remark) => {
    //     try {

    //     } catch (error: any) {
    //       console.error(error);
    //       if (error instanceof HttpResponse) {
    //         Swal.showValidationMessage(`
    //           Request failed: ${error.body?.errorCode}, ${error.body?.errorMessage}
    //         `);
    //       }
    //       else {
    //         Swal.showValidationMessage(`Some thing failed`);
    //       }
    //     }
    //   },
    //   allowOutsideClick: () => !Swal.isLoading()
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.ngbActiveModal.close(true);
    //   }
    // });
  }
  onChangeOBU() {
    const modelRef = this.ngbModal.open(ChangeObuModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modelRef.componentInstance.FaremediaValue = this.form.get('obuPan')?.value;
    modelRef.componentInstance.CardNo = this.form.get('smartcardNo')?.value;
    modelRef.result.then(
      (result) => {
        if (result) {
          console.log('[onChangeOBU] result => ', result);
          window.location.reload();
        }
      },
      (reason) => {
        console.log('[onChangeOBU] reason => ', reason);
      }
    );
  }
  onSuspend() {
    const modalRef = this.ngbModal.open(SuspendModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      keyboard: false,
    });
    modalRef.componentInstance.carInfo = this.carInfo;
    modalRef.componentInstance.customer = this.customer;
    modalRef.componentInstance.obuNumber = this.carInfo.faremediaValue;
    modalRef.componentInstance.smartCardId = this.carInfo.walletSmartcardNo;
    modalRef.componentInstance.walletId = this.walletId;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.ngbActiveModal.close(true);
        }
      },
      (reason) => {
        console.log('[showTableModal] reason => ', reason);
      }
    );
  }
  // onSuspend() {
  //   Swal.fire({
  //     input: "text",
  //     inputAttributes: {
  //       autocapitalize: "off"
  //     },
  //     inputPlaceholder: "กรุณาระบุ",
  //     title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการอายัดอุปกรณ์</h2>',
  //     html: '<label>กรุณายืนยัน</label><br><label class="required-field" style="text-align: left;width: 100%;">หมายเหตุ</label>',
  //     showCancelButton: true,
  //     customClass: {
  //       confirmButton: "custom-btn btn-type-1 red ms-2",
  //       cancelButton: "custom-btn btn-type-1 outline"
  //     },
  //     buttonsStyling: false,
  //     showLoaderOnConfirm: true,
  //     confirmButtonText: "อายัดชั่วคราว",
  //     cancelButtonText: "กลับ",
  //     reverseButtons: true,
  //     inputValidator: (remark) => {
  //       return new Promise((resolve) => {
  //         if (remark) {
  //           resolve("");
  //         } else {
  //           resolve("กรุณาระบุหมายเหตุ");
  //         }
  //       });
  //     },
  //     preConfirm: async (remark) => {
  //       try {
  //         const payload = {
  //           obu: {
  //             obuPan: this.form.get('obuPan')?.value,
  //             smartcardNo: this.form.get('smartcardNo')?.value,
  //             obuStatusRemark: remark
  //           },
  //           wallet: {
  //             id: this.form.get('walletId')?.value,
  //           },
  //         };
  //         await firstValueFrom(this.restApiService.postBackOffice('faremedia/suspend-obu-by-staff', payload).pipe(first()))
  //         // return response.json();
  //       } catch (error: any) {
  //         console.error(error);
  //         if (error instanceof HttpResponse) {
  //           Swal.showValidationMessage(`
  //           Request failed: ${error.body?.errorCode}, ${error.body?.errorMessage}
  //         `);
  //         }
  //         else {
  //           Swal.showValidationMessage(`Some thing failed`);
  //         }
  //       }
  //     },
  //     allowOutsideClick: () => !Swal.isLoading()
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.ngbActiveModal.close(true);
  //     }
  //   });


  // }
  onActive() {
    const modalRef = this.ngbModal.open(SuspendModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      keyboard: false,
    });
    modalRef.componentInstance.carInfo = this.carInfo;
    modalRef.componentInstance.customer = this.customer;
    modalRef.componentInstance.obuNumber = this.carInfo.faremediaValue;
    modalRef.componentInstance.smartCardId = this.carInfo.walletSmartcardNo;
    modalRef.componentInstance.walletId = this.walletId;
    modalRef.componentInstance.isSuspend = false;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.ngbActiveModal.close(true);
        }
      },
      (reason) => {
        console.log('[showTableModal] reason => ', reason);
      }
    );
  }
  // onActive() {
  //   Swal.fire({
  //     input: "text",
  //     inputAttributes: {
  //       autocapitalize: "off"
  //     },
  //     inputPlaceholder: "กรุณาระบุ",
  //     title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการอายัดอุปกรณ์</h2>',
  //     html: '<label>กรุณายืนยัน</label><br><label class="required-field" style="text-align: left;width: 100%;">หมายเหตุ</label>',
  //     showCancelButton: true,
  //     customClass: {
  //       confirmButton: "custom-btn btn-type-1 blue ms-2",
  //       cancelButton: "custom-btn btn-type-1 outline"
  //     },
  //     buttonsStyling: false,
  //     showLoaderOnConfirm: true,
  //     confirmButtonText: "ยกเลิกการอายัด",
  //     cancelButtonText: "กลับ",
  //     reverseButtons: true,
  //     inputValidator: (remark) => {
  //       return new Promise((resolve) => {
  //         if (remark) {
  //           resolve("");
  //         } else {
  //           resolve("กรุณาระบุหมายเหตุ");
  //         }
  //       });
  //     },
  //     preConfirm: async (remark) => {
  //       try {
  //         const payload = {
  //           obu: {
  //             obuPan: this.form.get('obuPan')?.value,
  //             smartcardNo: this.form.get('smartcardNo')?.value,
  //           },
  //           wallet: {
  //             id: this.form.get('walletId')?.value,
  //           },
  //         };
  //         await firstValueFrom(this.restApiService.postBackOffice('faremedia/active-obu-by-staff', payload).pipe(first()))
  //         // return response.json();
  //       } catch (error: any) {
  //         console.error(error);
  //         if (error instanceof HttpResponse) {
  //           Swal.showValidationMessage(`
  //           Request failed: ${error.body?.errorCode}, ${error.body?.errorMessage}
  //         `);
  //         }
  //         else {
  //           Swal.showValidationMessage(`Some thing failed`);
  //         }
  //       }
  //     },
  //     allowOutsideClick: () => !Swal.isLoading()
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.ngbActiveModal.close(true);
  //     }
  //   });
  // }

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
              obuPan: this.form.get('obuPan')?.value,
              smartcardNo: this.form.get('smartcardNo')?.value,
              walletId: this.form.get('walletId')?.value, //this.carInfo.walletId,
              isType9: this.form.get('isType9')?.value, //this.carInfo.isType9
            },
            car: {
              brand: this.form.get('brand')?.value, //this.carInfo.brand,
              model: this.form.get('model')?.value, //this.carInfo.model,
              licensePlate: this.form.get('licensePlate')?.value, //this.carInfo.licensePlate,
              yearRegistration: this.form.get('yearRegistration')?.value, //this.carInfo.yearRegistration,
              color: this.form.get('color')?.value, //this.carInfo.color,
              // remark: this.form.get('remark')?.value, //this.carInfo.remark,
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


  _loadRequestReturnObu() {
    return this.restApiService.getBackOffice("pending-request/ewallet/get-by-obu-pan/" + this.form.get('obuPan')?.value) as Observable<IAPendingRequestDetailCancelObuResponse>;
  }
}
