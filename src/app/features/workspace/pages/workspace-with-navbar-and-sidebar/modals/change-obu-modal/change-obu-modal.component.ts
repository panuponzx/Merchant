import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IReplaceObuResponse } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-change-obu-modal',
  templateUrl: './change-obu-modal.component.html',
  styleUrl: './change-obu-modal.component.scss'
})
export class ChangeObuModalComponent {
  @Input() public FaremediaValue: string = '';
  @Input() public CardNo: string = '';
  form: FormGroup;
  constructor(
    private ngbActiveModal: NgbActiveModal,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) {
    this.form = new FormGroup({
      newFaremediaValue: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      newCardNo: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
    });
  }

  onBack() {
    this.ngbActiveModal.close();
  }
  onSubmit() {
    if (this.form.valid) {
      this.modalDialogService.confirm('ยืนยันการเปลี่ยนหมายเลขอุปกรณ์', 'คุณต้องการเปลี่ยนหมายเลขอุปกรณ์ใช่หรือไม่?').then((res) => {
        if (res) {
          this.modalDialogService.loading();
          this._changeObu().subscribe({
            next: (res) => {
              this.modalDialogService.hideLoading();
              this.modalDialogService.info('success', '#2255CE', 'เปลี่ยนหมายเลขอุปกรณ์สำเร็จ');
              this.ngbActiveModal.close(true);
            },
            error: (err) => {
              this.modalDialogService.hideLoading();
              this.modalDialogService.handleError(err);
            }
          });
        }
      });

    } else {
      this.form.markAllAsTouched();
    }
  }
  _changeObu() {
    const payload = {
      oldObu: {
        obuPan: this.FaremediaValue,
        smartcardNo: this.CardNo
      },
      newObu: {
        obuPan: this.form.get('newFaremediaValue')?.value,
        smartcardNo: this.form.get('newCardNo')?.value
      }
    };
    return this.restApiService.postBackOffice("faremedia/replace-obu", payload) as Observable<IReplaceObuResponse>;
  }
}
