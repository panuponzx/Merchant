import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first, map } from 'rxjs';
import { ITransactionSuspensionElementModal } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-transaction-suspension-modal',
  templateUrl: './transaction-suspension-modal.component.html',
  styleUrl: './transaction-suspension-modal.component.scss'
})
export class TransactionSuspensionModalComponent {

  public row = {} as ITransactionSuspensionElementModal;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      remark: new FormControl({ value: undefined, disabled: false }, Validators.required),
    });
  }

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

  onBlacklist() {
    if(this.row.isBlacklist) {
      this.onIsBlacklist(this.row.customerId,'customer/active', 'การยกเลิกการระงับการใช้งานสำเร็จ')
    }else {
      this.onIsBlacklist(this.row.customerId,'customer/blacklist', 'การระงับการใช้งานสำเร็จ')
    }
  }

  onIsBlacklist(id: string, url: string, successMessage: string): void {
    this.modalDialogService.loading();
    const data = {
      id: id,
    }
    this.restApiService
      .postBackOffice(url, data)
      .pipe(
        first(),
        map(res => res as any)
      ).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          if (res.errorMessage === "Success") {
            this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', successMessage);
          } else {
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
          }
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.handleError(err);
        }
      });
  }

}
