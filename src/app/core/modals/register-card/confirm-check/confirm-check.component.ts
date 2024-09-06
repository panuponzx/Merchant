import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IFaremediaOwnerInfoModel, IReponseRegisterTestFaremediaModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-confirm-check',
  templateUrl: './confirm-check.component.html',
})
export class ConfirmCheckComponent {
  @Input() faremediaInfo!: IFaremediaOwnerInfoModel | null;

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private ngbActiveModal: NgbActiveModal

  ) { }

  onClose() {
    this.ngbActiveModal.close();
  }
  registerTestFaremedia() {
    const mockupData = {
      faremediaValue: this.faremediaInfo?.faremediaValue,
    };
    return this.restApiService.postBackOffice('faremedia/create/test-obu', mockupData) as Observable<IReponseRegisterTestFaremediaModel>;
  }
  onConfirm() {
    this.modalDialogService.loading();
    this.registerTestFaremedia().subscribe({
      next: (_) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.info("success", "#2255CE", "ลงทะเบียนบัตรทดสอบสำเร็จ");
        this.ngbActiveModal.close(true);
      },
      error: (error) => {
        let errorText;
        try {
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
            case 'receive OBU was not OBU type':
              errorText = 'รหัสอุปกรณ์ไม่ใช่ OBU';
              break;
            default:
              errorText = error.body.throwableMessage;
          }
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', errorText);;
        } catch (_) {
          this.modalDialogService.handleError(error)
        }

        this.modalDialogService.hideLoading();
      }
    });
  }
}
