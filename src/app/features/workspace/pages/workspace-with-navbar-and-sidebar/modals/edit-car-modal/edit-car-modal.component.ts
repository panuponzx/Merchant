import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-car-modal',
  templateUrl: './edit-car-modal.component.html',
  styleUrl: './edit-car-modal.component.scss'
})
export class EditCarModalComponent {

  public form: FormGroup | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal
    ) {
    this.form = this.formBuilder.group({
      licensePlate: new FormControl(undefined, Validators.required),
      fullnameCarOwner: new FormControl(undefined, Validators.required),
      brand: new FormControl(undefined, Validators.required),
      model: new FormControl(undefined, Validators.required),
      yearRegistration: new FormControl(undefined, Validators.required),
      remark: new FormControl(undefined, Validators.required),
      obuPan: new FormControl({value: undefined, disabled: true}, Validators.required),
      smartcardNo: new FormControl({value: undefined, disabled: true}, Validators.required),
      isType9: new FormControl(undefined, Validators.required),
      walletId: new FormControl(undefined, Validators.required),
    });

    this.form.get('licensePlate')?.setValue('กก 1234');
    this.form.get('fullnameCarOwner')?.setValue('นายทดสอบ ทดสอบ');
    // this.form.get('brand')?.setValue('กก 1234');
    // this.form.get('model')?.setValue('กก 1234');
    // this.form.get('yearRegistration')?.setValue('กก 1234');
    this.form.get('remark')?.setValue('หมายเหตุ_หมายเหตุ');
    this.form.get('obuPan')?.setValue('12345678901');
    this.form.get('smartcardNo')?.setValue('12345678901');
    this.form.get('isType9')?.setValue(true);
    // this.form.get('walletId')?.setValue('กก 1234');    
  }

  onClose() {
    this.ngbActiveModal.close(true);
  }

}
