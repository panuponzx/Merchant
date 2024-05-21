  import { AfterContentInit, Component, ElementRef, ErrorHandler, EventEmitter, Input, Output, ViewChild } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { tap , catchError, of, map, Observer } from 'rxjs';
  import { ResponseMessageModel } from 'src/app/core/interfaces';
  import { RestApiService } from 'src/app/core/services';

  @Component({
    selector: 'otp-request',
    templateUrl: './otp-request.component.html',
    styleUrl: './otp-request.component.scss'
  })
  export class OtpRequestComponent implements AfterContentInit {

    @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

    @Input() public form: FormGroup | any;
    @Input() public customerType: number = 0;
    // @Input() public mobileNumber!: number;

    @Output() public mobileNumber!: number;
    @Output() public refCode: string | undefined;
    @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
    @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();
    

    footerHeight: number = 0;
    
    
    constructor(private restApiService: RestApiService) {}
    

    ngAfterContentInit(): void {
      const footerElement = this.footerRef?.nativeElement as HTMLElement;
      this.footerHeight = footerElement.offsetHeight;
    }
    
    onBack() {
      this.previousStep.emit('user-info');
    }

    onNext() {
      const mobileNumber = this.form.get('mobilePhone')?.value;
      this.nextStep.emit('user-info');
    }
    

}
