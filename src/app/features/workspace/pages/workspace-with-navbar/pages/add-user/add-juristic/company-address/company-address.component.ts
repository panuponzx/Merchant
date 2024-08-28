import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISaveJuristicInfoRequest } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'company-address',
  templateUrl: './company-address.component.html',
  styleUrl: './company-address.component.scss'
})
export class CompanyAddressComponent {

  @Input() juristicInfoForm!: FormGroup;
  @Input() form!: FormGroup;
  @Input() transactionId!: string;

  @Output() nextStep = new EventEmitter<void>();
  @Output() backStep = new EventEmitter<void>();

  constructor(
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) { }

  onSubmit() {
    this.postSaveJuristicInfo();
  }

  onBack() {
    this.backStep.emit();
  }

  postSaveJuristicInfo() {
    const paylaod: ISaveJuristicInfoRequest = {
      houseNo: this.form.get('addressNo')?.value,
      building: this.form.get('building')?.value,
      floor: this.form.get('floor')?.value,
      village: this.form.get('village')?.value,
      moo: this.form.get('villageNo')?.value,
      soi: this.form.get('soi')?.value,
      street: this.form.get('street')?.value,
      alley: this.form.get('alley')?.value,
      subDistrictCode: this.form.get('subdistrict')?.value,
      districtCode: this.form.get('district')?.value,
      provinceCode: this.form.get('province')?.value,
      postcode: this.form.get('zipcode')?.value,
      corporateRegistrationNo: this.juristicInfoForm.get('taxId')?.value,
      corporateName: this.juristicInfoForm.get('companyName')?.value,
      branchTypeCode: this.juristicInfoForm.get('branch')?.value,
      branchCode: this.juristicInfoForm.get('branchName')?.getRawValue(),
      branchName: this.juristicInfoForm.get('branchNo')?.getRawValue(),
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<ISaveJuristicInfoRequest, any>(`onboarding/${this.transactionId}/juristic-info/save`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          this.nextStep.emit();
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

}
