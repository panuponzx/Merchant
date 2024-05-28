import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public taxRequired: any = [{
    label: 'มีหมายเลขผู้เสียภาษี',
    value: true
  }, {
    label: 'ไม่มีหมายเลขผู้เสียภาษี',
    value: false
  }];
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

  constructor(private formBuilder: FormBuilder) { }

  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
    this.form.addControl('taxRequiredStatus', this.formBuilder.control(true));
  }

  onChangeBranch(event: any) {
    console.log("[onChangeBranch] event => ", event);
    if (event.id === 1) {
      this.form.get('branchName').setValue('สาขาใหญ่');
      this.form.get('branchNo').setValue('00000');
      this.form.get('branchName').disable();
      this.form.get('branchNo').disable();
    } else if (event.id === 2) {
      this.form.get('branchName').setValue('');
      this.form.get('branchNo').setValue('');
      this.form.get('branchName').enable();
      this.form.get('branchNo').enable();
    }
  }

  onChangeTaxRequired(event: any) {
    console.log("[onChangeTaxRequired] event => ", event);
    if(event.value === true) {
      this.form.get('taxId').setValidators([Validators.required]);
      this.form.get('taxId').enable();
      this.form.get('taxId').updateValueAndValidity();
    } else {
      this.form.get('taxId').clearValidators();
      this.form.get('taxId').setValue('');
      this.form.get('taxId').disable();
      this.form.get('taxId').updateValueAndValidity();
    }
  }

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.nextStep.emit('user-info');
  }

}
