import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-car-info-type9',
  templateUrl: './input-car-info-type9.component.html',
  styleUrl: './input-car-info-type9.component.scss'
})
export class InputCarInfoType9Component {

  @Input() public form: FormGroup | any;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();
  
}
