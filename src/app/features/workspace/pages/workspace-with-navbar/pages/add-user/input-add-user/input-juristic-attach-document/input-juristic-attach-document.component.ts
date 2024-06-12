import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-juristic-attach-document',
  templateUrl: './input-juristic-attach-document.component.html',
  styleUrl: './input-juristic-attach-document.component.scss'
})
export class InputJuristicAttachDocumentComponent implements AfterContentInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;
  @ViewChild('inputFile', { static: false }) private inputFileEl: | ElementRef | any;
  @Input() public form: FormGroup | any;
  @Input() public customerType: number = 0;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();

  footerHeight: number = 0;

  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
  }

  fileTypeValidation(event: any) {
    let files = event.target.files[0];
    this.form.get('attachDocument').setValue(files);
    console.log("[fileTypeValidation] files => ", files);
    console.log("[fileTypeValidation] attachDocument => ", this.form.get('attachDocument').value);
    this.inputFileEl.nativeElement.value = null;
  }

  onUpload() {

  }

  onBack() {
    this.previousStep.emit('user-info');
  }

  onNext() {
    this.nextStep.emit('user-info');
  }

  onOpenPDF() {
    const blob = new Blob([this.form.get('attachDocument').value], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    // // Option 1: Display in an iframe
    // const iframe = document.createElement('iframe');
    // iframe.src = url;
    // document.body.appendChild(iframe);
    // // Option 2: Open in a new tab/window
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  }

  onDeletePDF() {
    this.form.get('attachDocument').setValue(null);
  }

}
