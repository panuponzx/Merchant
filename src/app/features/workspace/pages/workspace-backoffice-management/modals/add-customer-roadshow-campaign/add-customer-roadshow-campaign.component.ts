import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICustomerSearchByCidElementModel, ICustomerSearchByCidResponse, IWalletInfoModel } from 'src/app/core/interfaces';
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

  public isWalletLoading: boolean = false;
  public walletsList: IWalletInfoModel[] = [];

  constructor(
    private ngbActiveModal: NgbActiveModal,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService,
    private formBuilder: FormBuilder
  ) {
    this.firstForm = this.formBuilder.group({
      citizenId: new FormControl(undefined, Validators.required),
    });
    // this.firstForm.get('citizenId')?.setValue('1459900715114');
    this.secondForm = this.formBuilder.group({
      citizenId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      firstName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      lastName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      customerId: new FormControl(undefined, Validators.required),
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
  
  postSearchCustomerByCid() {
    this.modalDialogService.loading();
    const payload: any = {
      identificationId: this.firstForm.get('citizenId')?.value,
      limit: 10,
      page: 1
    }
    this.restApiService.postBackOfficeWithModelWithRequestParam<any, ICustomerSearchByCidResponse>(`customer/search-by-cid`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          const coutomer: ICustomerSearchByCidElementModel = res.data.elements[0];
          this.secondForm.get('firstName')?.setValue(coutomer.name);
          this.secondForm.get('lastName')?.setValue(coutomer.name);
          this.secondForm.get('customerId')?.setValue(coutomer.customerId);
          this.postGetWallets();
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  postGetWallets() {
    this.isWalletLoading = true;
    const payload = {
      id: this.secondForm.get('customerId')?.value
    }
    this.restApiService.postBackOfficeWithModelWithRequestParam<any, IWalletInfoModel[]>(`wallet/get-wallets`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.walletsList = res.data.filter(res => res.typeId != 6);
        }
        this.isWalletLoading = false;
      },
      error: (error) => {
        this.isWalletLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  postAddRoadShowEarn() {
    const payload = {
      walletId: this.secondForm.get('walletId')?.value,
      customerId: this.secondForm.get('customerId')?.value
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<any, any>(`campaign/road-show/${this.id}/earn`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          // this.form.reset();
          // this.onBack();
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onNext() {
    if(this.step === 1) {
      const citizenId: string = this.firstForm.get('citizenId')?.value;
      this.secondForm.get('citizenId')?.setValue(citizenId);
      this.postSearchCustomerByCid();
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
