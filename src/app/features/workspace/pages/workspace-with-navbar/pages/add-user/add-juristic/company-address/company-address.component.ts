import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IJuristicModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'company-address',
  templateUrl: './company-address.component.html',
  styleUrl: './company-address.component.scss'
})
export class CompanyAddressComponent {

  @Input() form!: FormGroup;
  @Input() transactionId!: string;
  @Input() juristicInfo!: IJuristicModel;

  @Output() nextStep = new EventEmitter<void>();
  @Output() backStep = new EventEmitter<void>();

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
  ) { }

  onSubmit() {
    this.nextStep.emit();
    // this.postSaveJuristicInfo();
  }

  onBack() {
    this.backStep.emit();
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
