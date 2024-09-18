import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-add-customer-roadshow-campaign',
  templateUrl: './add-customer-roadshow-campaign.component.html',
  styleUrl: './add-customer-roadshow-campaign.component.scss'
})
export class AddCustomerRoadshowCampaignComponent {

  @Input() id!: string;
  
  public step: number = 1;

  firstForm: FormGroup;
  secondForm: FormGroup;

  public walletsList: any[] = [];

  constructor(
    private ngbActiveModal: NgbActiveModal,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService,
    private formBuilder: FormBuilder
  ) {
    this.firstForm = this.formBuilder.group({
      citizenId: new FormControl(undefined, Validators.required),
    });
    this.firstForm.get('citizenId')?.setValue('1459900715114');
    this.secondForm = this.formBuilder.group({
      citizenId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      walletId: new FormControl(undefined, Validators.required),
    });
  }
  ngOnInit() {
    // if (this.walletName) {
    //   this.form.get('walletName')?.setValue(this.walletName);
    // }
  }
  onSubmit() {
    // if (this.form.valid) {
    //   this.modalDialogService.confirm('ยืนยันการแก้ไขชื่อกระเป๋าเงิน', 'คุณต้องการแก้ไขชื่อกระเป๋าเงินใช่หรือไม่?').then((res) => {
    //     if (res) {
    //       this.modalDialogService.loading();
    //       this._editWallet().subscribe({
    //         next: (res) => {
    //           this.modalDialogService.hideLoading();
    //           this.modalDialogService.info('success', '#2255CE', 'แก้ไขชื่อกระเป๋าเงินสำเร็จ');
    //           this.ngbActiveModal.close(true);
    //         },
    //         error: (err) => {
    //           this.modalDialogService.hideLoading();
    //           this.modalDialogService.handleError(err);
    //         }
    //       });
    //     }
    //   }
    //   )
    // }
    // else {
    //   this.form.markAllAsTouched();
    // }
  }
  // _editWallet() {
  //   const payload = {
  //     walletId: this.walletId,
  //     walletName: this.form.get('walletName')?.value,
  //     walletTypeId: this.walletTypeId
  //   }
  //   return this.restApiService.postBackOffice('wallet/edit-wallet', payload) as Observable<any>;
  // }

  onNext() {
    if(this.step === 1) {
      const citizenId: string = this.firstForm.get('citizenId')?.value;
      this.secondForm.get('citizenId')?.setValue(citizenId);
    }
    this.step++;
  }

  onBack() {
    this.step--;
  }

  onClose() {
    this.ngbActiveModal.close();
  }

}
