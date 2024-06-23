import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel-obu-modal',
  templateUrl: './cancel-obu-modal.component.html',
  styleUrl: './cancel-obu-modal.component.scss'
})
export class CancelObuModalComponent {

  firstForm: FormGroup

  public step: number = 2;

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal
  ) {
    this.firstForm = this.formBuilder.group({
      date: new FormControl({value: undefined, disabled: true}, Validators.required),
      fullnameWalletOwner: new FormControl({value: undefined, disabled: true}, Validators.required),
      isOwnerOperator: new FormControl(true, Validators.required),
      citizenId: new FormControl({value: undefined, disabled: true}, Validators.required),
      firstNameOperator: new FormControl({value: undefined, disabled: true}, Validators.required),
      lastNameOperator: new FormControl({value: undefined, disabled: true}, Validators.required),
      mobilePhoneOperator: new FormControl({value: undefined, disabled: true}, Validators.required),
      positionPhoneOperator: new FormControl({value: undefined, disabled: true}, Validators.required),
      isAgree: new FormControl(true, Validators.required),
    });
  }

  onChangeOperator(event: any) {
    console.log("[onChangeOperator] event => ", event.target.value);
    
  }


  onPreviousStep() {
    // console.log("[onPreviousStep] step => ", step);
    console.log("[onPreviousStep] step => ", this.step);
    this.step--;
    if (this.step === 0) {
      this.ngbActiveModal.close(false);
    }
    // if (this.step === 2 && this.userInfoForm.get('identityType')?.value === 3) {
    //   this.step = 1;
    // }
  }

  onNextStep() {
    console.log("[onNextStep] step => ", this.step);
    this.step++;
  }

  onClose() {

  }

  onNext() {

  }

}
