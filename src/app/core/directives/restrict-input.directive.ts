import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[restrictInput]'
})
export class RestrictInputDirective {

  @Input('restrictInput') invalidChars: string[] = [];

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (this.invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    let modifiedValue = input.value;
    
    this.invalidChars.forEach(char => {
      modifiedValue = modifiedValue.split(char).join('');
    });

    if (modifiedValue !== input.value) {
      input.value = modifiedValue;
      event.preventDefault();
    }
  }

}