import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'occupation-detail',
  templateUrl: './occupation-detail.component.html',
  styleUrl: './occupation-detail.component.scss'
})
export class OccupationDetailComponent implements AfterContentInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form: FormGroup | any;
  @Input() public customerType: number = 0;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();

  public footerHeight: number = 0;

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

