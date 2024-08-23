import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPassageInfoRowModel, IPassageModel } from '../../../../../../core/interfaces';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmCancelPassageInfoComponent } from '../confirm-cancel-passage-info/confirm-cancel-passage-info.component';
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
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal
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

  
  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

  onAction() {
    const modalRef = this.ngbModal.open(ConfirmCancelPassageInfoComponent, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.componentInstance.row = this.row;
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[onAction] result => ', result);
          this.ngbActiveModal.close(true);
        }
      },
      (reason) => {
        console.log('[onAction] reason => ', reason);
      }
    );
  }

}
