import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-add-wallet-modal',
  templateUrl: './add-wallet-modal.component.html',
  styleUrl: './add-wallet-modal.component.scss'
})
export class AddWalletModalComponent {

  public form: FormGroup;
  public walletType: number | undefined;
  public walletTypeList = [
    {
      lable: 'Prepaid (Top-up)',
      id: 1
    },
    // { 
    //   lable: 'Postpaid (Billing)',
    //   id: 2
    // },
    // { 
    //   lable: 'Direct credit card',
    //   id: 3
    // }
  ];
  customerId: string | null = null;
  customerTypeId: string | null = null;

  constructor(
    public ngbActiveModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      walletType: new FormControl(1, Validators.required),
    });
  }

  onAddWallet() {
    const data = {
      customer: {
        id: this.customerId,
        customerTypeId: this.customerTypeId,
        requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: 1,
        },
      },
      wallet: {
        walletTypeId: this.form.get('walletType')?.value,
        walletName: 'ทดสอบ FE'
      }
    };
    console.log("[onAddWallet] data => ", data);
    this.restApiService
      .post('add-wallet', data)
      .pipe(
        first(),
        map(res => res as any)
      ).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          if (res.errorMessage === "Success") {
            console.log("[onSubmit] res => ", res);
            this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การเพิ่มกระเป๋าสำเร็จ');
            // this.router.navigate(['work-space/menu-option']);
            this.ngbActiveModal.close(true);
          } else {
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
          }

        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err);
        }
      })
  }

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

}
