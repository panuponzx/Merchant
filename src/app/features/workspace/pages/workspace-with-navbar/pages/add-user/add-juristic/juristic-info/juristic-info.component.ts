import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IJuristicModel, IOtpEmailResponse, ISaveJuristicInfoRequest } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'juristic-info',
  templateUrl: './juristic-info.component.html',
  styleUrl: './juristic-info.component.scss'
})
export class JuristicInfoComponent {

  @Input() form!: FormGroup;
  @Input() transactionId!: string;


  @Output() nextStep = new EventEmitter<IJuristicModel>();
  @Output() backStep = new EventEmitter<void>();

  public branchList: any[] = [
    {
      label: 'สาขาใหญ่',
      id: 'M'
    },
    {
      label: 'สาขาย่อย',
      id: 'B'
    },
  ];

  constructor(
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService
  ) { }

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
    if (event.id === 'M') {
      this.form.get('branchName')?.setValue('สาขาใหญ่');
      this.form.get('branchNo')?.setValue('00000');
      this.form.get('branchName')?.disable();
      this.form.get('branchNo')?.disable();
    } else if (event.id === 'B') {
      this.form.get('branchName')?.setValue('');
      this.form.get('branchNo')?.setValue('');
      this.form.get('branchName')?.enable();
      this.form.get('branchNo')?.enable();
    }
  }
}
