import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPassageInfoRowModel } from '../../../../../../core/interfaces';
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

  private row = {} as IPassageInfoRowModel;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private transformDatePipe: TransformDatePipe,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      transactionDate: new FormControl({value: undefined, disabled: true}, Validators.required),
      entryHqName: new FormControl({value: undefined, disabled: true}, Validators.required),
      entryPlazaName: new FormControl({value: undefined, disabled: true}, Validators.required),
      walletName: new FormControl({value: undefined, disabled: true}, Validators.required),
      obu: new FormControl({value: undefined, disabled: true}, Validators.required),
      smartCard: new FormControl({value: undefined, disabled: true}, Validators.required),
      amount: new FormControl({value: undefined, disabled: true}, Validators.required),
    });
  }

  ngOnInit(): void {
    if(this.row){
      this.form.get('transactionDate')?.setValue(this.transformDatePipe.transform(this.row.transactionDate, 'DD/MM/BBBB HH:mm:ss', 'th'));
      this.form.get('entryHqName')?.setValue(this.row.entryHqName);
      this.form.get('entryPlazaName')?.setValue(this.row.entryPlazaName);
      this.form.get('walletName')?.setValue(this.row.walletName);
      this.form.get('obu')?.setValue(this.row.obu);
      this.form.get('smartCard')?.setValue(this.row.smartCard);
      this.form.get('amount')?.setValue(this.row.amount);
    }
  }

  onCancelPassage() {
    const data = {
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: 1
      },
      transactionId: "TP240312100000026",
      amount: this.form.get('amount')?.value,
    }
    this.modalDialogService.loading();
    this.restApiService
      .post('transaction-balance/void-toll', data)
      .pipe(
        first(),
        map(res => res as any)
      )
      .subscribe({
        next: (res) => {
          console.log(res)
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          console.error(err);
          this.modalDialogService.hideLoading();
        }
      })
  }

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

}
