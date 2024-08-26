import { Component, Input, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransformDatePipe } from '../../pipes';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrl: './register-card.component.scss'
})
export class RegisterCardComponent {
  public row = {} as any;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private transformDatePipe: TransformDatePipe,
    private ngbModal: NgbModal
  ) {
    this.form = this.formBuilder.group({
      faremediaValue: new FormControl({ value: undefined, disabled: false }, Validators.required),
    });
  }
  onClose() {
    this.ngbActiveModal.close(null);
  }
  onSummit(){
    this.ngbActiveModal.close(this.form.value.faremediaValue);
  }
}
