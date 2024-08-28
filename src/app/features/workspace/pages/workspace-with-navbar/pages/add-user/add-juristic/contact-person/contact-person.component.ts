import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IJuristicDopaResponse, IPrefixModel, ISaveContactPersonRequest } from 'src/app/core/interfaces';
import { TransformDatePipe } from 'src/app/core/pipes';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import prefixData from 'src/assets/data/prefix.json';

@Component({
  selector: 'contact-person',
  templateUrl: './contact-person.component.html',
  styleUrl: './contact-person.component.scss'
})
export class ContactPersonComponent implements OnInit {

  @Input() form!: FormGroup;
  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<void>();
  @Output() backStep = new EventEmitter<void>();

  public prefixList: IPrefixModel[] = prefixData;

  public today: Date = new Date();

  constructor(
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService,
    private transformDatePipe: TransformDatePipe
  ) { }

  ngOnInit(): void {
    this.onCheckPrefix(this.form.get('prefix')?.value);
  }

  addTagPrefixPromise(name: string) {
    return new Promise((resolve) => {
      console.log("[]", this.prefixList);

      resolve({
        label: name,
        value: name
      })
    });
  }

  onCheckPrefix(prefix: string | null | undefined) {
    if (!prefix) return;
    const foundPrefix = this.prefixList.find((element) => element.value === prefix);
    if (!foundPrefix) {
      this.prefixList.push({
        value: prefix,
        label: prefix
      })
    }
  }

  onSubmit() {
    this.postSaveContactPerson();
  }

  onBack() {
    this.backStep.emit();
  }

  postSaveContactPerson() {
    const birthDate = this.transformDatePipe.transform(this.form.get('birthDate')?.value, 'YYYY-MM-DD', 'en');
    const cardExpDate = this.transformDatePipe.transform(this.form.get('cardExpDate')?.value, 'YYYY-MM-DD', 'en');
    const paylaod: ISaveContactPersonRequest = {
      citizenId: this.form.get('citizenId')?.value,
      laserCode: this.form.get('citizenId')?.value,
      gender: this.form.get('gender')?.value,
      titleName: this.form.get('prefix')?.value,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      phoneNo: this.form.get('phone')?.value,
      birthDate: String(birthDate),
      cardExpDate: String(cardExpDate),
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<ISaveContactPersonRequest, ISaveContactPersonRequest>(`onboarding/${this.transactionId}/contact-person/save`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          // this.nextStep.emit();
          this.postCheckDopa();
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  postCheckDopa() {
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<null, IJuristicDopaResponse>(`onboarding/${this.transactionId}/dopa`, null).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          if(res.data.isValid) {
            this.modalDialogService.info('success', '#32993C', 'ตรวจสอบสำเร็จ', 'ผ่านตรวจสอบ DOPA สำเร็จ').then((res: boolean) => {
              if(res) this.nextStep.emit();
            })
          }else {
            this.modalDialogService.info('warning', '#FF3B30', 'ตรวจสอบไม่ผ่าน', 'ตรวจสอบ DOPA ไม่ผ่านกรุณาตรวจสอบข้อมูลอีกครั้ง');
          }
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

}
