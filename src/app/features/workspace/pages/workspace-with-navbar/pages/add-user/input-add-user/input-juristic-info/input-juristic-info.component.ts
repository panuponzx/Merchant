import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-juristic-info',
  templateUrl: './input-juristic-info.component.html',
  styleUrl: './input-juristic-info.component.scss'
})
export class InputJuristicInfoComponent implements AfterContentInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form: FormGroup | any;
  @Input() public customerType: number = 0;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();
  

  public branchList: any[] = [];

  footerHeight: number = 0;

  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
  }
  

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.nextStep.emit('user-info');
  }
  
}
