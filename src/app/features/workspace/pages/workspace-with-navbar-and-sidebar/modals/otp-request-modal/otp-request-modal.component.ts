import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../../../../../../core/services';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-otp-request-modal',
  templateUrl: './otp-request-modal.component.html',
  styleUrl: './otp-request-modal.component.scss'
})
export class OtpRequestModalComponent {

  public form: FormGroup;

  public step: number = 2;

  private currentDigit: number | null | undefined;
  display: any;
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
    this.form = this.formBuilder.group({
      email: new FormControl({ value: undefined, disabled: false }, Validators.required),
      digit_1: new FormControl({ value: undefined, disabled: false }, Validators.required),
      digit_2: new FormControl({ value: undefined, disabled: false }, Validators.required),
      digit_3: new FormControl({ value: undefined, disabled: false }, Validators.required),
      digit_4: new FormControl({ value: undefined, disabled: false }, Validators.required),
      digit_5: new FormControl({ value: undefined, disabled: false }, Validators.required),
      digit_6: new FormControl({ value: undefined, disabled: false }, Validators.required),
    })
  }


  onChangeDigit(
    event: KeyboardEvent,
    nextEl: HTMLInputElement | null,
    previousEl: HTMLInputElement | any,
    currentEl: HTMLInputElement,
    formControl: AbstractControl
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

  onNextStep() {
    if (this.step === 2) {
      this.onConfirm();
    } else {
      this.step++;
    }
  }



  onConfirm() {
    const data = {
      customer: {
        id: this.customerId,
        isEtaxActive: this.formEtax.get('isEtaxActive')?.value,
        etaxSettingLevel: this.formEtax.get('etaxSettingLevel')?.value,
        customerEtax: [
          ...(
            this.etaxTypeId === 0 ? [{
              etaxTypeId: this.etaxTypeId,
              email: 'abc000@hotmail.com',
            }] : []
          ),
          ...(
            this.etaxTypeId === 1 ? [{
              etaxTypeId: this.etaxTypeId,
              isEtaxActive: this.formEtax.get('isEtaxActive1')?.value,
              email: 'abc111@hotmail.com',
            }] : []
          ),
          ...(
            this.etaxTypeId === 2 ? [{
              etaxTypeId: this.etaxTypeId,
              isEtaxActive: this.formEtax.get('isEtaxActive2')?.value,
              email: 'abc222@hotmail.com',
            }] : []
          ),
          ...(
            this.etaxTypeId === 3 ? [{
              etaxTypeId: this.etaxTypeId,
              isEtaxActive: this.formEtax.get('isEtaxActive3')?.value,
              email: 'abc333@hotmail.com',
            }] : []
          ),
          ...(
            this.etaxTypeId === 4 ? [{
              etaxTypeId: this.etaxTypeId,
              isEtaxActive: this.formEtax.get('isEtaxActive4')?.value,
              email: 'abc444@hotmail.com',
            }] : []
          ),
          ...(
            this.etaxTypeId === 5 ? [{
              etaxTypeId: this.etaxTypeId,
              isEtaxActive: this.formEtax.get('isEtaxActive5')?.value,
              email: 'abc555@hotmail.com',
            }] : []
          ),
          // {
          //   etaxTypeId: this.etaxTypeId,
          //   email: 'abc111@hotmail.com',
          // }
        ],
      },
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: "1"
      }
    };
    this.modalDialogService.loading();
    return this.restApiService
      .postBackOffice('customer/etax/edit', data)
      .pipe(
        first(),
        map(res => res as any)
      ).subscribe({
        next: (res) => {
          console.log("[loadEtax] res => ", res);
          this.modalDialogService.hideLoading();
          if (res.errorMessage === "Success") {
            this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การเพิ่ม/เปลี่ยนอีเมลรับใบกำกับภาษีสำเร็จ').then((res: boolean) => {
              if (res) this.ngbActiveModal.close(true);
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
  }

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

}
