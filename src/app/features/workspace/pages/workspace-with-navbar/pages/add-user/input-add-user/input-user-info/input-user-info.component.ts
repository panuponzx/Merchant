import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-user-info',
  templateUrl: './input-user-info.component.html',
  styleUrl: './input-user-info.component.scss'
})
export class InputUserInfoComponent implements AfterContentInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form: FormGroup | any;
  @Input() public customerType: number = 0;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();

  public submitted: boolean = false;
  footerHeight: number = 0;
  identityTypeList: any[] = [
    {
      label: 'บัตรประชาชน',
      id: 1
    },
    {
      label: 'หนังสือเดินทาง',
      id: 2
    }
  ];
  public minDate: Date = new Date();

  constructor() {
  }

  ngAfterContentInit(): void {
    const element = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = element.offsetHeight;
    console.log('Height of the element:', this.footerHeight);
  }

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.nextStep.emit('user-info');
  }

}
