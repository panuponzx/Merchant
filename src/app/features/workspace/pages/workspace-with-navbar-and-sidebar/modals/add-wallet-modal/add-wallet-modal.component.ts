import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-add-wallet-modal',
  templateUrl: './add-wallet-modal.component.html',
  styleUrl: './add-wallet-modal.component.scss'
})
export class AddWalletModalComponent {

  public step: number = 1;
  public form: FormGroup;
  public walletType: number | undefined;
  public walletTypeList = [
    {
      lable: 'Prepaid (Top-up)',
      id: 1
    },
    {
      lable: 'non-toll (shop)',
      id: 7
    },
    {
      lable: 'Postpaid (Billing)',
      id: 2
    },
    // {
    //   lable: 'Direct credit card',
    //   id: 3
    // }
  ];
  @Input() customerId: string | null = null;
  @Input() customerTypeId: string | null = null;
  isLoading: boolean = false;
  @Input() customWalletType: any;
  @Input() fixedWalletType: any;
  constructor(
    public ngbActiveModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal
  ) {
    this.form = this.formBuilder.group({
      walletType: new FormControl(1, Validators.required),
      walletName: new FormControl('', Validators.required),
    });
  }
  ngOnInit() {
    if (this.customWalletType) {
      console.log("[AddWalletModalComponent] customWalletType => ", this.customWalletType);
      this.walletTypeList = this.customWalletType;
    }
    if (this.fixedWalletType) {
      console.log("[AddWalletModalComponent] fixedWalletType => ", this.fixedWalletType);
      this.form = this.formBuilder.group({
        walletType: new FormControl({ value: this.fixedWalletType, disabled: true }, Validators.required),
        walletName: new FormControl("", Validators.required),
      });
    }
  }

  setWalletNameRequiredForm() {
    if (this.form.get('walletType')?.value && this.form.get('walletType')?.value === 2) {
      this.form?.get('walletName')?.clearValidators();
      this.form?.get('walletName')?.setValue(undefined);
      this.form?.get('walletName')?.updateValueAndValidity();
    } else {
      this.form?.get('walletName')?.setValidators([Validators.required]);
      this.form?.get('walletName')?.setValue(undefined);
      this.form?.get('walletName')?.updateValueAndValidity();
    }
  }

  onAddWallet() {
    this.isLoading = true;
    this.modalDialogService.loading();
    const data = {
      customer: {
        id: this.customerId,
        customerTypeId: this.customerTypeId,
      },
      wallet: {
        walletTypeId: this.form.get('walletType')?.value,
        walletName: this.form.get('walletName')?.value,
      }
    };
    console.log("[onAddWallet] data => ", data);
    this.restApiService
      .postBackOffice('wallet/add-wallet', data)
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
          this.isLoading = false;
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          this.isLoading = false;
          console.error(err);
          this.modalDialogService.handleError(err);
          // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage ? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      })
  }

  onNext() {
    this.step++;
  }

  onBack() {
    this.step--;
  }

  onConnectVisa() {

  }

  onChangeWalletType(event: any) {
    console.log("[onChangeWalletType] event => ", event);
    this.setWalletNameRequiredForm();
  }

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

}
