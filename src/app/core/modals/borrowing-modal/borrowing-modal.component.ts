import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      date: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.formSubmit.emit({
        type: this.actionType,
        data: this.form.value
      });
    }
  }
}
