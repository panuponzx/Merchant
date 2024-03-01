import { AfterContentChecked, AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[datePickerReadonly]'
})
export class DatePickerReadonlyDirective implements AfterViewInit, AfterContentChecked {

  constructor(
    private el: ElementRef
  ) {

  }

  ngAfterViewInit(): void {
    this.el.nativeElement.setAttribute('readonly', true);
  }

  ngAfterContentChecked() {
    this.el.nativeElement.setAttribute('readonly', true);
  }

}
