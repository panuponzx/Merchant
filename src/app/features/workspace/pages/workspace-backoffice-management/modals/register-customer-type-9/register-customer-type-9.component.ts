import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first, map, Observable } from 'rxjs';
import { IMasterDataInstitutionType9Model, IResponseMasterDataInstitutionType9Model, ITransactionSuspensionElementModal } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-register-customer-type-9',
  templateUrl: './register-customer-type-9.component.html',
  styleUrl: './register-customer-type-9.component.scss'
})
export class RegisterCustomerType9Component {
  form: FormGroup;
  public row = {} as ITransactionSuspensionElementModal;
  public masterInstitution: IMasterDataInstitutionType9Model[] = [];


  constructor(
    private formBuilder: FormBuilder,
    public ngbActiveModal: NgbActiveModal,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      institution: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      remark: new FormControl({ value: undefined, disabled: false }),
    });
  }
  ngOnInit() {
    this.modalDialogService.loading();
    this.loadMasterInstitution().subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        this.masterInstitution = res.data;
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(err);
      }
    })
  }

  onClose() {
    this.ngbActiveModal.close();
  }
  loadMasterInstitution() {
    return this.restApiService.getBackOffice("customer-type-9/master-data-institution-type-9") as Observable<IResponseMasterDataInstitutionType9Model>
  }

  onSubmit() {
    if (this.form.valid){
      const payload = {
        id: this.form.value.institution,
        remark: this.form.value.remark
      }
      this.modalDialogService.loading();
      this.restApiService.postBackOffice("customer-type-9/register", payload).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          this.modalDialogService.info("success", "#2255CE", "สำเร็จ", "ลงทะเบียนสำเร็จ");
          this.ngbActiveModal.close();
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
        }
      });
    }
  }
}
