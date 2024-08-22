import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPassageModel, UserModel } from '../../../../../../core/interfaces';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { AuthenticationService, RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';
@Component({
  selector: 'app-confirm-cancel-passage-info',
  templateUrl: './confirm-cancel-passage-info.component.html',
  styleUrl: './confirm-cancel-passage-info.component.scss'
})
export class ConfirmCancelPassageInfoComponent {
  public row = {} as IPassageModel;
  public form: FormGroup;
  public user: UserModel | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private authenticationService: AuthenticationService) {
    this.form = this.formBuilder.group({
      username: new FormControl({ value: undefined, disabled: true }, Validators.required),
      transactionId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      amount: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });
    this.authenticationService.user?.subscribe(x => this.user = x);
  }
  ngOnInit(): void {
    if (this.row) {
      this.form.get('transactionId')?.setValue(this.row.transactionId);
      this.form.get('amount')?.setValue(this.row.amount);
    }
    if (this.user) {
      this.form.get('username')?.setValue(this.user.username);
    }
  }
  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

  onCancelPassage() {
    this.ngbActiveModal.close(true)
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
          this.modalDialogService.handleError(err);
          this.modalDialogService.hideLoading();
        }
      })
  }

}
