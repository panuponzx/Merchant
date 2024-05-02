import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first, firstValueFrom } from 'rxjs';
import { CarInfoModel, ResponseMessageModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-car-modal',
  templateUrl: './edit-car-modal.component.html',
  styleUrl: './edit-car-modal.component.scss'
})
export class EditCarModalComponent {

  @Input() public carInfo: CarInfoModel= {} as CarInfoModel;
  @Input() public walletIdList: number[] = [];

  public form: FormGroup =this.formBuilder.group({
    licensePlate: new FormControl(undefined, Validators.required),
    fullnameCarOwner: new FormControl(undefined, Validators.required),
    brand: new FormControl(undefined, Validators.required),
    model: new FormControl(undefined, Validators.required),
    yearRegistration: new FormControl(undefined, Validators.required),
    remark: new FormControl(undefined, Validators.required),
    obuPan: new FormControl({value: undefined, disabled: true}, Validators.required),
    smartcardNo: new FormControl({value: undefined, disabled: true}, Validators.required),
    isType9: new FormControl(undefined, Validators.required),
    walletId: new FormControl(undefined, Validators.required),
  });


  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private ngbModal: NgbModal,
    private restApiService: RestApiService,
    ) { 
  }

  ngOnInit() {
    this.form.get('licensePlate')?.setValue(this.carInfo.licensePlate);
    this.form.get('fullnameCarOwner')?.setValue('นายทดสอบ ทดสอบ');
    this.form.get('brand')?.setValue(this.carInfo.brand);
    this.form.get('model')?.setValue(this.carInfo.model);
    this.form.get('yearRegistration')?.setValue(this.carInfo.yearRegistration);
    this.form.get('remark')?.setValue(this.carInfo.remark);
    this.form.get('obuPan')?.setValue(this.carInfo.obuPan);
    this.form.get('smartcardNo')?.setValue(this.carInfo.smartcardNo);
    this.form.get('isType9')?.setValue(this.carInfo.isType9);
    this.form.get('walletId')?.setValue(this.carInfo.walletId);     
  }

  onSuspend() {
    Swal.fire({
      title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการอายัดอุปกรณ์</h2>',
      html: '<label>กรุณายืนยัน</label>',
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
      preConfirm: async () => {
        try {
          const payload = {
            obu: {
              obuPan: this.carInfo.obuPan,
              smartcardNo: this.carInfo.smartcardNo,
            },
            wallet: {
              id: this.carInfo.walletId.toString(),
            },
            requestParam: {
              reqId: "23498-sss-k339c-322s2",
              channelId: "1"
            }
          };
          await firstValueFrom(this.restApiService.postBackOffice('faremedia/suspend-obu-by-staff', payload).pipe(first()))
          // return response.json();
        } catch (error: any) {
          console.error(error);
          if (error instanceof HttpResponse) {
            Swal.showValidationMessage(`
            Request failed: ${error.body.errorCode}, ${error.body.errorMessage}
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
      title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการอายัดอุปกรณ์</h2>',
      html: '<label>กรุณายืนยัน</label>',
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
      preConfirm: async () => {
        try {
          const payload = {
            obu: {
              obuPan: this.carInfo.obuPan,
              smartcardNo: this.carInfo.smartcardNo,
            },
            wallet: {
              id: this.carInfo.walletId.toString(),
            },
            requestParam: {
              reqId: "23498-sss-k339c-322s2",
              channelId: "1"
            }
          };
          await firstValueFrom(this.restApiService.postBackOffice('faremedia/active-obu-by-staff', payload).pipe(first()))
          // return response.json();
        } catch (error: any) {
          console.error(error);
          if (error instanceof HttpResponse) {
            Swal.showValidationMessage(`
            Request failed: ${error.body.errorCode}, ${error.body.errorMessage}
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
