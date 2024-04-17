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
  

  public branchList: any[] = [
    {
      label: 'สาขาใหญ่',
      id: 1
    },
    {
      label: 'สาขาย่อย',
      id: 2
    },
  ];

  footerHeight: number = 0;

  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
  }

  onChangeBranch(event: any) {
    console.log("[onChangeBranch] event => ", event);
    if(event.id === 1) {
      this.form.get('branchName').setValue('สาขาใหญ่');
      this.form.get('branchNo').setValue('00000');
      this.form.get('branchName').disable();
      this.form.get('branchNo').disable();
    }else if(event.id === 2) {
      this.form.get('branchName').setValue('');
      this.form.get('branchNo').setValue('');
      this.form.get('branchName').enable();
      this.form.get('branchNo').enable();
    }
  }
  

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.nextStep.emit('user-info');
  }
  
}
