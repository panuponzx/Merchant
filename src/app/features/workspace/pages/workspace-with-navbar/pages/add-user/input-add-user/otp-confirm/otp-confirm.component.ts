import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { map , Observer} from 'rxjs';
import { ResponseMessageModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';

@Component({
  selector: 'otp-confirm',
  templateUrl: './otp-confirm.component.html',
  styleUrl: './otp-confirm.component.scss'
})
export class OtpConfirmComponent implements AfterContentInit {

  @ViewChild('footer', { static: true }) footerRef: ElementRef | undefined;

  @Input() public form: FormGroup | any;
  @Input() public customerType: number = 0;
  @Input() public mobileNumber: number | null = null;  

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('digit_1', { static: false }) private digit_1El: ElementRef | undefined;
  @ViewChild('submit', { static: false }) private submitEl: ElementRef | undefined;

  public submitted: boolean = false;
  private currentDigit: number | null | undefined;
  display: any;
  public isLoading: boolean = false;
  refCode : string | undefined;

  footerHeight: number = 0
  
  constructor(private restApiService:RestApiService) {}

  ngOnInit(): void {
    if (this.form) {
      const mobileNumber = this.mobileNumber

      const endpoint = 'notification/sms-otp';
      const body = {
        mobileNumber: mobileNumber,
        requestParam: {
          channelId: 2,
          reqId: '111908f1-04e9-499c'
        }
      };

      this.restApiService.postBackOffice(endpoint, body)
        .pipe(
          map((response: any) => {
            if (response.data && response.data.otp_token && response.data.ref_code) {
              return { otpToken: response.data.otp_token, refCode: response.data.ref_code };
            } else {
              throw new Error('OTP token or ref code is missing in the response');
            }
          })
        )
        .subscribe({
          next: (response: any) => {
            const { otpToken, refCode } = response;
            this.refCode = refCode;
          },

          error: (error: any) => {
            console.error(error);
          }
        });
    }
  }

  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
  }

  onChangeDigit(
    event: KeyboardEvent,
    nextEl: HTMLInputElement | null,
    previousEl: HTMLInputElement | any,
    currentEl: HTMLInputElement,
    formControl: AbstractControl
  ) {
    if (this.submitted) {
      this.submitted = false;
    }
    const currentValue = this.currentDigit;
    const regExpNumber: RegExp = /[0-9]/g;
    const unblockList = [
      'ArrowUp',
      'ArrowDown',
      'Space',
      'ArrowRight',
      'ArrowLeft',
      'Backspace',
    ];
    if (
      !event.key.match(regExpNumber) &&
      unblockList.indexOf(event.code) === -1
    )
      return event.preventDefault();
    if (event.code === 'ArrowUp') return event.preventDefault();
    if (event.code === 'ArrowDown') return event.preventDefault();
    if (event.code === 'Space') return event.preventDefault();
    if (event.code === 'ArrowRight' && nextEl) {
      this.currentDigit = nextEl.value ? Number(nextEl.value) : null;
      if (nextEl.value) return nextEl.select();
      return nextEl.focus();
    }
    if (event.code === 'ArrowLeft' && previousEl) {
      this.currentDigit = previousEl.value ? Number(previousEl.value) : null;
      if (previousEl.value) return previousEl.select();
      return previousEl.focus();
    }
    if (
      event.code !== 'Backspace' &&
      event.code !== 'ArrowRight' &&
      event.code !== 'ArrowLeft'
    ) {
      if (currentEl) {
        if (currentEl.value) {
          this.currentDigit = Number(event.key);
          currentEl.value = event.key;
          formControl.setValue(Number(event.key));
          if (!nextEl) return this.submitEl?.nativeElement?.focus();
          this.currentDigit = nextEl.value ? Number(nextEl.value) : null;
          if (nextEl.value) return nextEl.select();
          if (!nextEl.value) return nextEl.focus();
        }
      }
    }
    if (event.code === 'Backspace' && previousEl) {
      if (previousEl.value && !currentValue) {
        previousEl.value = null;
        this.currentDigit = null;
        return previousEl.focus();
      }
      this.currentDigit = previousEl.value ? Number(previousEl.value) : null;
      return previousEl.select();
    }
  }

  onBlockKeydown(event: KeyboardEvent, currentEl: HTMLInputElement) {
    const blockList = [
      'NumpadSubtract',
      'Minus',
      'Semicolon',
      'Backquote',
      'NumpadDecimal',
      'Period',
      'NumpadDecimal',
      'Quote',
      'NumpadAdd',
      'Equal',
      'Slash',
      'KeyE',
      'Space',
      'ArrowUp',
      'ArrowDown',
    ];
    const unblockList = ['Space', 'ArrowRight', 'ArrowLeft', 'Backspace'];
    const regExpNumber: RegExp = /[0-9]/g;
    const currentValue = currentEl.value;
    if (
      !event.key.match(regExpNumber) &&
      blockList.indexOf(event.code) === -1 &&
      unblockList.indexOf(event.code) === -1
    )
      return event.preventDefault();
    if (
      !event.key.match(regExpNumber) &&
      blockList.indexOf(event.code) !== -1 &&
      unblockList.indexOf(event.code) === -1
    )
      return event.preventDefault();
    if (
      currentValue &&
      event.key.match(regExpNumber) &&
      currentValue.length >= 1
    )
      return event.preventDefault();
  }

  onClickDigit(currentEl: HTMLInputElement) {
    currentEl.select();
    this.currentDigit = currentEl.value ? Number(currentEl.value) : null;
  }

  onsendOTP() {
   
  }

  onBack() {
    this.previousStep.emit('user-info');
  }

//   onNext() {
//     if (this.form.valid) {
//         const mobileNumber = this.mobileNumber;
       
//         const digitControls = ['digit_1', 'digit_2', 'digit_3', 'digit_4', 'digit_5', 'digit_6'];
//         const otpToken = digitControls.map(controlName => this.form.get(controlName)?.value).join(''); 
//         const OTPCODE = otpToken
//         console.log('OTP Token:', otpToken);
//         console.log(OTPCODE);
        
//         const endpoint = 'notification/sms-otp';
//         const body = {
//             mobileNumber: mobileNumber,
//             requestParam: {
//                 channelId: 2,
//                 reqId: '111908f1-04e9-499c'
//             }
//         };

//         this.restApiService.postBackOffice(endpoint, body)
//             .pipe(
//                 map((response: any) => {
//                     if (response.data && response.data.otp_token && response.data.ref_code) {
//                         return { otpToken: response.data.otp_token, refCode: response.data.ref_code };
//                     } else {
//                         throw new Error('OTP token is missing in the response');
//                     }
//                 })
//             )
//             .subscribe({
//                 next: (response: any) => {
//                     const { otpToken, refCode } = response;
//                     console.log('Ref Code:', refCode);

//                     const verifyData = {
//                         otpToken: otpToken,
//                         otpCode: OTPCODE,
//                         refCode: refCode,
//                         requestParam: {
//                             channelId: 2,
//                             reqId: '111908f1-04e9-499c'
//                         }
//                     };
//                     console.log('Verify Data:', verifyData);

//                     // Now you can send the verification request
//                     this.restApiService.postBackOffice('notification/sms-otp-verify', verifyData)
//                         .subscribe({
//                             next: (response: ResponseMessageModel) => {
//                                 console.log('Response:', response);
//                                 // Handle the response accordingly
//                             },
//                             error: (error: any) => {
//                                 console.error(error);
//                                 // Handle errors
//                             }
//                         });
//                 },
//                 error: (error: any) => {
//                     console.error(error);
//                     // Handle errors
//                 }
//             });
//       this.submit.emit(true);
//     }
// }

  onNext() {
    if (this.form.valid) {
        const digitControls = ['digit_1', 'digit_2', 'digit_3', 'digit_4', 'digit_5', 'digit_6'];
        const otpToken = digitControls.map(controlName => this.form.get(controlName)?.value).join(''); 
        const otpCode = otpToken
        const refCode = this.refCode;
        
        const verifyData = {
          otpToken: otpToken,
          otpCode: otpCode,
          refCode: refCode,
          requestParam: {
              channelId: 2,
              reqId: '111908f1-04e9-499c'
          }
        }
        
        this.restApiService.postBackOffice('notification/sms-otp-verify', verifyData)
            .subscribe({
                next: (response: ResponseMessageModel) => {

                },
                error: (error: any) => {
                    console.error('Error:', error);

                }
            }); 
    }
    this.submit.emit(true);
}

}
