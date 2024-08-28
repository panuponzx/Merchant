import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../../../../../../../../core/services';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-reject-pending-request-modal',
  templateUrl: './reject-pending-request-modal.component.html',
  styleUrl: './reject-pending-request-modal.component.scss'
})
export class RejectPendingRequestModalComponent {

  public data: any;
  public form: FormGroup;

  constructor(
    public ngbActiveModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      remark: new FormControl(undefined, Validators.required),
    });
  }

  onReject() {
    if (this.form.valid) {
      const paylaod = {
        reason: this.form.get('remark')?.value,
        remark: this.form.get('remark')?.value,
      }
      this.modalDialogService.loading();
      this.restApiService.postBackOfficeWithModel<any, any>(`pending-request/${this.data}/reject`, paylaod).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          if (res.errorMessage === "Success") {
            this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การปฏิเสธสำเร็จ').then((res: boolean) => {
              if(res) this.ngbActiveModal.close(true);
            })
          }else {
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
          }
        },
        error: (error) => {
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(error);
        },
      })

    }
  }

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

}
