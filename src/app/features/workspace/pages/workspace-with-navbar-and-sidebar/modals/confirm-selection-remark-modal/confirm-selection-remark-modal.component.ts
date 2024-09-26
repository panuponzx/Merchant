import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'src/app/core/interfaces';
import { AuthenticationService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { ConfirmCancelWithEmployeeIdComponent } from '../confirm-cancel-with-employee-id/confirm-cancel-with-employee-id.component';

@Component({
  selector: 'confirm-selection-remark-modal',
  templateUrl: './confirm-selection-remark-modal.component.html',
  styleUrl: './confirm-selection-remark-modal.component.scss'
})
export class ConfirmSelectionRemarkModalComponent {
  public form: FormGroup;
  @Input() title: string = 'ยืนยัน';
  @Input() optionsDescription: string = 'เหตุผล';
  @Input() remarkDescription: string = 'หมายเหตุ';
  @Input() submitDescription: string = 'ยืนยัน';
  @Input() onSubmitted!: (reason: string, remark: string) => void;
  @Input() options: any = []
  constructor(
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private ngbModal: NgbModal,
    private modalDialogService: ModalDialogService,
  ) {
    this.form = this.formBuilder.group({
      reason: new FormControl({ value: undefined, disabled: false }, Validators.required),
      remark: new FormControl({ value: undefined, disabled: false }),
    });
  }
  ngOnInit(): void {
  }
  onClose() {
    this.ngbActiveModal.dismiss(true);
  }
  handelChangeOption() {
    var option = this.form.get("reason")?.value;
    if (this.options.find((x: any) => x.value === option)?.name.includes("อื่นๆ")) {
      this.form.get("remark")?.setValidators(Validators.required);
    } else {
      this.form.get("remark")?.clearValidators();
    }
  }
  onSubmit() {
    const modalRef = this.ngbModal.open(ConfirmCancelWithEmployeeIdComponent, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.onSubmitted = () => {
      this.modalDialogService.loading();
      Promise.resolve(this.onSubmitted(this.form.get("reason")?.value, this.form.get("remark")?.value)).then(() => {
        this.ngbActiveModal.close(true);
      });
    };

  }

}
