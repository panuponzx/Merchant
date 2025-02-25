import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';
import { IAddPostpaidWalletRequest, ICarModal, IMasterDataResponse, IProvinceModal, IResponseProvinceModal } from 'src/app/core/interfaces';
import { TransformDatePipe } from 'src/app/core/pipes';

@Component({
  selector: 'app-add-wallet-modal',
  templateUrl: './add-wallet-modal.component.html',
  styleUrl: './add-wallet-modal.component.scss'
})
export class AddWalletModalComponent {

  public step: number = 1;
  public form: FormGroup;

  public obuForm: FormGroup;
  public fairmediaTypeList: IMasterDataResponse[] = [
    {
      "key": "1",
      "name": "OBU & SMARTCARD",
      "nameEN": "OBU & SMARTCARD"
    },
    {
      "key": "3",
      "name": "LICENSE_PLATE",
      "nameEN": "LICENSE_PLATE"
    },
    {
      "key": "4",
      "name": "RFID",
      "nameEN": "RFID"
    }
  ];
  public isFairmediaTypeLoading: boolean = false;
  public brandList: ICarModal[] = [];
  public isBrand: boolean = false;
  public provinceList: IProvinceModal[] = [];
  public isProvince: boolean = false;

  public walletType: number | undefined;
  public walletTypeList = [
    {
      lable: 'Prepaid (Top-up)',
      id: 1
    },
    {
      lable: 'non-toll (shop)',
      id: 7
    },
    // {
    //   lable: 'Direct credit card',
    //   id: 3
    // }
  ];
  @Input() customerId: string | null = null;
  @Input() customerTypeId: string | null = null;
  isLoading: boolean = false;
  @Input() customWalletType: any;
  @Input() fixedWalletType: any;
  constructor(
    public ngbActiveModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal,
    private transformDatePipe: TransformDatePipe
  ) {
    this.form = this.formBuilder.group({
      walletType: new FormControl(1, Validators.required),
      walletName: new FormControl('', Validators.required),
      creditLimit: new FormControl(''),
    });
    // this.form.get('walletType')?.setValue(2);
    // this.setWalletNameRequiredForm();
    // this.form.get('creditLimit')?.setValue(999);
    this.obuForm = this.formBuilder.group({
      fairmediaType: new FormControl(undefined, Validators.required),
      fullnameCarOwner: new FormControl(undefined),
      licensePlate: new FormControl(undefined, Validators.required),
      province: new FormControl(undefined, Validators.required),
      brand: new FormControl(undefined, Validators.required),
      model: new FormControl(undefined, Validators.required),
      yearRegistration: new FormControl(undefined, Validators.required),
      color: new FormControl(undefined, Validators.required),
      obuPan: new FormControl(undefined),
      smartcardNo: new FormControl(undefined),
      smartcardExpiryDate: new FormControl(undefined),
      rfidNo: new FormControl(undefined),
    });
  }

  ngOnInit() {
    console.log("[ngOnInit] customerId => ", this.customerId);
    console.log("[ngOnInit] customerTypeId => ", this.customerTypeId);
    if (this.customerTypeId === '3') {
      this.walletTypeList.push({
        lable: 'Postpaid (Billing)',
        id: 2
      })
    }
    if (this.customWalletType) {
      console.log("[AddWalletModalComponent] customWalletType => ", this.customWalletType);
      this.walletTypeList = this.customWalletType;
    }
    if (this.fixedWalletType) {
      console.log("[AddWalletModalComponent] fixedWalletType => ", this.fixedWalletType);
      this.form = this.formBuilder.group({
        walletType: new FormControl({ value: this.fixedWalletType, disabled: true }, Validators.required),
        walletName: new FormControl("", Validators.required),
      });
    }
  }

  updateObuFormValidators(itemType: string) {
    console.log("[updateValidators] itemType => ", itemType);
    const controlsToUpdate = [
      { controlName: 'obuPan', requiredFor: ['1'] },
      { controlName: 'smartcardNo', requiredFor: ['1'] },
      { controlName: 'smartcardExpiryDate', requiredFor: ['1'] },
      { controlName: 'rfidNo', requiredFor: ['4'] },
    ];
    controlsToUpdate.forEach(({ controlName, requiredFor }) => {
      const control = this.obuForm.get(controlName);
      if (requiredFor.includes(itemType)) {
        control?.setValidators(Validators.required);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });
  }

  getFairmediaType() {
    this.isFairmediaTypeLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/fairmedia-types`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.fairmediaTypeList = res.data;
        }
        this.isFairmediaTypeLoading = false;
      },
      error: (error) => {
        this.isFairmediaTypeLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  // brand select dropdown
  loadBrand() {
    this.isBrand = true;
    this.restApiService.getBackOfficeWithModel<ICarModal[]>('master-data/car-model').subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.brandList = res.data;
        }
        this.isBrand = false;
      },
      error: (error) => {
        this.isBrand = false;
        this.modalDialogService.handleError(error);
      }
    })
  }

  //province select dropdown
  loadProvince() {
    this.isProvince = true;
    this.restApiService.getBackOfficeWithModel<IProvinceModal[]>('master-data/province').subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.provinceList = res.data;
        }
        this.isProvince = false;
      },
      error: (error) => {
        this.isProvince = false;
        this.modalDialogService.handleError(error);
      }
    });
  }

  setWalletNameRequiredForm() {
    if (this.form.get('walletType')?.value && this.form.get('walletType')?.value === 2) {
      this.form?.get('walletName')?.clearValidators();
      this.form?.get('walletName')?.setValue(undefined);
      this.form?.get('walletName')?.updateValueAndValidity();
      this.form?.get('creditLimit')?.setValidators([Validators.required]);
      this.form?.get('creditLimit')?.setValue(undefined);
      this.form?.get('creditLimit')?.updateValueAndValidity();
    } else {
      this.form?.get('creditLimit')?.clearValidators();
      this.form?.get('creditLimit')?.setValue(undefined);
      this.form?.get('creditLimit')?.updateValueAndValidity();
      this.form?.get('walletName')?.setValidators([Validators.required]);
      this.form?.get('walletName')?.setValue(undefined);
      this.form?.get('walletName')?.updateValueAndValidity();
    }
  }

  onAddWallet() {
    this.isLoading = true;
    this.modalDialogService.loading();
    const data = {
      customer: {
        id: this.customerId,
        customerTypeId: this.customerTypeId,
      },
      wallet: {
        walletTypeId: this.form.get('walletType')?.value,
        walletName: this.form.get('walletName')?.value,
      }
    };
    console.log("[onAddWallet] data => ", data);
    this.restApiService
      .postBackOffice('wallet/add-wallet', data)
      .pipe(
        first(),
        map(res => res as any)
      ).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          if (res.errorMessage === "Success") {
            console.log("[onSubmit] res => ", res);
            this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การเพิ่มกระเป๋าสำเร็จ');
            // this.router.navigate(['work-space/menu-option']);
            this.ngbActiveModal.close(true);
          } else {
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          this.isLoading = false;
          console.error(err);
          this.modalDialogService.handleError(err);
          // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage ? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      })
  }

  postAddPostpaidWallet() {
    const smartcardExpiryDate = new Date(this.obuForm.get('smartcardExpiryDate')?.value);
    smartcardExpiryDate.setHours(0, 0, 0, 0);
    const smartcardExpiryDateNewFormat: string = String(this.transformDatePipe.transform(smartcardExpiryDate, 'YYYY-MM-DD'));
    const payload: IAddPostpaidWalletRequest = {
      customerId: this.customerId ? this.customerId : '',
      walletTypeId: 6,
      creditLimit: this.form.get('creditLimit')?.value,
      car: {
        brand: this.obuForm.get('brand')?.value,
        model: this.obuForm.get('model')?.value,
        color: this.obuForm.get('color')?.value,
        province: this.obuForm.get('province')?.value,
        yearRegistration: this.obuForm.get('yearRegistration')?.value,
        licensePlate: this.obuForm.get('licensePlate')?.value,
      },
      ...(
        this.obuForm.get('fairmediaType')?.value === '1' ? {
          obu: {
            obuPan: this.obuForm.get('obuPan')?.value,
            smartcardNo: this.obuForm.get('smartcardNo')?.value,
            smartcardExpiryDate: smartcardExpiryDateNewFormat,
          },
        } : {}
      ),
      ...(
        this.obuForm.get('fairmediaType')?.value === '4' ? {
          rfid: {
            no: this.obuForm.get('rfidNo')?.value,
          },
        } : {}
      ),
      opt: {
        addRfid: this.obuForm.get('fairmediaType')?.value === '4' ? true : false,
        addObu: this.obuForm.get('fairmediaType')?.value === '1' ? true : false,
        addSmartCard: this.obuForm.get('fairmediaType')?.value === '1' ? true : false,
        addLicensePlate: this.obuForm.get('fairmediaType')?.value === '3' ? true : false,
      },
      requestParam: {
        reqId: this.restApiService.generateUUID(),
        channelId: 4
      }
    }
    console.log("[postAddPostpaidWallet] => ", payload);
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<IAddPostpaidWalletRequest, any>(`wallet/add-postpaid-wallet`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          console.log("[onSubmit] res => ", res);
          this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การเพิ่มกระเป๋าสำเร็จ');
          this.ngbActiveModal.close(true);
        } else {
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
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
    if (this.step === 1) {
      this.loadBrand();
      this.loadProvince();
      // this.getFairmediaType();
    }
    this.step++;
  }

  onBack() {
    this.step--;
  }

  onConnectVisa() {
    this.postAddPostpaidWallet();
  }

  onChangeWalletType(event: any) {
    console.log("[onChangeWalletType] event => ", event);
    this.setWalletNameRequiredForm();
  }

  onChangeFairmediaType(value: string) {
    this.updateObuFormValidators(value);
  }

  onClose() {
    this.ngbActiveModal.dismiss(true);
  }

}
