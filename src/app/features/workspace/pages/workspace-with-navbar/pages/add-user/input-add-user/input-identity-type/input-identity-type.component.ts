import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-identity-type',
  templateUrl: './input-identity-type.component.html',
  styleUrl: './input-identity-type.component.scss'
})
export class InputIdentityTypeComponent implements AfterContentInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;
  @Input() public customerType: number = 0;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();
  
  @Input() public form!: FormGroup;
  footerHeight: number = 0;

  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
  }

  onBack() {
    this.previousStep.emit('identity-type');
  }

  onNext(identityType: number) {
    this.form.get('identityType')?.setValue(identityType);
    this.nextStep.emit('identity-type');
  }

}
