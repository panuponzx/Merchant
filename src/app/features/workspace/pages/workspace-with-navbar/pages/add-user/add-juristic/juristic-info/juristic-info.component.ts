import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IJuristicModel, IOtpEmailResponse, ISaveJuristicInfoRequest } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'juristic-info',
  templateUrl: './juristic-info.component.html',
  styleUrl: './juristic-info.component.scss'
})
export class JuristicInfoComponent {

  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<IJuristicModel>();
  @Output() backStep = new EventEmitter<void>();

  form: FormGroup;

  public branchList: any[] = [
    {
      label: 'สาขาใหญ่',
      id: 1
    },
    {
      label: 'สาขาย่อย',
      id: 2
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) {
    this.form = this.formBuilder.group({
      taxId: new FormControl(undefined, Validators.required),
      companyName: new FormControl(undefined, Validators.required),
      branch: new FormControl(undefined, Validators.required),
      branchName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      branchNo: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });
  }

  onSubmit() {
    const juristicInfo: IJuristicModel = {
      corporateRegistrationNo: this.form.get('taxId')?.value,
      corporateName: this.form.get('companyName')?.value,
      branchTypeCode: this.form.get('branch')?.value,
      branchCode: this.form.get('branchName')?.getRawValue(),
      branchName: this.form.get('branchNo')?.getRawValue(),
    };
    this.nextStep.emit(juristicInfo);
  }

  onBack() {
    this.backStep.emit();
  }

  onChangeBranch(event: any) {
    console.log("[onChangeBranch] event => ", event);
    if (event.id === 1) {
      this.form.get('branchName')?.setValue('สาขาใหญ่');
      this.form.get('branchNo')?.setValue('00000');
      this.form.get('branchName')?.disable();
      this.form.get('branchNo')?.disable();
    } else if (event.id === 2) {
      this.form.get('branchName')?.setValue('');
      this.form.get('branchNo')?.setValue('');
      this.form.get('branchName')?.enable();
      this.form.get('branchNo')?.enable();
    }
  }

  // postSaveJuristicInfo() {
  //   const paylaod: ISaveJuristicInfoRequest = {
  //     citizenId: this.form.get('citizenId')?.value,
  //     firstName: this.form.get('firstName')?.value,
  //     lastName: this.form.get('lastName')?.value,
  //     gender: this.form.get('gender')?.value,
  //     phoneNo: this.form.get('phone')?.value,
  //     citizenCardIdentify: true,
  //     passportIdentify: false,
  //     birthdate: this.form.get('birthDate')?.value,
  //   }
  //   this.modalDialogService.loading();
  //   this.restApiService.postBackOfficeWithModel<ISaveJuristicInfoRequest, IOtpEmailResponse>(`onboarding/${this.transactionId}/juristic-info/save`, paylaod).subscribe({
  //     next: (res) => {
  //       this.modalDialogService.hideLoading();
  //       if(res.errorMessage === "Success") {
  //         // this.nextStep.emit(res.data);
  //       }
  //     },
  //     error: (error) => {
  //       this.modalDialogService.hideLoading();
  //       this.modalDialogService.handleError(error);
  //     },
  //   })
  // }

}
