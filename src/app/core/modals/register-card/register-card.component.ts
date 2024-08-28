import { Component, Input, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransformDatePipe } from '../../pipes';
import { RestApiService } from '../../services';
import { Observable, zip } from 'rxjs';
import { IReponseRegisterTestFaremediaModel } from '../../interfaces';
import { ModalDialogService } from '../../services/modal-dialog/modal-dialog.service';

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
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      faremediaValue: new FormControl({ value: undefined, disabled: false }, Validators.required),
    });
  }
  onClose() {
    this.ngbActiveModal.dismiss();
  }
  async onSummit() {
    this.isLoading = true;
    this.modalDialogService.loading();
    zip(
      await this.registerTestFaremedia()
    ).pipe().subscribe(
      (response) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        this.ngbActiveModal.close();
      },
      (error) => {
        this.isLoading = false;
        this.modalDialogService.handleError(error);
        this.modalDialogService.hideLoading();
      });
    this.ngbActiveModal.close();
  }
  async registerTestFaremedia() {
    const mockupData = {
      faremediaValue: this.form.value.faremediaValue,
    };
    return this.restApiService.postBackOffice('faremedia/create/test-obu', mockupData) as Observable<IReponseRegisterTestFaremediaModel>;

  }

  async searchFaremediaWithWalletId(){
    const mockupData = {
      faremediaValue: this.form.value.faremediaValue,
    };
    return this.restApiService.postBackOffice('faremedia/create/test-obu', mockupData) as Observable<IReponseRegisterTestFaremediaModel>;
  }
}
