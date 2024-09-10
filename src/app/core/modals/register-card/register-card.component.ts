import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../../services';
import { Observable, zip } from 'rxjs';
import { IFaremediaOwnerInfoResponseModel, IReponseRegisterTestFaremediaModel } from '../../interfaces';
import { ModalDialogService } from '../../services/modal-dialog/modal-dialog.service';
import { ConfirmCheckComponent } from './confirm-check/confirm-check.component';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrl: './register-card.component.scss'
})
export class RegisterCardComponent {
  public row = {} as any;
  public form: FormGroup;
  public isLoading: boolean = false;
  constructor(
    private restApiService: RestApiService,
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private modalDialogService: ModalDialogService,
    private modalService: NgbModal,
  ) {
    this.form = this.formBuilder.group({
      faremediaValue: new FormControl({ value: undefined, disabled: false }, Validators.required),
    });
  }
  onClose() {
    this.ngbActiveModal.close();
  }

  onSummitConfirmCheck() {
    this.isLoading = true;
    this.modalDialogService.loading();
    this.ConfirmCheckFaremedia().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        const modalRef = this.modalService.open(ConfirmCheckComponent, {
          centered: true,
          backdrop: 'static',
          size: 'm',
          keyboard: false,
        });
        modalRef.componentInstance.faremediaInfo = response.data;
        modalRef.result.then((result) => {
          if (result){
            this.ngbActiveModal.close(true);
          }
        });
      },
      error: async (error) => {
        this.isLoading = false;
        let errorText;
        try {
          var throwableMessage = error.body.throwableMessage;
          switch (throwableMessage) {
            case 'Faremedia test is existed and active':
              errorText = 'หมายเลขอุปกรณ์ ถูกลงทะเบียนแล้ว';
              break;
            case 'Faremedia is not existed':
              errorText = 'หมายเลขอุปกรณ์ ไม่มีอยู่ในระบบ';
              break;
            default:
              errorText = error.body.throwableMessage;
              break;
          }
          await this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', errorText);
          window.location.reload();
        } catch (_) {
          this.modalDialogService.handleError(error);
        }
        this.modalDialogService.hideLoading();
      }
    });
  }

  ConfirmCheckFaremedia() {
    const mockupData = {
      faremediaValue: this.form.value.faremediaValue,
    };
    return this.restApiService.postBackOffice('faremedia/test/get-obu-owner ', mockupData) as Observable<IFaremediaOwnerInfoResponseModel>;
  }
}
