import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../../../../../../core/services';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { ResponseMessageModel } from 'src/app/core/interfaces';

@Component({
  selector: 'app-otp-request-modal',
  templateUrl: './otp-request-modal.component.html',
  styleUrl: './otp-request-modal.component.scss'
})
export class OtpRequestModalComponent {

  public form: FormGroup;

  public step: number = 1;
  VerifyToken:string ='';
  err: string = '';
  public Email: any = '';

  private currentDigit: number | null | undefined;
  display: number = 60;
  refOTP: string = '';

  @Input() public customerId: string | null = null;
  @Input() public formEtax: FormGroup | any;
  @Input() public etaxTypeId: number = 0;
  @ViewChild('submit', { static: false }) private submitEl: ElementRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    const emailPattern = new RegExp(/^[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}$/);
    this.form = this.formBuilder.group({
      email: new FormControl({ value: undefined, disabled: false }, [Validators.required, Validators.pattern(emailPattern)]),
      digit_1: new FormControl({ value: undefined, disabled: false }),
      digit_2: new FormControl({ value: undefined, disabled: false }),
      digit_3: new FormControl({ value: undefined, disabled: false }),
      digit_4: new FormControl({ value: undefined, disabled: false }),
      digit_5: new FormControl({ value: undefined, disabled: false }),
      digit_6: new FormControl({ value: undefined, disabled: false }),
    })
  }


  onChangeDigit(
    event: KeyboardEvent,
    nextEl: HTMLInputElement | any,
    previousEl: HTMLInputElement | any,
    currentEl: HTMLInputElement | any,
    formControl: AbstractControl | any
  ) {
    // if (this.submitted) {
    //   this.submitted = false;
    // }
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


  onPreviousStep() {
    this.step--;
    if (this.step === 0) {
      this.ngbActiveModal.dismiss(true);
    }
  }

  // sendOTP() {
  //   const Email = this.form.get('email')?.value;
  //   const data = {
  //     recipientEmail: Email,
  //     requestParam: {
  //       channelId: 2,
  //       reqId: "111908f1-04e9-499c"
  //     }
  //   };

  //   this.restApiService.postBackOffice('notification/email-otp', data)
  //     .pipe(
  //       map((response: any) => {
  //         if (response.data && response.data.verify_token && response.data.ref_code) {
  //           this.VerifyToken = response.data.verify_token;
  //           this.refOTP = response.data.ref_code;
  //           return { refOTP: response.data.ref_code, VerifyToken: response.data.verify_token };
  //         } else {
  //           throw new Error('VerifyCode and Token is missing');
  //         }
  //       })
  //     ).subscribe({
  //       next: (response: any) => {
  //         console.log('OTP sent successfully',response);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //         this.err = error.message;
  //       }
  //     });
  // }

  sendOTP() {
    this.Email = this.form.get('email')?.value;
    if (!this.Email) {
      console.error('Email is missing');
      this.err = 'Email is required';
      return;
    }

    console.log('Sending OTP to:', this.Email);  // Debug log

    const data = {
      recipientEmail: this.Email,
      requestParam: {
        channelId: 2,
        reqId: "111908f1-04e9-499c"
      }
    };

    this.restApiService.postBackOffice('notification/email-otp', data)
      .pipe(
        map((response: any) => {
          // console.log('API response:', response);  // Debug log
          if (response.data && response.data.verify_token && response.data.ref_code) {
            this.VerifyToken = response.data.verify_token;
            this.refOTP = response.data.ref_code;
            const cooldownMinute = parseFloat(response.data.limit_minute);
            if (isNaN(cooldownMinute)) {
              throw new Error('Cooldown time');
            }
            const cooldownTime = cooldownMinute * 60
            return { refOTP: response.data.ref_code, VerifyToken: response.data.verify_token , cooldownTime: cooldownTime };
          } else {
            throw new Error('VerifyCode and Token are missing');
          }
        })
      ).subscribe({
        next: (response: any) => {
          // console.log('OTP sent successfully', response);
          this.startCooldown(response.cooldownTime);
        },
        error: (error) => {
          console.error('Error sending OTP:', error);
          this.err = error.message;
        }
      });
  }

  cooldownActive: boolean = false;
  intervalId: any;

  onAgain() {
    if (!this.cooldownActive) {
      this.sendOTP();
    }
  }

  startCooldown(cooldownTimeInSeconds: number) {
    this.cooldownActive = true;
    this.display = cooldownTimeInSeconds;
  
    this.intervalId = setInterval(() => {
      this.display--;
      if (this.display <= 0) {
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

  // onNextStep() {
  //   console.log('[onNextStep] findInvalidControls => ', this.findInvalidControls());
  //   if (this.step === 1) {
  //     // this.form.get('digit_1')?.addValidators(Validators.required);
  //     // this.form.get('digit_2')?.addValidators(Validators.required);
  //     // this.form.get('digit_3')?.addValidators(Validators.required);
  //     // this.form.get('digit_4')?.addValidators(Validators.required);
  //     // this.form.get('digit_5')?.addValidators(Validators.required);
  //     // this.form.get('digit_6')?.addValidators(Validators.required);
  //     this.sendOTP();
  //   }
  //   if (this.step === 2) {
  //     this.verifyOTP();
  //     this.onConfirm();
  //   } else {
  //     this.step++
  //   }
  // }

  onNextStep() {
    console.log('[onNextStep] findInvalidControls => ', this.findInvalidControls());
    if (this.step === 1) {
      this.sendOTP();
      
    } if (this.step === 2) {
      this.onConfirm();
    } else (
      this.step++
    )
  }


  // verifyOTP() {
  //   const otpCode = this.getOtpCode();
  //   if (!this.VerifyToken || !this.refOTP) {
  //     this.err = 'Verification token or reference OTP is missing.';
  //     return;
  //   }

  //   const data = {
  //     verifyToken: this.VerifyToken,
  //     verifyCode: otpCode,
  //     refCode: this.refOTP,
  //     requestParam: {
  //       channelId: 2,
  //       reqId: "111908f1-04e9-499c"
  //     }
  //   };

  //   this.restApiService.postBackOffice('notification/email-otp-verify', data)
  //     .subscribe({
  //       next: (response: any) => {
  //         if (response && response.data && response.data.verified) {
  //           console.log('OTP verified successfully:', response);
  //           // Proceed to the next step or indicate success
  //         } else {
  //           this.err = 'Invalid OTP';
  //           console.error('OTP verification failed:', response);
  //         }
  //       },
  //       error: (error: any) => {
  //         console.error('Error verifying OTP:', error);
  //         this.err = 'Invalid OTP or verification failed.';
  //       }
  //     });
  // }

  // verifyOTP() {
    
  //   const otpCode = this.getOtpCode();
  //   if (!this.VerifyToken || !this.refOTP) {
  //     this.err = 'Verification token or reference OTP is missing.';
  //     return;
  //   }
  
  //   const data = {
  //     verifyToken: this.VerifyToken,
  //     verifyCode: otpCode,
  //     refCode: this.refOTP,
  //     requestParam: {
  //       channelId: 2,
  //       reqId: "111908f1-04e9-499c"
  //     }
  //   };
  
  //   this.restApiService.postBackOffice('notification/email-otp-verify', data)
  //     .subscribe({
  //       next: (response: any) => {
  //         if (response && response.data && response.data.verified) {
  //           this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การเพิ่ม/เปลี่ยนอีเมลรับใบกำกับภาษีสำเร็จ').then
  //           ((res: boolean) => {
  //             if (res) this.ngbActiveModal.close(true);
  //             console.log('OTP verified successfully:', response);
  //           });
  //         } else {
  //           this.err = 'Invalid OTP';
  //           console.error('OTP verification failed:', response);
  //           this.modalDialogService.info('warning', '#FF0000', 'Verification Failed', 'Invalid OTP');
  //         }
  //       },
  //       error: (error: any) => {
  //         console.error('Error verifying OTP:', error);
  //         this.err = 'Invalid OTP or verification failed.';
  //         this.modalDialogService.info('warning', '#FF0000', 'Verification Failed', 'Invalid OTP or verification failed.');
  //       }
  //     });
  // }

  // getOtpCode(): string {
  //   const digitControls = ['digit_1', 'digit_2', 'digit_3', 'digit_4', 'digit_5', 'digit_6'];
  //   return digitControls.map(controlName => this.form.get(controlName)?.value).join('');
  // }
  


  // onConfirm() { 
  //   const data = {
  //     customer: {
  //       id: this.customerId,
  //       isEtaxActive: this.formEtax.get('isEtaxActive')?.value,
  //       etaxSettingLevel: this.formEtax.get('etaxSettingLevel')?.value,
  //       customerEtax: [
  //         ...(
  //           this.etaxTypeId === 0 ? [{
  //             etaxTypeId: this.etaxTypeId,
  //             email: this.form.get('email')?.value,
  //           }] : []
  //         ),
  //         ...(
  //           this.etaxTypeId === 1 ? [{
  //             etaxTypeId: this.etaxTypeId,
  //             isEtaxActive: this.formEtax.get('isEtaxActive1')?.value,
  //             email: this.form.get('email')?.value,
  //           }] : []
  //         ),
  //         ...(
  //           this.etaxTypeId === 2 ? [{
  //             etaxTypeId: this.etaxTypeId,
  //             isEtaxActive: this.formEtax.get('isEtaxActive2')?.value,
  //             email: this.form.get('email')?.value,
  //           }] : []
  //         ),
  //         ...(
  //           this.etaxTypeId === 3 ? [{
  //             etaxTypeId: this.etaxTypeId,
  //             isEtaxActive: this.formEtax.get('isEtaxActive3')?.value,
  //             email: this.form.get('email')?.value,
  //           }] : []
  //         ),
  //         ...(
  //           this.etaxTypeId === 4 ? [{
  //             etaxTypeId: this.etaxTypeId,
  //             isEtaxActive: this.formEtax.get('isEtaxActive4')?.value,
  //             email: this.form.get('email')?.value,
  //           }] : []
  //         ),
  //         ...(
  //           this.etaxTypeId === 5 ? [{
  //             etaxTypeId: this.etaxTypeId,
  //             isEtaxActive: this.formEtax.get('isEtaxActive5')?.value,
  //             email: this.form.get('email')?.value,
  //           }] : []
  //         ),
  //         // {
  //         //   etaxTypeId: this.etaxTypeId,
  //         //   email: 'abc111@hotmail.com',
  //         // }
  //       ],
  //     },
  //     requestParam: {
  //       reqId: "23498-sss-k339c-322s2",
  //       channelId: "1"
  //     }
  //   };
  //   this.modalDialogService.loading();
  //   this.restApiService
  //     .postBackOffice('customer/etax/edit', data)
  //     .pipe(
  //       first(),
  //       map(res => res as any)
  //     ).subscribe({
  //       next: (res) => {
  //         console.log("[loadEtax] res => ", res);
  //         this.modalDialogService.hideLoading();
  //         if (res.errorMessage === "Success") {
  //           // this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การเพิ่ม/เปลี่ยนอีเมลรับใบกำกับภาษีสำเร็จ').then
  //           ((res: boolean) => {
  //             if (res) this.ngbActiveModal.close(true);
  //             this.verifyOTP();
  //           });;
  //         } else {
  //           this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
  //         } 
  //       },
  //       error: (err) => {
  //         this.modalDialogService.hideLoading();
  //         this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body.errorMessage);
  //         console.error(err);
  //       }
  //     })
      
  // }

  verifyOTP(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const otpCode = this.getOtpCode();
      if (!this.VerifyToken || !this.refOTP) {
        this.err = 'Verification token or reference OTP is missing.';
        reject('Verification token or reference OTP is missing.');
        return;
      }
  
      const data = {
        verifyToken: this.VerifyToken,
        verifyCode: otpCode,
        refCode: this.refOTP,
        requestParam: {
          channelId: 2,
          reqId: "111908f1-04e9-499c"
        }
      };
  
      this.restApiService.postBackOffice('notification/email-otp-verify', data)
        .subscribe({
          next: (response: any) => {
            if (response && response.data && response.data.verified) {
              // console.log('OTP verified successfully:', response);
              resolve(true);
            } else {
              this.err = 'Invalid OTP';
              // console.error('OTP verification failed:', response);
              this.modalDialogService.info('warning', '#FF0000', 'Verification Failed', 'Invalid OTP');
              resolve(false);
            }
          },
          error: (error: any) => {
            console.error('Error verifying OTP:', error);
            this.err = 'Invalid OTP or verification failed.';
            this.modalDialogService.info('warning', '#FF0000', 'Verification Failed', 'Invalid OTP or verification failed.');
            reject(false);
          }
        });
    });
  }
  
  getOtpCode(): string {
    const digitControls = ['digit_1', 'digit_2', 'digit_3', 'digit_4', 'digit_5', 'digit_6'];
    return digitControls.map(controlName => this.form.get(controlName)?.value).join('');
  }
  
  onConfirm() {
    this.verifyOTP().then((verified) => {
      if (!verified) {
        return;
      }
  
      const data = {
        customer: {
          id: this.customerId,
          isEtaxActive: this.formEtax.get('isEtaxActive')?.value,
          etaxSettingLevel: this.formEtax.get('etaxSettingLevel')?.value,
          customerEtax: [
            ...(
              this.etaxTypeId === 0 ? [{
                etaxTypeId: this.etaxTypeId,
                email: this.form.get('email')?.value,
              }] : []
            ),
            ...(
              this.etaxTypeId === 1 ? [{
                etaxTypeId: this.etaxTypeId,
                isEtaxActive: this.formEtax.get('isEtaxActive1')?.value,
                email: this.form.get('email')?.value,
              }] : []
            ),
            ...(
              this.etaxTypeId === 2 ? [{
                etaxTypeId: this.etaxTypeId,
                isEtaxActive: this.formEtax.get('isEtaxActive2')?.value,
                email: this.form.get('email')?.value,
              }] : []
            ),
            ...(
              this.etaxTypeId === 3 ? [{
                etaxTypeId: this.etaxTypeId,
                isEtaxActive: this.formEtax.get('isEtaxActive3')?.value,
                email: this.form.get('email')?.value,
              }] : []
            ),
            ...(
              this.etaxTypeId === 4 ? [{
                etaxTypeId: this.etaxTypeId,
                isEtaxActive: this.formEtax.get('isEtaxActive4')?.value,
                email: this.form.get('email')?.value,
              }] : []
            ),
            ...(
              this.etaxTypeId === 5 ? [{
                etaxTypeId: this.etaxTypeId,
                isEtaxActive: this.formEtax.get('isEtaxActive5')?.value,
                email: this.form.get('email')?.value,
              }] : []
            ),
          ],
        },
        requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: "1"
        }
      };
  
      this.modalDialogService.loading();
      this.restApiService
        .postBackOffice('customer/etax/edit', data)
        .pipe(
          first(),
          map(res => res as any)
        ).subscribe({
          next: (res) => {
            console.log("[loadEtax] res => ", res);
            this.modalDialogService.hideLoading();
            if (res.errorMessage === "Success") {
              this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การเพิ่ม/เปลี่ยนอีเมลรับใบกำกับภาษีสำเร็จ')
                .then(() => {
                  this.ngbActiveModal.close(true);
                });
            } else {
              this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
            }
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body.errorMessage);
            console.error(err);
          }
        });
    }).catch((error) => {
      console.error('OTP verification promise rejected:', error);
    });
  }
  
  

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

}
