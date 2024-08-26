import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-borrowing-modal',
  templateUrl: './borrowing-modal.component.html',
  styleUrls: ['./borrowing-modal.component.scss']
})
export class BorrowingModalComponent {
  @Input() title: string = '';
  @Input() actionType: 'borrow' | 'return' = 'borrow';
  @Output() formSubmit = new EventEmitter<any>();

  // ประกาศตัวแปร form เป็น FormGroup
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ngbActiveModal: NgbActiveModal
  ) {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.form = this.fb.group({
      name: new FormControl({ value: undefined, disabled: false }, Validators.required),
      position: new FormControl({ value: undefined, disabled: false }, Validators.required),
      date: new FormControl({ value: this.formatDate(today), disabled: true }, Validators.required),
      returnDate: new FormControl({ value: this.formatDate(tomorrow), disabled: true }, Validators.required),
    });
  }
  formatDate(date: Date): string {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  onSubmit() {
    this.ngbActiveModal.close(this.form.value);
  }
}
