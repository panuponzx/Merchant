import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarInfoModel, CustomerModel } from 'src/app/core/interfaces';

@Component({
  selector: 'app-suspend-modal',
  templateUrl: './suspend-modal.component.html',
  styleUrl: './suspend-modal.component.scss'
})
export class SuspendModalComponent {
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  // sixthForm: FormGroup;
  @Input() public customer: CustomerModel | undefined;
  @Input() public carInfo: CarInfoModel | any = {} as CarInfoModel;
  public step: number = 1;
  currentDate: any;
  currentNumber: number;

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private ngbModal: NgbModal
  ) {
    this.currentNumber = this.generateCurrentNumber();
    this.currentDate = new Date().toISOString().split('T')[0];
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

  request: any = {};

  // onSuspend() {
  //   const modalRef = this.ngbModal.open(SuspendModalComponent, {
  //     centered: true,
  //     backdrop: 'static',
  //     size: 'lg-plus',
  //     keyboard: true
  //   });
  //   modalRef.componentInstance.carInfo = this.carInfo;
  //   modalRef.componentInstance.customer = this.customer;
  // }

  generateCurrentNumber(): number {
    return Math.floor(Math.random() * 1000); 
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
  onSubmit() {
   
    console.log('Form submitted', this.request);
    
  }

}
