import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CustomerModel, ICacutalateReturnResponse, ICarModal, IReturnObuResponse, ITollPlazaModel, ITollPlazaResponse, ResponseMessageModel, UserModel } from 'src/app/core/interfaces';
import { AuthenticationService, RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { convertStrToJson, formatDate, formatDateTime, getCustomerName } from 'src/app/features/utils/textUtils';
import { ConfirmCancelWithEmployeeIdComponent } from '../confirm-cancel-with-employee-id/confirm-cancel-with-employee-id.component';

@Component({
  selector: 'app-cancel-obu-modal',
  templateUrl: './cancel-obu-modal.component.html',
  styleUrl: './cancel-obu-modal.component.scss'
})
export class CancelObuModalComponent {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  // sixthForm: FormGroup;
  @Input() public customer!: CustomerModel;
  @Input() public carInfo!: ICarModal | any;
  @Input() public walletId!: number | string;
  @Input() public isType9: boolean = false;
  public step: number = 1;
  public today: Date = new Date();
  public user: UserModel | undefined;
  public selctionTollPlaza: ITollPlazaModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user?.subscribe(x => this.user = x);
    this.firstForm = this.formBuilder.group({
      date: new FormControl({ value: undefined, disabled: false }, Validators.required),
      fullnameWalletOwner: new FormControl({ value: undefined, disabled: true }, Validators.required),
      tollPlaza: new FormControl({ value: undefined, disabled: false }, Validators.required),
      isOwnerOperator: new FormControl(true, Validators.required),
      citizenId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      firstNameOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      lastNameOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      mobilePhoneOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      positionPhoneOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      isAgree: new FormControl(false, Validators.required),
    });

    this.secondForm = this.formBuilder.group({
      obuPayment: new FormControl(0),
      smartCardPayment: new FormControl(0),
      isObu: new FormControl(true),
      isSmartCard: new FormControl(true),
      obu: new FormControl({ value: undefined, disabled: true }, Validators.required),
      smartCard: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });

    this.thirdForm = this.formBuilder.group({
      walletBalance: new FormControl(300),
      cutMoneyWallet: new FormControl(0),
      walletBalanceAfterCut: new FormControl(0),
      totalAmountPaid: new FormControl(0),
    });

    this.fourthForm = this.formBuilder.group({
      isCash: new FormControl(true),
      dateTime: new FormControl({ value: undefined, disabled: false }, Validators.required),
    });

    this.fifthForm = this.formBuilder.group({
      attachment: new FormControl(undefined),
    });
  }
  ngOnInit() {
    this.firstForm.get('date')?.setValue(this.today);
    this.firstForm.get('fullnameWalletOwner')?.setValue(getCustomerName(this.customer));
    this.secondForm.get('obu')?.setValue(this.carInfo.faremediaValue);
    this.secondForm.get('smartCard')?.setValue(this.carInfo.walletSmartcardNo);
    this.fourthForm.get('date')?.setValue(this.today);
    console.log("carInfo => ", this.carInfo);
    console.log("customer => ", this.customer);
    this.modalDialogService.loading();
    this._loadTollPlaza().subscribe({
      next: (response) => {
        this.modalDialogService.hideLoading();
        this.selctionTollPlaza = response.data;
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      }
    });
    if (this.isType9) {
      this.firstForm.get('isOwnerOperator')?.disable();
      this.firstForm.get('tollPlaza')?.setValue('0000');
    }

  }
  onChangeOperator() {
    console.log("[onChangeOperator] isOwnerOperator => ", this.firstForm.get('isOwnerOperator')?.value);
    if (!this.firstForm.get('isOwnerOperator')?.value) {
      console.log("[onChangeOperator] enable");
      this.firstForm.get('citizenId')?.enable();
      this.firstForm.get('firstNameOperator')?.enable();
      this.firstForm.get('lastNameOperator')?.enable();
      this.firstForm.get('mobilePhoneOperator')?.enable();
      this.firstForm.get('positionPhoneOperator')?.enable();
    } else {
      console.log("[onChangeOperator] disable");
      this.firstForm.get('citizenId')?.disable();
      this.firstForm.get('firstNameOperator')?.disable();
      this.firstForm.get('lastNameOperator')?.disable();
      this.firstForm.get('mobilePhoneOperator')?.disable();
      this.firstForm.get('positionPhoneOperator')?.disable();
      this.firstForm.get('citizenId')?.setValue(undefined);
      this.firstForm.get('firstNameOperator')?.setValue(undefined);
      this.firstForm.get('lastNameOperator')?.setValue(undefined);
      this.firstForm.get('mobilePhoneOperator')?.setValue(undefined);
      this.firstForm.get('positionPhoneOperator')?.setValue(undefined);
    }
  }
  onCheckIsObu(event: any) {
    console.log("[onCheckIsObu] event => ", event.target.checked);
    if (!event.target.checked && !this.carInfo.isType9) {
      this.secondForm.get('obuPayment')?.setValue(300);
    } else {
      this.secondForm.get('obuPayment')?.setValue(0);
    }
  }

  onCheckIsSmartCard(event: any) {
    if (!event.target.checked && !this.carInfo.isType9) {
      this.secondForm.get('smartCardPayment')?.setValue(30);
    } else {
      this.secondForm.get('smartCardPayment')?.setValue(0);
    }
  }

  // amountPaymentFromWallet(): number {
  //   const walletBalance = this.thirdForm.get('walletBalance')?.value;
  //   const totalAmount = this.secondForm.get('obuPayment')?.value + this.secondForm.get('smartCardPayment')?.value;
  //   if (walletBalance >= totalAmount) {
  //     this.thirdForm.get('walletBalanceAfterCut')?.setValue(walletBalance);
  //     if (walletBalance > 0 && totalAmount > 0) {
  //       this.thirdForm.get('cutMoneyWallet')?.setValue(-totalAmount);
  //       const totalBalance = walletBalance - totalAmount;
  //       this.thirdForm.get('walletBalanceAfterCut')?.setValue(totalBalance);
  //     }
  //     this.thirdForm.get('totalAmountPaid')?.setValue(0);
  //   } else {
  //     this.thirdForm.get('cutMoneyWallet')?.setValue(-walletBalance);
  //     this.thirdForm.get('walletBalanceAfterCut')?.setValue(0);
  //     console.log(walletBalance - totalAmount);
  //     const totalAmountPaid: number = walletBalance - totalAmount;
  //     this.thirdForm.get('totalAmountPaid')?.setValue(Math.abs(totalAmountPaid));
  //   }
  //   return this.thirdForm.get('cutMoneyWallet')?.value
  // }
  fileTypeValidation(event: any) {
    const file = event.target.files[0];
    const fileType = file.type;
    console.log("fileType => ", fileType);
    if (fileType !== 'application/pdf') {
      // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', 'กรุณาเลือกไฟล์ PDF เท่านั้น');
      // event.target.value = '';
    }
    this.fifthForm.get('attachment')?.setValue(file);
  }

  onPreviousStep() {
    // console.log("[onPreviousStep] step => ", step);
    console.log("[onPreviousStep] step => ", this.step);
    this.step--;
    if (this.step === 0) {
      this.ngbActiveModal.close(false);
    } else if (this.step === 4 && this.thirdForm.get('totalAmountPaid')?.value === 0) {
      this.step = 3;
    }
    console.log("[onPreviousStep] step => ", this.step);
    // if (this.step === 2 && this.userInfoForm.get('identityType')?.value === 3) {
    //   this.step = 1;
    // }
  }

  onNextStep() {
    console.log("[onNextStep] step => ", this.step);
    this.step++;
    if (this.step === 4) {
      if (this.thirdForm.get('totalAmountPaid')?.value === 0) {
        this.step = 5;
      } else {
        this.fourthForm.get('dateTime')?.setValue(new Date());
      }
    }
    if (this.step === 3) {

      this.loadWalletBalance();

    }
    console.log("[onNextStep] step => ", this.step);
  }

  onClose() {
    window.location.reload();
  }

  onNext() {

  }
  loadWalletBalance() {
    this._fetchCalculateAmount().subscribe({
      next: (response) => {
        this.thirdForm.get('walletBalance')?.setValue(response.data.totalBalanceBefore);
        this.thirdForm.get('cutMoneyWallet')?.setValue(response.data.totalAmount - response.data.totalBillingAmount);
        this.thirdForm.get('walletBalanceAfterCut')?.setValue(response.data.totalBalanceAfter);
        this.thirdForm.get('totalAmountPaid')?.setValue(response.data.totalBillingAmount);
      },
      error: async (error) => {
        let errorText;
        errorText = error.body.throwableMessage;
        await this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', errorText);
        window.location.reload();
      }
    });
  }

  _fetchCalculateAmount() {
    const data = {
      isSmartCardReturn: this.secondForm.get('isSmartCard')?.value === true ? true : false,
      isObuReturn: this.secondForm.get('isObu')?.value === true ? true : false,
      walletId: this.walletId,
    };
    return this.restApiService.postBackOffice("faremedia/calculate-return-obu", data) as Observable<ICacutalateReturnResponse>;
  }
  async onSubmit() {
    if (this.step === 3 && this.thirdForm.get('totalAmountPaid')?.value === 0) {
      const modalRef = this.ngbModal.open(ConfirmCancelWithEmployeeIdComponent, {
        centered: true,
        backdrop: 'static',
        size: 'm',
        keyboard: false,
      });
      modalRef.componentInstance.title = 'ยกเลิก OBU';
      modalRef.componentInstance.onSubmitted = () => {
        this.modalDialogService.loading();
        this.fetchCancelObu().subscribe({
          next: async (response) => {
            this.modalDialogService.hideLoading();
            console.log("response => ", response);
            await this.modalDialogService.info('success', '#2255CE', 'ยกเลิก OBU สำเร็จ', 'ทำการสร้างคำร้องขอยกเลิก OBU ของท่านเรียบร้อยแล้ว');
            this.step = 5;
          },
          error: async (error) => {
            let errorText;
            this.modalDialogService.hideLoading();
            console.log("error => ", error);
            try { 
              errorText = error.body.throwableMessage != undefined ? error.body.throwableMessage : error.body.errorMessage;
            } catch (e) {
              errorText = error.error.throwableMessage != undefined ? error.body.throwableMessage : error.error.errorMessage;
            }
            var jsonMessage = this.convertStrToJsonErrorMsg(errorText);
            if (jsonMessage) {
              errorText = jsonMessage.error.data.message;
            }
            await this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', errorText);
            window.location.reload();
          }
        })
      };
    } else {
      await this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', 'ยอดเงินคงเหลือในกระเป๋าไม่เพียงพอ\n\nกรุณาเติมเงินในกระเป๋าก่อนทำการยกเลิก OBU');
      this.loadWalletBalance();
    }
  }
  fetchCancelObu() {

    const jsonData = {
      walletId: this.walletId?.toString() || "",
      isObuReturn: this.secondForm.get('isObu')?.value,
      isSmartCardReturn: this.secondForm.get('isSmartCard')?.value,
      ObuPan: this.secondForm.get('obu')?.value?.toString() || "",
      smartCardPan: this.secondForm.get('smartCard')?.value?.toString() || "",
      reqId: this.restApiService.generateUUID(),
      channelId: this.restApiService.getRequestParamChannelId(),
      isOwnerOperator: this.firstForm.get('isOwnerOperator')?.value,
      date: formatDate(this.firstForm.get('date')?.value) || "",
      citizenId: this.firstForm.get('citizenId')?.value || "",
      firstNameOperator: this.firstForm.get('firstNameOperator')?.value || "",
      lastNameOperator: this.firstForm.get('lastNameOperator')?.value || "",
      mobilePhoneOperator: this.firstForm.get('mobilePhoneOperator')?.value || "",
      positionPhoneOperator: this.firstForm.get('positionPhoneOperator')?.value || "",
      isCash: this.fourthForm.get('isCash')?.value,
      cashTime: formatDateTime(this.fourthForm.get('dateTime')?.value) || "",
      staffName: this.user?.username || "",
      tollPlaza: this.firstForm.get('tollPlaza')?.value || "",
      staffId: this.user?.username || ""
    };

    return this.restApiService.postBackOffice("faremedia/return-obu", jsonData) as Observable<IReturnObuResponse>;
  }

  _loadTollPlaza() {
    return this.restApiService.getBackOffice('master-data/toll-plaza') as Observable<ITollPlazaResponse>;
  }
  convertStrToJsonErrorMsg(message: string) {
    return convertStrToJson(message);
  }
  receipt(){

  }

  _loadReceipt() {
    var payload = {
      id: "FF2409253400000632",
    }
    return this.restApiService.postBackOffice("transaction-history/get-transaction", payload) as Observable<any>; 
  }
}
