import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-user-info-type9',
  templateUrl: './input-user-info-type9.component.html',
  styleUrl: './input-user-info-type9.component.scss'
})
export class InputUserInfoType9Component {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form: FormGroup | any;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();

  footerHeight: number = 0;

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.nextStep.emit('user-info');
  }

}
