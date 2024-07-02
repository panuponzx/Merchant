import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'input-term-codition',
  templateUrl: './input-term-codition.component.html',
  styleUrl: './input-term-codition.component.scss'
})
export class InputTermCoditionComponent implements AfterContentInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;
  @Input() public customerType: number = 0;

  @Input() public form!: FormGroup;
  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();

  footerHeight: number = 0;

  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
  }

  onBack() {
    this.previousStep.emit('term-codition');
  }

  onNext() {
    this.nextStep.emit('term-codition');
  }

}
