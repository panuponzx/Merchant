import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomColumnModel, CustomerModel, RowActionEventModel } from '../../../../../../../../core/interfaces';
import { Subject, distinctUntilChanged, of, switchMap } from 'rxjs';
import { RestApiService } from '../../../../../../../../core/services';
import { TransformDatePipe } from '../../../../../../../../core/pipes';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectPendingRequestModalComponent } from '../../modals/reject-pending-request-modal/reject-pending-request-modal.component';

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
    { id: 'createDate', name: 'Create Date', label: 'วันที่ และ เวลา ที่สร้าง', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'DD/MM/YYYY HH:mm:ss', locale: 'th' } },
    { id: 'userName', name: 'User Name', label: 'ชื่อผู้ใช้', prop: 'eventValue.customer.corporateName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
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
  public minDate: Date = new Date();

  public postalCodeChanged = new Subject<string>();
  public postalCodeList: any = [];
  public subDistrictList: any = [];
  public districtList: any = [];
  public provinceList: any = [];

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
    this.postalCodeChanged.pipe(switchMap((searchText: any) => {
      console.log("[subscribe] res => ", searchText);
      if (searchText.length === 5) {
        return this.restApiService.get(`zip-code/code/${searchText}`);
      } else {
        return of([]);
      }
    })).subscribe(async (res: any) => {
      console.log("[subscribe] res => ", res);
      this.postalCodeList = await res.zipCodes;
      console.log("[subscribe] res => ", this.postalCodeList);
      // debugger;
      if (this.postalCodeList && this.postalCodeList.length === 0 || res && Object.keys(res).length === 0) {
        this.form.get('subDistrict')?.disable();
        this.form.get('subDistrict')?.setValue(undefined);
        this.form.get('district')?.setValue(undefined);
        this.form.get('province')?.setValue(undefined);
      } else {
        this.form.get('subDistrict')?.enable();
        const district: string = this.form.get('district')?.value;
        const subDistrict: string = this.form.get('subDistrict')?.value;
        if (this.form.get('subDistrict')?.value) {
          const dd = this.postalCodeList.find((res: any) => res.districtId === Number(district) && res.subdistrict.id === Number(subDistrict));
          console.log("[subscribe] dd => ", dd);
          this.form.get('subDistrict')?.setValue(dd);
          this.districtList = [dd.subdistrict.district];
          this.provinceList = [dd.subdistrict.district.province];
          this.form.get('district')?.setValue(dd.subdistrict.district);
          this.form.get('province')?.setValue(dd.subdistrict.district.province);
        }
      };
    });

    this.form = this.formBuilder.group({
      id: new FormControl({ value: undefined, disabled: false }, Validators.required),
      citizenDocId: new FormControl({ value: undefined, disabled: false }, Validators.required),
      pictures: new FormControl({ value: undefined, disabled: false }, Validators.required),
      citizenId: new FormControl({ value: undefined, disabled: false }, Validators.required),
      cardExpDate: new FormControl({ value: undefined, disabled: false }, Validators.required),
      gender: new FormControl({ value: 'M', disabled: false }, Validators.required),
      firstName: new FormControl({ value: undefined, disabled: false }, Validators.required),
      lastName: new FormControl({ value: undefined, disabled: false }, Validators.required),
      birthdate: new FormControl({ value: undefined, disabled: false }, Validators.required),
      phone: new FormControl({ value: undefined, disabled: false }, Validators.required),
      // firstName: new FormControl({value: undefined, disabled: false}, Validators.required),
      taxId: new FormControl({ value: undefined, disabled: false }, Validators.required),
      companyName: new FormControl({ value: undefined, disabled: false }, Validators.required),
      branch: new FormControl({ value: undefined, disabled: false }, Validators.required),
      branchName: new FormControl({ value: undefined, disabled: false }, Validators.required),
      branchNo: new FormControl({ value: undefined, disabled: false }, Validators.required),
      companyNumber: new FormControl({ value: undefined, disabled: false }, Validators.required),
      // firstName: new FormControl({value: undefined, disabled: false}, Validators.required),
      addressNo: new FormControl({ value: undefined, disabled: false }, Validators.required),
      building: new FormControl(undefined),
      floor: new FormControl(undefined),
      villageNo: new FormControl(undefined),
      village: new FormControl(undefined),
      alley: new FormControl(undefined),
      soi: new FormControl(undefined),
      street: new FormControl(undefined),
      postalCode: new FormControl({ value: undefined, disabled: false }, Validators.required),
      subDistrict: new FormControl({ value: undefined, disabled: false }, Validators.required),
      district: new FormControl({ value: undefined, disabled: false }, Validators.required),
      province: new FormControl({ value: undefined, disabled: false }, Validators.required),
    });
    this.rows = [
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
    ];
    // this.tempRows = this.rows;
    // this.collectionSize = this.rows.length;
    this.customer = {
      id: "c00000006",
      customerTypeId: 1,
      customerTypeName: "Personal",
      title: "นาย",
      firstName: "ทดสอบจำนวนตัวอักษร",
      lastName: "ตัวหนังสือที่ยาวมาก",
      mobilePhone: "0098998098",
      citizenId: "5432178998791",
      channelId: 100,
      gender: "M",
      cardExpDate: "2024-03-30",
      birthdate: "2023-10-09",
      occupation: "พนักงานบริษัท",
      status: 1,
      createDate: "2024-02-27T01:07:16.062+00:00",
      citizenDocId: 1,
      taxId: "1234567890123",
      branchTypeId: 0,
      firstNameEng: '',
      email: ''
    }
  }

  loadPendingRequest(type: number, status: number) {
    const data = {
      page: 1,
      requestParam: {
        channelId: 4,
        reqId: 1712915977405
      },
      content: {
        eventType: type,
        status: status,
      }
    };
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
        this.modalDialogService.hideLoading();
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        console.error(err);
      }
    })

  }

  onKeyUpPostalCode(event: any) {
    this.postalCodeChanged.next(event.target.value);
  }

  onChangeSubDistrict(even: any) {
    console.log("[onChangeSubDistrict] even => ", even);
    this.districtList = [even.subdistrict.district];
    this.provinceList = [even.subdistrict.district.province];
    this.form.get('district')?.setValue(this.districtList[0]);
    this.form.get('province')?.setValue(this.provinceList[0]);
  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onChangeBranch(event: any) {
    console.log("[onChangeBranch] event => ", event);
    this.setDisableBranch(event.id);
  }

  setDisableBranch(branchId: number) {
    if (branchId === 1) {
      this.form.get('branchName')?.setValue('สาขาใหญ่');
      this.form.get('branchNo')?.setValue('00000');
      this.form.get('branchName')?.disable();
      this.form.get('branchNo')?.disable();
    } else if (branchId === 2) {
      // this.form.get('branchName')?.setValue('');
      // this.form.get('branchNo')?.setValue('');
      this.form.get('branchName')?.enable();
      this.form.get('branchNo')?.enable();
    }
  }


  onAction(event: RowActionEventModel) {
    console.info(event);
    console.log("[onAction] form => ", this.form.value);
    this.isShowDescription = true;
    this.form.get('id')?.setValue(event.row.id);
    this.form.get('citizenDocId')?.setValue(event.row.eventValue.customer.citizenDocId);
    this.form.get('pictures')?.setValue(event.row.eventValue.customer.pictures);
    this.form.get('taxId')?.setValue(event.row.eventValue.customer.taxId);
    this.form.get('companyName')?.setValue(event.row.eventValue.customer.corporateName);
    this.form.get('branch')?.setValue(event.row.eventValue.customer.branchTypeId);
    this.form.get('branchName')?.setValue(event.row.eventValue.customer.corporateBranch);
    this.form.get('branchNo')?.setValue(event.row.eventValue.customer.branchId);
    this.form.get('citizenId')?.setValue(event.row.eventValue.customer.citizenId);
    this.form.get('cardExpDate')?.setValue(new Date(event.row.eventValue.customer.cardExpDate));
    this.form.get('gender')?.setValue(event.row.eventValue.customer.gender);
    this.form.get('firstName')?.setValue(event.row.eventValue.customer.firstName);
    this.form.get('lastName')?.setValue(event.row.eventValue.customer.lastName);
    this.form.get('birthdate')?.setValue(new Date(event.row.eventValue.customer.birthdate));
    this.form.get('phone')?.setValue(event.row.eventValue.customer.mobilePhone);
    this.setDisableBranch(event.row.eventValue.customer.branchTypeId);
    event.row.eventValue.addresses.forEach((x: any) => {
      if (Number(x.typeId) === 3) {
        this.form.get('addressNo')?.setValue(x.addressNo);
        this.form.get('building')?.setValue(x.building);
        this.form.get('floor')?.setValue(x.floor);
        this.form.get('villageNo')?.setValue(x.villageNo);
        this.form.get('village')?.setValue(x.village);
        this.form.get('alley')?.setValue(x.alley);
        this.form.get('soi')?.setValue(x.soi);
        this.form.get('street')?.setValue(x.street);
        this.form.get('postalCode')?.setValue(x.zipcode);
        this.form.get('subDistrict')?.setValue(x.subdistrictCode);
        this.form.get('district')?.setValue(x.districtCode);
        this.form.get('province')?.setValue(x.provinceCode);
        console.log("[onAction] zipcode => ", x.zipcode);
        this.postalCodeChanged.next(x.zipcode);
      }
    });
    // this.form.get('cardExpDate')?.setValue(event.row.eventValue.customer.cardExpDate);
    // console.log("[onAction] form => ", this.form.value);
    this.rowDescription = event.row;
    this.hiddenFillterMenu.emit(true);
  }

  onBack() {
    // this.postalCodeChanged.unsubscribe();
    this.form.reset();
    this.isShowDescription = false;
    this.hiddenFillterMenu.emit(false);
  }

  onApprove() {
    const cardExpDateFormat = this.transformDatePipe.transform(this.form.get('cardExpDate')?.value, 'YYYY-MM-DD');
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
        mobilePhone: this.form.get('phone')?.value,
        citizenDocId: this.form.get('citizenDocId')?.value,
        citizenId: this.form.get('citizenId')?.value,
        cardExpDate: cardExpDateFormat,
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
          typeId: "3",
          addressNo: this.form.get('addressNo')?.value,
          building: this.form.get('building')?.value,
          floor: this.form.get('floor')?.value,
          villageNo: this.form.get('villageNo')?.value,
          village: this.form.get('village')?.value,
          alley: this.form.get('alley')?.value,
          soi: this.form.get('soi')?.value,
          street: this.form.get('street')?.value,
          provinceCode: addressProvince?.id,
          provinceName: addressProvince?.name,
          districtCode: addressDistrict?.id,
          districtName: addressDistrict?.name,
          subdistrictCode: addressSubDistrict?.subdistrict.id,
          subdistrictName: addressSubDistrict?.subdistrict.name,
          zipcode: this.form.get('postalCode')?.value,
        }
      ]
    };
    const data = {
      requestParam: {
        channelId: 4,
        reqId: 1712915977405
      },
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
      }
    })
  }

  onReject() {
    const cardExpDateFormat = this.transformDatePipe.transform(this.form.get('cardExpDate')?.value, 'YYYY-MM-DD');
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
        mobilePhone: this.form.get('phone')?.value,
        citizenDocId: this.form.get('citizenDocId')?.value,
        citizenId: this.form.get('citizenId')?.value,
        cardExpDate: cardExpDateFormat,
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
          typeId: "3",
          addressNo: this.form.get('addressNo')?.value,
          building: this.form.get('building')?.value,
          floor: this.form.get('floor')?.value,
          villageNo: this.form.get('villageNo')?.value,
          village: this.form.get('village')?.value,
          alley: this.form.get('alley')?.value,
          soi: this.form.get('soi')?.value,
          street: this.form.get('street')?.value,
          provinceCode: addressProvince?.id,
          provinceName: addressProvince?.name,
          districtCode: addressDistrict?.id,
          districtName: addressDistrict?.name,
          subdistrictCode: addressSubDistrict?.subdistrict.id,
          subdistrictName: addressSubDistrict?.subdistrict.name,
          zipcode: this.form.get('postalCode')?.value,
        }
      ]
    };
    const data = {
      requestParam: {
        channelId: 4,
        reqId: 1712915977405
      },
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
          this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การอนุมัติสำเร็จ');
        } else {
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
        }

      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        console.error(err);
      }
    })
  }

}