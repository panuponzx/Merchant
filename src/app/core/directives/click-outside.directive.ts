import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[ClickOutside]'
})
export class ClickOutsideDirective {

    @Output() clickOutside = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) { }
    private firstClick = true;
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: HTMLElement): void {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside && !this.firstClick) {
            this.clickOutside.emit();
        }else{
            this.firstClick = false;
        }
    }
}
