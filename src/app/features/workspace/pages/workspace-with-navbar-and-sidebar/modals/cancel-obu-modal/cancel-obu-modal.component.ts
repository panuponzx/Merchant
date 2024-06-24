import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel-obu-modal',
  templateUrl: './cancel-obu-modal.component.html',
  styleUrl: './cancel-obu-modal.component.scss'
})
export class CancelObuModalComponent {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  // sixthForm: FormGroup;

  public step: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal
  ) {
    this.firstForm = this.formBuilder.group({
      date: new FormControl({ value: undefined, disabled: true }, Validators.required),
      fullnameWalletOwner: new FormControl({ value: undefined, disabled: true }, Validators.required),
      isOwnerOperator: new FormControl(true, Validators.required),
      citizenId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      firstNameOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      lastNameOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      mobilePhoneOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      positionPhoneOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      isAgree: new FormControl(true, Validators.required),
    });

    this.secondForm = this.formBuilder.group({
      obuPayment: new FormControl(0),
      smartCardPayment: new FormControl(0),
      isObu: new FormControl(false),
      isSmartCard: new FormControl(false),
      obu: new FormControl({ value: undefined, disabled: true }, Validators.required),
      smartCard: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });

    this.thirdForm = this.formBuilder.group({
      walletBalance: new FormControl(300),
      cutMoneyWallet: new FormControl(0),
      walletBalanceAfterCut: new FormControl(0),
      totalAmountPaid: new FormControl(0),
    });

    this.fourthForm = this.formBuilder.group({
      isCash: new FormControl(false),
    });

    this.fifthForm = this.formBuilder.group({

    });
  }

  onChangeOperator(event: any) {
    console.log("[onChangeOperator] event => ", event.target.value);

  }


  onCheckIsObu(event: any) {
    console.log("[onCheckIsObu] event => ", event.target.checked);
    if (event.target.checked) {
      this.secondForm.get('obu')?.enable();
      this.secondForm.get('obuPayment')?.setValue(300);
    } else {
      this.secondForm.get('obu')?.disable();
      this.secondForm.get('obuPayment')?.setValue(0);
    }
  }

  onCheckIsSmartCard(event: any) {
    if (event.target.checked) {
      this.secondForm.get('smartCard')?.enable();
      this.secondForm.get('smartCardPayment')?.setValue(30);
    } else {
      this.secondForm.get('smartCard')?.disable();
      this.secondForm.get('smartCardPayment')?.setValue(0);
    }
  }

  amountPaymentFromWallet(): number {
    const walletBalance = this.thirdForm.get('walletBalance')?.value;
    const totalAmount = this.secondForm.get('obuPayment')?.value + this.secondForm.get('smartCardPayment')?.value;
    if (walletBalance >= totalAmount) {
      this.thirdForm.get('walletBalanceAfterCut')?.setValue(walletBalance);
      if (walletBalance > 0 && totalAmount > 0) {
        this.thirdForm.get('cutMoneyWallet')?.setValue(-totalAmount);
        const totalBalance = walletBalance - totalAmount;
        this.thirdForm.get('walletBalanceAfterCut')?.setValue(totalBalance);
      }
      this.thirdForm.get('totalAmountPaid')?.setValue(0);
    } else {
      this.thirdForm.get('cutMoneyWallet')?.setValue(-walletBalance);
      this.thirdForm.get('walletBalanceAfterCut')?.setValue(0);
      console.log(walletBalance - totalAmount);
      const totalAmountPaid: number = walletBalance - totalAmount;
      this.thirdForm.get('totalAmountPaid')?.setValue(Math.abs(totalAmountPaid));
    }
    return this.thirdForm.get('cutMoneyWallet')?.value
  }

  onPreviousStep() {
    // console.log("[onPreviousStep] step => ", step);
    console.log("[onPreviousStep] step => ", this.step);
    this.step--;
    if (this.step === 0) {
      this.ngbActiveModal.close(false);
    } else if (this.step === 4 && this.thirdForm.get('totalAmountPaid')?.value === 0) {
      this.step = 3;
    }
    console.log("[onPreviousStep] step => ", this.step);
    // if (this.step === 2 && this.userInfoForm.get('identityType')?.value === 3) {
    //   this.step = 1;
    // }
  }

  onNextStep() {
    console.log("[onNextStep] step => ", this.step);
    this.step++;
    if (this.step === 4) {
      if (this.thirdForm.get('totalAmountPaid')?.value === 0) {
        this.step = 5;
      }
    }
    console.log("[onNextStep] step => ", this.step);
  }

  onClose() {

  }

  onNext() {

  }

}
