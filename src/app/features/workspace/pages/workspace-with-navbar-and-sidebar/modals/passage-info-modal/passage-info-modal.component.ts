import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPassageInfoRowModel, IPassageModel } from '../../../../../../core/interfaces';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-passage-info-modal',
  templateUrl: './passage-info-modal.component.html',
  styleUrl: './passage-info-modal.component.scss'
})
export class PassageInfoModalComponent implements OnInit {

  public row = {} as IPassageModel;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private transformDatePipe: TransformDatePipe,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      transactionId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      transactionDate: new FormControl({ value: undefined, disabled: true }, Validators.required),
      entryHqName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      entryPlazaName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      walletName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      obu: new FormControl({ value: undefined, disabled: true }, Validators.required),
      smartCard: new FormControl({ value: undefined, disabled: true }, Validators.required),
      amount: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.row) {
      this.form.get('transactionId')?.setValue(this.row.transactionId);
      this.form.get('transactionDate')?.setValue(this.transformDatePipe.transform(this.row.transactionDate, 'DD/MM/BBBB HH:mm:ss', 'th'));
      this.form.get('entryHqName')?.setValue(this.row.entryHq);
      this.form.get('entryPlazaName')?.setValue(this.row.entryPlaza);
      this.form.get('walletName')?.setValue(this.row.walletName);
      this.form.get('obu')?.setValue(this.row.obuPan);
      this.form.get('smartCard')?.setValue(this.row.smartcardNo);
      this.form.get('amount')?.setValue(this.row.amount);
    }
  }

  onCancelPassage() {
    const data = {
      transactionId: this.form.get('transactionId')?.value,
      amount: this.form.get('amount')?.value,
    }
    this.modalDialogService.loading();
    this.restApiService
      .postBackOffice('transaction-balance/void-toll', data)
      .pipe(
        first(),
        map(res => res as any)
      )
      .subscribe({
        next: (res) => {
          console.log(res)
          this.modalDialogService.hideLoading();
          if (res.errorMessage === "Success") {
            this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การยกเลิกค่าผ่านทางสำเร็จ').then((res: boolean) => {
              if (res) this.ngbActiveModal.close(true);
            })
          } else {
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
          }
        },
        error: (err) => {
          console.error(err);
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body.errorMessage);
          this.modalDialogService.hideLoading();
        }
      })
  }

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

}
