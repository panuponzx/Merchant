import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../../services';
import { Observable, zip } from 'rxjs';
import { IReponseRegisterTestFaremediaModel } from '../../interfaces';
import { ModalDialogService } from '../../services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrl: './register-card.component.scss'
})
export class RegisterCardComponent {
  public row = {} as any;
  public form: FormGroup;
  public isLoading: boolean = false;
  constructor(
    private restApiService: RestApiService,
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      faremediaValue: new FormControl({ value: undefined, disabled: false }, Validators.required),
    });
  }
  onClose() {
    this.ngbActiveModal.close();
  }
  onSummit() {
    this.isLoading = true;
    this.modalDialogService.loading();
    this.registerTestFaremedia().subscribe({
      next: (_) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        this.modalDialogService.info("success", "#2255CE", "ลงทะเบียนบัตรทดสอบสำเร็จ");
        this.ngbActiveModal.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        let errorText;
        try{
          var throwableMessage = error.body.throwableMessage;
          switch (throwableMessage) {
            case 'OBU was existed in test':
              errorText = 'หมายเลขอุปกรณ์ ถูกลงทะเบียนแล้ว';
              break;
            case 'OBU was not existed':
              errorText = 'หมายเลขอุปกรณ์ ไม่มีอยู่ในระบบ';
              break;
            case 'Add test obu failed':
              errorText = 'เพิ่มข้อมูลอุปกรณ์ทดสอบล้มเหลว';
              break;
          }
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', errorText);;
        }catch(_){
          this.modalDialogService.handleError(error)
        }

        this.modalDialogService.hideLoading();
      }
    });
  }
  registerTestFaremedia() {
    const mockupData = {
      faremediaValue: this.form.value.faremediaValue,
    };
    return this.restApiService.postBackOffice('faremedia/create/test-obu', mockupData) as Observable<IReponseRegisterTestFaremediaModel>;

  }
}
