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
      this.data.content.remark = this.form.get('remark')?.value;
      console.log("[onReject] data => ", this.data);
      this.modalDialogService.loading();
      this.restApiService.postBackOffice('pending-request/reject', this.data).subscribe({
        next: (res: any) => {
          console.log("[onReject] res => ", res);
          if (res.errorMessage === "Success") {
            console.log("[onReject] res => ", res);
            this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การปฏิเสธสำเร็จ').then((res: boolean) => {
              if(res) this.ngbActiveModal.close(true);
            })
          } else {
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
          }
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      })
    }
  }

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

}
