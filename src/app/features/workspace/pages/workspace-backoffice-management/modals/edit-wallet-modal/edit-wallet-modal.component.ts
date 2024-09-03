import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-edit-wallet-modal',
  templateUrl: './edit-wallet-modal.component.html',
  styleUrl: './edit-wallet-modal.component.scss'
})
export class EditWalletModalComponent {
  @Input() walletName: string | null = null;
  @Input() walletId: string | null = null;
  @Input() walletTypeId: string | null = null;
  form: FormGroup;
  constructor(
    private ngbActiveModal: NgbActiveModal,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) {
    this.form = new FormGroup({
      walletName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
    });
  }
  ngOnInit() {
    if (this.walletName) {
      this.form.get('walletName')?.setValue(this.walletName);
    }
  }
  onSubmit() {
    if (this.form.valid) {
      this.modalDialogService.confirm('ยืนยันการแก้ไขชื่อกระเป๋าเงิน', 'คุณต้องการแก้ไขชื่อกระเป๋าเงินใช่หรือไม่?').then((res) => {
        if (res) {
          this.modalDialogService.loading();
          this._editWallet().subscribe({
            next: (res) => {
              this.modalDialogService.hideLoading();
              this.modalDialogService.info('success', '#2255CE', 'แก้ไขชื่อกระเป๋าเงินสำเร็จ');
              this.ngbActiveModal.close(true);
            },
            error: (err) => {
              this.modalDialogService.hideLoading();
              this.modalDialogService.handleError(err);
            }
          });
        }
      }
      )
    }
    else {
      this.form.markAllAsTouched();
    }
  }
  _editWallet() {
    const payload = {
      walletId: this.walletId,
      walletName: this.form.get('walletName')?.value,
      walletTypeId: this.walletTypeId
    }
    return this.restApiService.postBackOffice('wallet/edit-wallet', payload) as Observable<any>;
  }
  onBack() {
    this.ngbActiveModal.close();
  }

}
