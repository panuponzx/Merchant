import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomColumnModel, CustomerModel, IPrefixModel, RowActionEventModel } from '../../../../../../../../core/interfaces';
import { Observable, Subject, distinctUntilChanged, of, switchMap } from 'rxjs';
import { RestApiService } from '../../../../../../../../core/services';
import { TransformDatePipe } from '../../../../../../../../core/pipes';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectPendingRequestModalComponent } from '../../modals/reject-pending-request-modal/reject-pending-request-modal.component';
import { AddressTypeEnum } from 'src/app/core/enum/address.enum';
import prefixData from 'src/assets/data/prefix.json';

export const PendingRequestEventType = {
  addJuristic: 1,
}

export const PendingRequestStatus = {
  waiting: 0,
  approve: 1,
  reject: 2,
}

export interface IPendingRequest {
  type: number,
  status: number,
}
@Component({
  selector: 'approval-management-approval',
  templateUrl: './approval-management-approval.component.html',
  styleUrl: './approval-management-approval.component.scss'
})
export class ApprovalManagementApprovalComponent {
  @Input() public tempSearch: any | undefined;
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'paging-no' },
    { id: 'createDate', name: 'Create Date', label: 'วันที่ และ เวลา ที่สร้าง', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'DD/MM/YYYY HH:mm:ss', locale: 'th' } },
    { id: 'userName', name: 'User Name', label: 'ชื่อผู้ใช้', prop: 'eventValue.customer.corporateName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'corporateBranch', name: 'CorporateBranch', label: 'ชื่อสาขา', prop: 'eventValue.customer.corporateBranch', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'branchId', name: 'BranchId', label: 'หมายเลขสาขาย่อย', prop: 'eventValue.customer.branchId', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'status', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'approve-status' },
    { id: 'nameEmpTransaction', name: 'Name Emp Transaction', label: 'ชื่อพนักงานทำรายการ', prop: 'eventValue.customer.fullName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public rows: any = [];
  public tempRows: any = [];

  public isLoading: boolean = false;

  public customer: CustomerModel | undefined;
  public form!: FormGroup;
  public isShowDescription: boolean = false;
  public rowDescription: any = {};

  public detailInformationTab: string | 'information-company' | 'information-visitor' = 'information-visitor';
  public activeAddressTab: string | undefined;

  public minDate: Date = new Date();

  public pendingRequest: IPendingRequest = {
    type: 0,
    status: 0
  };

  public branchList: any[] = [
    {
      label: 'สาขาใหญ่',
      id: 1
    },
    {
      label: 'สาขาย่อย',
      id: 2
    },
  ];

  public prefixList: IPrefixModel[] = prefixData;
  prefixList$: Observable<IPrefixModel[]> = of([]);

  @Input() set setPendingStatus(data: IPendingRequest) {
    console.log("[setPendingStatus] event => ", data);
    this.pendingRequest = {
      type: data.type,
      status: data.status,
    };
    this.loadPendingRequest(data.type, data.status);
  };

  @Output() hiddenFillterMenu: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    private transformDatePipe: TransformDatePipe,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal
  ) {
    
    this.form = this.formBuilder.group({
      id: new FormControl({ value: undefined, disabled: true }, Validators.required),
      citizenDocId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      pictures: new FormControl({ value: undefined, disabled: true }, Validators.required),
      citizenId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      cardExpDate: new FormControl({ value: undefined, disabled: true }, Validators.required),
      gender: new FormControl({ value: 'M', disabled: true }, Validators.required),
      prefix: new FormControl({ value: undefined, disabled: true }, Validators.required),
      firstName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      lastName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      birthdate: new FormControl({ value: undefined, disabled: true }, Validators.required),
      mobilePhone: new FormControl({ value: undefined, disabled: true }, Validators.required),
      taxId: new FormControl({ value: undefined, disabled: true }, Validators.required),
      companyName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      branch: new FormControl({ value: undefined, disabled: true }, Validators.required),
      branchName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      branchNo: new FormControl({ value: undefined, disabled: true }, Validators.required),
      phone: new FormControl({ value: undefined, disabled: true }, Validators.required),
      email: new FormControl({ value: undefined, disabled: true }, Validators.required),
      work_address: new FormGroup({
        typeId: new FormControl(undefined),
        addressNo: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
        building: new FormControl({ value: undefined, disabled: true }),
        floor: new FormControl({ value: undefined, disabled: true }),
        villageNo: new FormControl({ value: undefined, disabled: true }),
        village: new FormControl({ value: undefined, disabled: true }),
        alley: new FormControl({ value: undefined, disabled: true }),
        soi: new FormControl({ value: undefined, disabled: true }),
        street: new FormControl({ value: undefined, disabled: true }),
        zipcode: new FormControl({ value: undefined, disabled: true }, Validators.required),
        subdistrictCode: new FormControl({ value: undefined, disabled: true }, Validators.required),
        subdistrictName: new FormControl({ value: undefined, disabled: true }, Validators.required),
        districtCode: new FormControl({ value: undefined, disabled: true }, Validators.required),
        districtName: new FormControl({ value: undefined, disabled: true }, Validators.required),
        provinceCode: new FormControl({ value: undefined, disabled: true }, Validators.required),
        provinceName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      }),
      etax_address: new FormGroup({
        typeId: new FormControl(undefined),
        addressNo: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
        building: new FormControl({ value: undefined, disabled: true }),
        floor: new FormControl({ value: undefined, disabled: true }),
        villageNo: new FormControl({ value: undefined, disabled: true }),
        village: new FormControl({ value: undefined, disabled: true }),
        alley: new FormControl({ value: undefined, disabled: true }),
        soi: new FormControl({ value: undefined, disabled: true }),
        street: new FormControl({ value: undefined, disabled: true }),
        zipcode: new FormControl({ value: undefined, disabled: true }, Validators.required),
        subdistrictCode: new FormControl({ value: undefined, disabled: true }, Validators.required),
        subdistrictName: new FormControl({ value: undefined, disabled: true }, Validators.required),
        districtCode: new FormControl({ value: undefined, disabled: true }, Validators.required),
        districtName: new FormControl({ value: undefined, disabled: true }, Validators.required),
        provinceCode: new FormControl({ value: undefined, disabled: true }, Validators.required),
        provinceName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      }),
    });
    // this.tempRows = this.rows;
    // this.collectionSize = this.rows.length;
  }

  loadPendingRequest(type: number, status: number, page: number = 1) {
    const data = {
      // page: 1,
      page: page,
      content: {
        eventType: type,
        status: status,
      }
    };
    this.isLoading = true;
    this.modalDialogService.loading();
    this.restApiService.postBackOffice('pending-request/get', data).subscribe({
      next: (res: any) => {
        console.log("[onSubmit] res => ", res);
        if (res.errorMessage === "Success") {
          console.log("[onSubmit] res => ", res);
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].eventValue.customer.fullName = res.data[i].eventValue.customer.firstName + ' ' + res.data[i].eventValue.customer.lastName;
          }
          this.rows = res.data,
            this.tempRows = this.rows;
          this.collectionSize = res.totalData;
        } else {
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
        }
        this.isLoading = false;
        this.modalDialogService.hideLoading();
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        this.isLoading = false;
        console.error(err);
        this.modalDialogService.handleError(err);
        // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
      }
    })

  }

  onChangePage(event: number) {
    this.pages = event;
    // console.log("[onChangePage] event => ", event);
    this.loadPendingRequest(this.pendingRequest.type, this.pendingRequest.status, event);
  }

  onChangeBranch(event: any) {
    console.log("[onChangeBranch] event => ", event);
    this.setDisableBranch(event.id);
  }

  setDisableBranch(branchId: number) {
    if (branchId === 1) {
      this.form.get('branchName')?.setValue('สาขาใหญ่');
      this.form.get('branchNo')?.setValue('00000');
      // this.form.get('branchName')?.disable();
      // this.form.get('branchNo')?.disable();
    } else if (branchId === 2) {
      // this.form.get('branchName')?.setValue('');
      // this.form.get('branchNo')?.setValue('');
      // this.form.get('branchName')?.enable();
      // this.form.get('branchNo')?.enable();
    }
  }


  onAction(event: RowActionEventModel) {
    console.info(event);
    console.log("[onAction] form => ", this.form.value);
    this.onCheckPrefix(event.row.eventValue.customer.title);
    this.prefixList$ = of(this.prefixList);
    this.form.get('id')?.setValue(event.row.id);
    this.form.get('citizenDocId')?.setValue(event.row.eventValue.customer.citizenDocId);
    this.form.get('pictures')?.setValue(event.row.eventValue.customer.pictures);
    this.form.get('taxId')?.setValue(event.row.eventValue.customer.taxId);
    this.form.get('companyName')?.setValue(event.row.eventValue.customer.corporateName);
    this.form.get('branch')?.setValue(event.row.eventValue.customer.branchTypeId);
    this.form.get('branchName')?.setValue(event.row.eventValue.customer.corporateBranch);
    this.form.get('branchNo')?.setValue(event.row.eventValue.customer.branchId);
    this.form.get('citizenId')?.setValue(event.row.eventValue.customer.citizenId);
    // this.form.get('cardExpDate')?.setValue(new Date(event.row.eventValue.customer.cardExpDate));
    this.form.get('gender')?.setValue(event.row.eventValue.customer.gender);
    this.form.get('prefix')?.setValue(event.row.eventValue.customer.title);
    this.form.get('firstName')?.setValue(event.row.eventValue.customer.firstName);
    this.form.get('lastName')?.setValue(event.row.eventValue.customer.lastName);
    this.form.get('birthdate')?.setValue(new Date(event.row.eventValue.customer.birthdate));
    this.form.get('mobilePhone')?.setValue(event.row.eventValue.customer.mobilePhone);
    // TODO
    // this.form.get('phone')?.setValue(event.row.eventValue.customer.phone);
    this.form.get('email')?.setValue(event.row.eventValue.customer.email);
    this.setDisableBranch(event.row.eventValue.customer.branchTypeId);
    event.row.eventValue.addresses.forEach((x: any) => {
      if (Number(x.typeId) === AddressTypeEnum.COMPANY) {
        // this.zipcodeChanged.next(x.zipcode);
        this.form.get('work_address')?.get('typeId')?.setValue(x.typeId);
        this.form.get('work_address')?.get('addressNo')?.setValue(x.addressNo);
        this.form.get('work_address')?.get('building')?.setValue(x.building);
        this.form.get('work_address')?.get('floor')?.setValue(x.floor);
        this.form.get('work_address')?.get('villageNo')?.setValue(x.villageNo);
        this.form.get('work_address')?.get('village')?.setValue(x.village);
        this.form.get('work_address')?.get('alley')?.setValue(x.alley);
        this.form.get('work_address')?.get('soi')?.setValue(x.soi);
        this.form.get('work_address')?.get('street')?.setValue(x.street);
        this.form.get('work_address')?.get('zipcode')?.setValue(x.zipcode);
        this.form.get('work_address')?.get('subdistrictCode')?.setValue(Number(x.subdistrictCode));
        // this.form.get('work_address')?.get('subdistrictName')?.setValue(x.subdistrictCode);
        this.form.get('work_address')?.get('districtCode')?.setValue(Number(x.districtCode));
        // this.form.get('work_address')?.get('districtName')?.setValue(x.districtCode);
        this.form.get('work_address')?.get('provinceCode')?.setValue(Number(x.provinceCode));
        // this.form.get('work_address')?.get('provinceName')?.setValue(x.provinceCode);
      }
      if(Number(x.typeId) === AddressTypeEnum.ETAX) {
        this.form.get('etax_address')?.get('typeId')?.setValue(x.typeId);
        this.form.get('etax_address')?.get('addressNo')?.setValue(x.addressNo);
        this.form.get('etax_address')?.get('building')?.setValue(x.building);
        this.form.get('etax_address')?.get('floor')?.setValue(x.floor);
        this.form.get('etax_address')?.get('villageNo')?.setValue(x.villageNo);
        this.form.get('etax_address')?.get('village')?.setValue(x.village);
        this.form.get('etax_address')?.get('alley')?.setValue(x.alley);
        this.form.get('etax_address')?.get('soi')?.setValue(x.soi);
        this.form.get('etax_address')?.get('street')?.setValue(x.street);
        this.form.get('etax_address')?.get('zipcode')?.setValue(x.zipcode);
        this.form.get('etax_address')?.get('subdistrictCode')?.setValue(Number(x.subdistrictCode));
        // this.form.get('etax_address')?.get('subdistrictName')?.setValue(x.subdistrictCode);
        this.form.get('etax_address')?.get('districtCode')?.setValue(Number(x.districtCode));
        // this.form.get('etax_address')?.get('districtName')?.setValue(x.districtCode);
        this.form.get('etax_address')?.get('provinceCode')?.setValue(Number(x.provinceCode));
        // this.form.get('etax_address')?.get('provinceName')?.setValue(x.provinceCode);
        // this.zipcodeChanged.next(x.zipcode);
      }
    });
    // this.form.get('cardExpDate')?.setValue(event.row.eventValue.customer.cardExpDate);
    // console.log("[onAction] form => ", this.form.value);
    this.rowDescription = event.row;
    this.hiddenFillterMenu.emit(true);
    this.isShowDescription = true;
  }

  onBack() {
    // this.zipcodeChanged.unsubscribe();
    this.form.reset();
    this.isShowDescription = false;
    this.hiddenFillterMenu.emit(false);
  }

  onApprove() {
    // const cardExpDateFormat = this.transformDatePipe.transform(this.form.get('cardExpDate')?.value, 'YYYY-MM-DD');
    const birthDateFormat = this.transformDatePipe.transform(this.form.get('birthdate')?.value, 'YYYY-MM-DD');
    // const addressProvince = this.form.get('province')?.value;
    // const addressDistrict = this.form.get('district')?.value;
    // const addressSubDistrict = this.form.get('subDistrict')?.value;
    const eventValue = {
      customer: {
        customerTypeId: 2,
        title: 'นาย',
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        mobilePhone: this.form.get('mobilePhone')?.value,
        citizenDocId: this.form.get('citizenDocId')?.value,
        citizenId: this.form.get('citizenId')?.value,
        // cardExpDate: cardExpDateFormat,
        birthdate: birthDateFormat,
        // occupation: this.occupationDetailForm.get('occupation')?.value,
        gender: this.form.get('gender')?.value,
        taxId: this.form.get('taxId')?.value,
        corporateName: this.form.get('companyName')?.value,
        branchTypeId: this.form.get('branch')?.value,
        corporateBranch: this.form.get('branchName')?.value,
        branchId: this.form.get('branchNo')?.value,
        pictures: this.form.get('pictures')?.value,
      },
      addresses: [
        {
          typeId: AddressTypeEnum.COMPANY,
          addressNo: this.form.get('work_address')?.get('addressNo')?.value,
          building: this.form.get('work_address')?.get('building')?.value,
          floor: this.form.get('work_address')?.get('floor')?.value,
          villageNo: this.form.get('work_address')?.get('villageNo')?.value,
          village: this.form.get('work_address')?.get('village')?.value,
          alley: this.form.get('work_address')?.get('alley')?.value,
          soi: this.form.get('work_address')?.get('soi')?.value,
          street: this.form.get('work_address')?.get('street')?.value,
          provinceCode: this.form.get('work_address')?.get('provinceCode')?.value,
          provinceName: this.form.get('work_address')?.get('provinceName')?.value,
          districtCode: this.form.get('work_address')?.get('districtCode')?.value,
          districtName: this.form.get('work_address')?.get('districtName')?.value,
          subdistrictCode: this.form.get('work_address')?.get('subdistrictCode')?.value,
          subdistrictName: this.form.get('work_address')?.get('subdistrictName')?.value,
          zipcode: this.form.get('work_address')?.get('zipcode')?.value,
        },
        {
          typeId: AddressTypeEnum.ETAX,
          addressNo: this.form.get('etax_address')?.get('addressNo')?.value,
          building: this.form.get('etax_address')?.get('building')?.value,
          floor: this.form.get('etax_address')?.get('floor')?.value,
          villageNo: this.form.get('etax_address')?.get('villageNo')?.value,
          village: this.form.get('etax_address')?.get('village')?.value,
          alley: this.form.get('etax_address')?.get('alley')?.value,
          soi: this.form.get('etax_address')?.get('soi')?.value,
          street: this.form.get('etax_address')?.get('street')?.value,
          provinceCode: this.form.get('etax_address')?.get('provinceCode')?.value,
          provinceName: this.form.get('etax_address')?.get('provinceName')?.value,
          districtCode: this.form.get('etax_address')?.get('districtCode')?.value,
          districtName: this.form.get('etax_address')?.get('districtName')?.value,
          subdistrictCode: this.form.get('etax_address')?.get('subdistrictCode')?.value,
          subdistrictName: this.form.get('etax_address')?.get('subdistrictName')?.value,
          zipcode: this.form.get('etax_address')?.get('zipcode')?.value,
        }
      ]
    };
    const data = {
      content: {
        id: this.form.get('id')?.value,
        eventType: PendingRequestEventType.addJuristic,
        eventValue: JSON.stringify(eventValue),
        status: PendingRequestStatus.waiting,
        channel_id: 4
      }
    };
    console.log("[onApprove] eventValue => ", eventValue);
    console.log("[onApprove] data => ", data);
    this.modalDialogService.loading();
    this.restApiService.postBackOffice('pending-request/approve', data).subscribe({
      next: (res: any) => {
        console.log("[onApprove] res => ", res);
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          console.log("[onApprove] res => ", res);
          this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การอนุมัติสำเร็จ');
          this.loadPendingRequest(this.pendingRequest.type, this.pendingRequest.status);
          this.onBack();
        } else {
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
        }

      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        console.error(err);
        this.modalDialogService.handleError(err);
        // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        if (err.body?.throwableMessage?.toLowerCase().includes('failed to update')) {
          this.loadPendingRequest(this.pendingRequest.type, this.pendingRequest.status);
          this.onBack();
        }
      }
    })
  }

  onReject() {
    // const cardExpDateFormat = this.transformDatePipe.transform(this.form.get('cardExpDate')?.value, 'YYYY-MM-DD');
    const birthDateFormat = this.transformDatePipe.transform(this.form.get('birthdate')?.value, 'YYYY-MM-DD');
    const addressProvince = this.form.get('province')?.value;
    const addressDistrict = this.form.get('district')?.value;
    const addressSubDistrict = this.form.get('subDistrict')?.value;
    const eventValue = {
      customer: {
        customerTypeId: 2,
        title: 'นาย',
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        mobilePhone: this.form.get('mobilePhone')?.value,
        citizenDocId: this.form.get('citizenDocId')?.value,
        citizenId: this.form.get('citizenId')?.value,
        // cardExpDate: cardExpDateFormat,
        birthdate: birthDateFormat,
        // occupation: this.occupationDetailForm.get('occupation')?.value,
        gender: this.form.get('gender')?.value,
        taxId: this.form.get('taxId')?.value,
        corporateName: this.form.get('companyName')?.value,
        branchTypeId: this.form.get('branch')?.value,
        corporateBranch: this.form.get('branchName')?.value,
        branchId: this.form.get('branchNo')?.value,
        pictures: this.form.get('pictures')?.value,
      },
      addresses: [
        {
          typeId: AddressTypeEnum.COMPANY,
          addressNo: this.form.get('work_address')?.get('addressNo')?.value,
          building: this.form.get('work_address')?.get('building')?.value,
          floor: this.form.get('work_address')?.get('floor')?.value,
          villageNo: this.form.get('work_address')?.get('villageNo')?.value,
          village: this.form.get('work_address')?.get('village')?.value,
          alley: this.form.get('work_address')?.get('alley')?.value,
          soi: this.form.get('work_address')?.get('soi')?.value,
          street: this.form.get('work_address')?.get('street')?.value,
          provinceCode: this.form.get('work_address')?.get('provinceCode')?.value,
          provinceName: this.form.get('work_address')?.get('provinceName')?.value,
          districtCode: this.form.get('work_address')?.get('districtCode')?.value,
          districtName: this.form.get('work_address')?.get('districtName')?.value,
          subdistrictCode: this.form.get('work_address')?.get('subdistrictCode')?.value,
          subdistrictName: this.form.get('work_address')?.get('subdistrictName')?.value,
          zipcode: this.form.get('work_address')?.get('zipcode')?.value,
        },
        {
          typeId:AddressTypeEnum.ETAX,
          addressNo: this.form.get('etax_address')?.get('addressNo')?.value,
          building: this.form.get('etax_address')?.get('building')?.value,
          floor: this.form.get('etax_address')?.get('floor')?.value,
          villageNo: this.form.get('etax_address')?.get('villageNo')?.value,
          village: this.form.get('etax_address')?.get('village')?.value,
          alley: this.form.get('etax_address')?.get('alley')?.value,
          soi: this.form.get('etax_address')?.get('soi')?.value,
          street: this.form.get('etax_address')?.get('street')?.value,
          provinceCode: this.form.get('etax_address')?.get('provinceCode')?.value,
          provinceName: this.form.get('etax_address')?.get('provinceName')?.value,
          districtCode: this.form.get('etax_address')?.get('districtCode')?.value,
          districtName: this.form.get('etax_address')?.get('districtName')?.value,
          subdistrictCode: this.form.get('etax_address')?.get('subdistrictCode')?.value,
          subdistrictName: this.form.get('etax_address')?.get('subdistrictName')?.value,
          zipcode: this.form.get('etax_address')?.get('zipcode')?.value,
        }
      ]
    };
    const data = {
      content: {
        id: this.form.get('id')?.value,
        eventType: PendingRequestEventType.addJuristic,
        eventValue: JSON.stringify(eventValue),
        status: PendingRequestStatus.waiting,
        channel_id: 4
      }
    };
    console.log("[onReject] eventValue => ", eventValue);
    console.log("[onReject] data => ", data);
    const modalRef = this.ngbModal.open(RejectPendingRequestModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.data = data;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.loadPendingRequest(this.pendingRequest.type, this.pendingRequest.status);
          this.onBack();
        }
      }
    );
  }

  onDownloadAttachment() {
    this.modalDialogService.loading();
    const picturesId = JSON.parse(this.form.get('pictures')?.value);
    console.log("[onDownloadAttachment] ", picturesId);
    this.restApiService.getFileBackOffice(`attachment/pending-customer-attachment/${picturesId[0].id}/file`).subscribe({
      next: (res: any) => {
        // console.log("[onDownloadAttachment] res => ", res);
        this.modalDialogService.hideLoading();
        if (res.status === 200) {
          console.log("[onDownloadAttachment] res => ", res);
          let blob: Blob = res.body;
          let a = document.createElement('a');
          a.download = picturesId[0].originalFileName;;
          a.href = window.URL.createObjectURL(blob);
          a.click();
          this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'ดาวน์โหลดไฟล์สำเร็จ');
        } else {
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
        }

      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        console.error(err);
        this.modalDialogService.handleError(err);
        // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
      }
    })
  }

  addTagPrefixPromise(name: string) {
    return new Promise((resolve) => {
      resolve({
        label: name,
        value: name
      })
    });
  }

  onCheckPrefix(prefix: string | null | undefined) {
    if (!prefix) return;
    const foundPrefix = this.prefixList.find((element) => element.value === prefix);
    if (!foundPrefix) {
      this.prefixList.push({
        label: prefix,
        value: prefix
      });
    }
  }

}
