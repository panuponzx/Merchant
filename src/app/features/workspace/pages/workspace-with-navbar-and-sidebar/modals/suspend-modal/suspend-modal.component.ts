import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CustomerModel, IResonsSuspendModel, IResonsSuspendResponseModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-suspend-modal',
  templateUrl: './suspend-modal.component.html',
  styleUrl: './suspend-modal.component.scss'
})
export class SuspendModalComponent {
  @Input() public customer: CustomerModel | undefined;
  @Input() public obuNumber: string = '';
  @Input() public smartCardId: string = '';
  @Input() public walletId: string = '';
  @Input() public isSuspend: boolean = true;
  public form: FormGroup = this.formBuilder.group({
    reason: new FormControl({ value: undefined, disabled: false }, Validators.required),
    remark: new FormControl({ value: "", disabled: false }),
    name: new FormControl({ value: undefined, disabled: true }, Validators.required),
    isCancelOnBehalfReason: new FormControl({ value: false, disabled: false }),
    position: new FormControl({ value: "", disabled: true }),
    relationship: new FormControl({ value: undefined, disabled: true }),
    identificationNumber: new FormControl({ value: undefined, disabled: true }, Validators.required),
  });
  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
  }


  public reasonOptions: IResonsSuspendModel[] = [];

  ngOnInit() {

    this.form.patchValue({
      name: this.getName(),
      relationship: "ผู้ถือบัตร",
      identificationNumber: this.customer?.citizenId
    });
    if (this.isSuspend) {
      this.modalDialogService.loading();
      this.loadTestFaremidia()
        .subscribe({
          next: (info) => {
            this.reasonOptions = info.data;
            this.modalDialogService.hideLoading();
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            this.modalDialogService.handleError(err);
          }
        });
    }else{
      this.form.patchValue({
        reason: "0",
      })
    }
  }

  getName() {
    var name = '';
    if (this.customer?.title) {
      name += this.customer?.title;
    }
    if (this.customer?.firstName) {
      name += ' ' + this.customer?.firstName;
    }
    if (this.customer?.lastName) {
      name += ' ' + this.customer?.lastName;
    }
    return name;
  }
  onClose() {
    this.ngbActiveModal.close();
  }

  onSubmit() {
  }
  onChangeCancelOnBehalfReason() {
    if (this.form.get('isCancelOnBehalfReason')?.value) {
      this.form.get('name')?.enable();
      this.form.get('position')?.enable();
      this.form.get('relationship')?.enable();
      this.form.get('identificationNumber')?.enable();
      this.form.patchValue({
        name: undefined,
        position: "",
        relationship: undefined,
        identificationNumber: undefined
      });
    } else {
      this.form.get('name')?.disable();
      this.form.get('position')?.disable();
      this.form.get('relationship')?.disable();
      this.form.get('identificationNumber')?.disable();
      this.form.patchValue({
        name: this.getName(),
        relationship: "ผู้ถือบัตร",
        identificationNumber: this.customer?.citizenId
      });
    }
  }
  loadTestFaremidia() {
    return this.restApiService.getBackOffice('faremedia/get-reasons-suspend') as Observable<IResonsSuspendResponseModel>;
  }
  onSuspend() {
    if (this.form.valid) {
      this.modalDialogService.loading();
      const payload = {
        obu: {
          obuPan: this.obuNumber,
          smartcardNo: this.smartCardId,
          obuStatusRemark: this.form.get('remark')?.value,
        },
        wallet: {
          id: this.walletId,
        },
        isByProxy: this.form.get('isCancelOnBehalfReason') != undefined ? this.form.get('isCancelOnBehalfReason')?.value : false,
        reasonId: this.form.get('reason')?.value,
        requestBy: this.form.get('name')?.value,
        requestPosition: this.form.get('position')?.value,
        requestRelation: this.form.get('relationship')?.value,
        requestIdNo: this.form.get('identificationNumber')?.value,
      }
      this.restApiService.postBackOffice('faremedia/suspend-obu-by-staff', payload).subscribe(
        {
          next: async (_) => {
            this.modalDialogService.hideLoading();
            await this.modalDialogService.info('success', '#2255CE', 'แจ้งคำร้องขออายัดชั่วคราวสำเร็จ');
            this.ngbActiveModal.close(true);
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            this.modalDialogService.handleError(err);
          },
        }
      );
    }
  }
  onActive() {
    if (this.form.valid) {
      this.modalDialogService.loading();
      const payload = {
        obu: {
          obuPan: this.obuNumber,
          smartcardNo: this.smartCardId,
          obuStatusRemark: this.form.get('remark')?.value,
        },
        wallet: {
          id: this.walletId,
        },
        isByProxy: this.form.get('isCancelOnBehalfReason') != undefined ? this.form.get('isCancelOnBehalfReason')?.value : false,
        reasonId: 0,
        requestBy: this.form.get('name')?.value,
        requestPosition: this.form.get('position')?.value,
        requestRelation: this.form.get('relationship')?.value,
        requestIdNo: this.form.get('identificationNumber')?.value,
      }
      this.restApiService.postBackOffice('faremedia/active-obu-by-staff', payload).subscribe(
        {
          next: async (_) => {
            this.modalDialogService.hideLoading();
            await this.modalDialogService.info('success', '#2255CE', 'แจ้งคำร้องขอยกเลิกอายัดชั่วคราวสำเร็จ');
            this.ngbActiveModal.close(true);
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            this.modalDialogService.handleError(err);
          },
        }
      );
    }
  }
}