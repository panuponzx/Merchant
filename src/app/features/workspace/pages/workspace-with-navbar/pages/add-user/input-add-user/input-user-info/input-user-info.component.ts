import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPrefixModel } from 'src/app/core/interfaces';
import prefixData from 'src/assets/data/prefix.json';

@Component({
  selector: 'input-user-info',
  templateUrl: './input-user-info.component.html',
  styleUrl: './input-user-info.component.scss'
})
export class InputUserInfoComponent implements AfterContentInit, OnInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form: FormGroup | any;
  @Input() public customerType: number = 0;
  @Input() public identityTypeForm!: FormGroup;

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
      id: 3
    }
  ];
  public prefixList: IPrefixModel[] = prefixData;
  public today: Date = new Date();

  constructor() {
  }

  ngAfterContentInit(): void {
    const element = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = element.offsetHeight;
    console.log('Height of the element:', this.identityTypeForm.get('identityType')?.value);
  }

  ngOnInit(): void {
    this.onCheckPrefix(this.form.get('prefix').value);
  }

  addTagPrefixPromise(name: string) {
    return new Promise((resolve) => {
      console.log("[]", this.prefixList);

      resolve({
        label: name,
        value: name
      })
    });
  }

  onCheckPrefix(prefix: string | null | undefined) {
    if (!prefix) return;
    const foundPrefix = this.prefixList.find((element) => element.value === prefix);
    if (!foundPrefix) {
      this.prefixList.push({
        value: prefix,
        label: prefix
      })
    }
  }

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.submitted = true;
    // if (this.form.invalid) return;
    this.nextStep.emit('user-info');
  }

}
