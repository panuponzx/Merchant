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

  public step: number = 1;

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

  onNextStep() {
    console.log('[onNextStep] findInvalidControls => ', this.findInvalidControls());
    if (this.step === 1) {
      // this.form.get('digit_1')?.addValidators(Validators.required);
      // this.form.get('digit_2')?.addValidators(Validators.required);
      // this.form.get('digit_3')?.addValidators(Validators.required);
      // this.form.get('digit_4')?.addValidators(Validators.required);
      // this.form.get('digit_5')?.addValidators(Validators.required);
      // this.form.get('digit_6')?.addValidators(Validators.required);
    }
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
