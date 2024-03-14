import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { UtilitiesService } from '../services';
import { CustomRegEx } from '../services/regex-service';

@Directive({
  selector: '[idCard]'
})
export class IdCardDirective {

  @HostListener('keypress', ['$event'])
  onKeypress(event: KeyboardEvent) {
    const key = event.key;
    if (!(key >= '0' && key <= '9') || !this.isValidMaxLength(this.el.nativeElement.value)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const trimmedValue = input.value.replace(/\s+/g, ''); // ลบเว้นวรรคทั้งหมด
    const formattedValue = this.utilitiesService.formatIdCard(trimmedValue);
    input.value = formattedValue;
  }

  @HostListener('focus', ['$event']) onFocus(event: FocusEvent) {
    this.renderer.setAttribute(this.el.nativeElement, 'inputmode', 'numeric');
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text/plain')  || '';
    if (!this.isValidInput(pastedData) || this.isValidMaxLength(pastedData)) {
      event.preventDefault();
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private utilitiesService: UtilitiesService
  ) {

  }

  private isValidMaxLength(value: string): boolean {
    const maxLength = 17;
    const isMaxLength = maxLength > value.length;
    return isMaxLength;
  }

  private isValidInput(value: string): boolean {
    const regex = CustomRegEx.RegExDigit;
    return regex.test(value);
  }

}
