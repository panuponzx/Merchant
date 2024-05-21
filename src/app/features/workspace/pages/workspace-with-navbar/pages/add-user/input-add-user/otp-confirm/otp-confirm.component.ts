import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { start } from '@popperjs/core';
import { catchError, map , Observer, throwError} from 'rxjs';
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
  @Input() public otpFrom: FormGroup | any;
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
  refOTP: string = '';
  mobilePhone: string = '';
  public isLoading: boolean = false;
  refCode : string | undefined;
  token: string = '';
  err: string = '';

  footerHeight: number = 0
  
  constructor(private restApiService:RestApiService) {}

  cooldownActive: boolean = true;
  intervalId: any;


  ngOnInit(): void {
    this.sendOTP();

  }

  // sendOTP() {
  //   if (this.form) {
  //     const mobileNumber = this.mobileNumber
  //     console.log(this.mobileNumber)
  //     const body = {
  //       mobileNumber: mobileNumber,
  //       requestParam: {
  //         channelId: 2,
  //         reqId: '111908f1-04e9-499c'
  //       }
  //     };

  //     this.restApiService.postBackOffice('notification/sms-otp', body)
  //       .pipe(
  //         map((response: any) => {
  //           if (response.data && response.data.otp_token && response.data.ref_code && response.data.limit_minute) {
  //             this.refCode = response.data.ref_code;
  //             console.log(this.refCode);
  //             console.log(response.data.otp_token);
              
              
  //             const cooldownMinute = parseFloat(response.data.limit_minute);
  //             if (isNaN(cooldownMinute)){
  //               throw new Error('cooldown Time');
  //             }
  //             const cooldownTime = cooldownMinute * 60
  //             return { otpToken: response.data.otp_token, refCode: response.data.ref_code, cooldownTime: cooldownMinute };
  //           } else {
  //             throw new Error('OTP token or ref code is missing in the response');
  //           }
  //         })
  //       )
  //       .subscribe({
  //         next: (response: any) => { 
  //           this.startCooldown(response.cooldownTime);
  //         },

  //         error: (error: any) => {
  //           console.error(error);
  //           this.err = error
  //         }
  //       });
  //   }
  // }

  sendOTP() {
    if (this.form) {
      const mobileNumber = this.mobileNumber;
      console.log(this.mobileNumber);
      const body = {
        mobileNumber: mobileNumber,
        requestParam: {
          channelId: 2,
          reqId: '111908f1-04e9-499c'
        }
      };
      this.isLoading = true;
      this.restApiService.postBackOffice('notification/sms-otp', body)
        .pipe(
          map((response: any) => {
            if (response.data && response.data.otp_token && response.data.ref_code && response.data.limit_minute) {
              this.refCode = response.data.ref_code;
              this.token = response.data.otp_token;
              console.log(this.refCode);
              console.log(response.data.otp_token);
  
              const cooldownMinute = parseFloat(response.data.limit_minute);
              if (isNaN(cooldownMinute)){
                throw new Error('Cooldown time is not a valid number.');
              }
              const cooldownTime = cooldownMinute * 60;
              return { otpToken: response.data.otp_token, refCode: response.data.ref_code, cooldownTime: cooldownTime };
            } else {
              throw new Error('OTP token, ref code, or cooldown time is missing in the response.');
            }
          }),
          catchError((error: any) => {
            console.error(error);
            this.err = error;
            return throwError(() => new Error('Error sending OTP. Please try again later.'));
          })
        )
        .subscribe({
          next: (response: any) => { 
            this.startCooldown(response.cooldownTime);
          },
          error: (error: any) => {
            console.error(error);
            this.err = error;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    }
  }
  

  onAgain() {
    if (!this.cooldownActive) {
      this.sendOTP();
    }
  }

  startCooldown(cooldownTime: number) {
    this.cooldownActive = true;
    this.display = cooldownTime;

    this.intervalId = setInterval(() => {
      this.display--;
      if (this.display <= 0 ){
        this.clearInterval();
        this.cooldownActive = false;
      }
    }, 1000);
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  

  ngAfterContentInit(): void {
    const footerElement = this.footerRef?.nativeElement as HTMLElement;
    this.footerHeight = footerElement.offsetHeight;
    this.formatMobilePhone();
  }

  formatMobilePhone() {
    let cleaned = ('' + this.otpFrom.get('mobilePhone')?.value).replace(/\D/g, '');
    let match = cleaned.match(/^(0|)(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      this.mobilePhone = '+66 ' + match[2] + ' ••• ' + match[4];
    }
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

  invalidOTP:boolean = false;
  verify: any;

  onNext() {
    if (this.form.valid) {
        const digitControls = ['digit_1', 'digit_2', 'digit_3', 'digit_4', 'digit_5', 'digit_6'];
        const otpCode = digitControls.map(controlName => this.form.get(controlName)?.value).join(''); 
        const otpToken = this.token;
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
                next: (response: any) => {
                    if (response && response.data && response.data.verified === true) {
                        this.submit.emit(true);
                        this.invalidOTP = false;
                        this.verify = response.verified;
                        this.err = 'Success';
                    } else {
                        this.err = 'Invalid OTP';
                        this.invalidOTP = true;
                    }
                },
                error: (error: any) => {
                    console.error('Error:', error);
                    this.err = 'Invalid OTP';
                    this.invalidOTP = true;
                }
            }); 
    } else {
        console.log('Form is invalid');
        this.err = 'Form is invalid.';
        this.invalidOTP = true;
    }
    //     .subscribe({
    //         next: (response: ResponseMessageModel) => {
    //           this.submit.emit(true);
    //           this.invalidOTP = false;
    //           this.err = "success"
    //         },
    //         error: (error: any) => {
    //             console.error('Error:', error);
    //             this.err = "Invalid OTP"
    //             this.invalidOTP = true;
    //         }
    //     }); 
    // } else {
    //   this.err = "Invalid OTP"
    //   this.invalidOTP = true;
    // }

    
      
  }
}
