import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomColumnModel, CustomerModel, IJuristicElementModel, IJuristicInquiryResponse, IPrefixModel, RowActionEventModel } from '../../../../../../../../core/interfaces';
import { Observable, Subject, distinctUntilChanged, of, switchMap } from 'rxjs';
import { RestApiService } from '../../../../../../../../core/services';
import { TransformDatePipe } from '../../../../../../../../core/pipes';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectPendingRequestModalComponent } from '../../modals/reject-pending-request-modal/reject-pending-request-modal.component';
import { AddressTypeEnum } from 'src/app/core/enum/address.enum';
import prefixData from 'src/assets/data/prefix.json';
import { PendingRequestStatus } from 'src/app/core/types/onboarding-status';

export const PendingRequestEventType = {
  addJuristic: 1,
}

export interface IPendingRequest {
  type: number,
  status: PendingRequestStatus,
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
    { id: 'createdDate', name: 'createdDate', label: 'วันที่ และ เวลา ที่สร้าง', prop: 'createdDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'DD/MM/YYYY HH:mm:ss', locale: 'th' } },
    { id: 'userName', name: 'User Name', label: 'ชื่อผู้ใช้', prop: 'JuristicInfo.corporateName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'corporateBranch', name: 'CorporateBranch', label: 'ชื่อสาขา', prop: 'JuristicInfo.branchCode', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'branchId', name: 'BranchId', label: 'หมายเลขสาขาย่อย', prop: 'JuristicInfo.branchName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'status', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'approve-status' },
    { id: 'nameEmpTransaction', name: 'Name Emp Transaction', label: 'ชื่อพนักงานทำรายการ', prop: 'contactPerson.fullName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public rows: any = [];
  public tempRows: any = [];

  public isLoading: boolean = false;

  public customer: CustomerModel | undefined;
  public form!: FormGroup;
  public isShowDescription: boolean = false;
  public rowDescription = {} as IJuristicElementModel;

  public detailInformationTab: string | 'information-company' | 'information-visitor' = 'information-visitor';
  public activeAddressTab: string | undefined;

  public minDate: Date = new Date();

  public pendingRequest: IPendingRequest = {
    type: 0,
    status: 'PENDING'
  };

  public branchList: any[] = [
    {
      label: 'สาขาใหญ่',
      id: 'M'
    },
    {
      label: 'สาขาย่อย',
      id: 'B'
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
    this.loadPendingRequest(data.status, 1);
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
      txnId: new FormControl({ value: undefined, disabled: false }, Validators.required),
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
      contactPhone: new FormControl({ value: undefined, disabled: true }, Validators.required),
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
        province: new FormControl({ value: undefined, disabled: true }, Validators.required),
        provinceName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
        district: new FormControl({ value: undefined, disabled: true }, Validators.required),
        districtName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
        subdistrict: new FormControl({ value: undefined, disabled: true }, Validators.required),
        subdistrictName: new FormControl({ value: undefined, disabled: false }, Validators.required),
        zipcode: new FormControl({ value: undefined, disabled: true }, Validators.required),
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
        province: new FormControl({ value: undefined, disabled: true }, Validators.required),
        provinceName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
        district: new FormControl({ value: undefined, disabled: true }, Validators.required),
        districtName: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
        subdistrict: new FormControl({ value: undefined, disabled: true }, Validators.required),
        subdistrictName: new FormControl({ value: undefined, disabled: false }, Validators.required),
        zipcode: new FormControl({ value: undefined, disabled: true }, Validators.required),
      }),
    });
    // this.tempRows = this.rows;
    // this.collectionSize = this.rows.length;
  }

  loadPendingRequest(status: PendingRequestStatus, page: number) {
    this.isLoading = true;
    this.modalDialogService.loading();
    this.restApiService.getBackOfficeWithModel<IJuristicInquiryResponse>(`pending-request/inquiry?status=${status}&limit=${this.limitRow}&offset=${(this.pages * this.limitRow) - this.limitRow}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          console.log("[onSubmit] res => ", res);
          for (let i = 0; i < res.data.elements.length; i++) {
            res.data.elements[i].contactPerson.fullName = `${res.data.elements[i].contactPerson.firstName} ${res.data.elements[i].contactPerson.lastName}`
          }
          this.rows = res.data.elements;
          this.tempRows = this.rows;
          this.collectionSize = res.data.totalElements;
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
    this.loadPendingRequest(this.pendingRequest.status, event);
  }

  onChangeBranch(event: any) {
    console.log("[onChangeBranch] event => ", event);
    this.setDisableBranch(event.id);
  }

  setDisableBranch(branchId: string) {
    if (branchId === 'M') {
      this.form.get('branchName')?.setValue('สาขาใหญ่');
      this.form.get('branchNo')?.setValue('00000');
      // this.form.get('branchName')?.disable();
      // this.form.get('branchNo')?.disable();
    } else if (branchId === 'B') {
      // this.form.get('branchName')?.setValue('');
      // this.form.get('branchNo')?.setValue('');
      // this.form.get('branchName')?.enable();
      // this.form.get('branchNo')?.enable();
    }
  }


  onAction(event: RowActionEventModel) {
    const row: IJuristicElementModel = event.row;
    console.info(event);
    console.log("[onAction] form => ", this.form.value);
    this.onCheckPrefix(row.contactPerson.titleName);
    this.prefixList$ = of(this.prefixList);
    this.form.get('txnId')?.setValue(row.txnId);
    // this.form.get('citizenDocId')?.setValue(event.row.eventValue.customer.citizenDocId);
    // this.form.get('pictures')?.setValue(event.row.eventValue.customer.pictures);
    this.form.get('citizenId')?.setValue(row.contactPerson.citizenId);
    this.form.get('companyName')?.setValue(row.JuristicInfo.corporateName);
    this.form.get('branch')?.setValue(row.JuristicInfo.branchTypeCode);
    this.form.get('branchName')?.setValue(row.JuristicInfo.branchCode);
    this.form.get('branchNo')?.setValue(row.JuristicInfo.branchName);
    this.form.get('taxId')?.setValue(row.JuristicInfo.corporateRegistrationNo);
    // this.form.get('cardExpDate')?.setValue(new Date(event.row.eventValue.customer.cardExpDate));
    this.form.get('gender')?.setValue(row.contactPerson.gender);
    this.form.get('prefix')?.setValue(row.contactPerson.titleName);
    this.form.get('firstName')?.setValue(row.contactPerson.firstName);
    this.form.get('lastName')?.setValue(row.contactPerson.lastName);
    this.form.get('birthdate')?.setValue(new Date(String(row.contactPerson.birthDate)));
    this.form.get('mobilePhone')?.setValue(row.contactPerson.phoneNo);
    this.form.get('contactPhone')?.setValue(row.contact.mobile);
    this.form.get('email')?.setValue(row.contact.email);
    this.setDisableBranch(row.JuristicInfo.branchTypeCode!);
    // this.form.get('work_address')?.get('typeId')?.setValue(x.typeId);
    this.form.get('work_address')?.get('addressNo')?.setValue(row.JuristicInfo.houseNo);
    this.form.get('work_address')?.get('building')?.setValue(row.JuristicInfo.building);
    this.form.get('work_address')?.get('floor')?.setValue(row.JuristicInfo.floor);
    this.form.get('work_address')?.get('villageNo')?.setValue(row.JuristicInfo.moo);
    this.form.get('work_address')?.get('village')?.setValue(row.JuristicInfo.village);
    this.form.get('work_address')?.get('alley')?.setValue(row.JuristicInfo.alley);
    this.form.get('work_address')?.get('soi')?.setValue(row.JuristicInfo.soi);
    this.form.get('work_address')?.get('street')?.setValue(row.JuristicInfo.street);
    this.form.get('work_address')?.get('province')?.setValue(Number(row.JuristicInfo.provinceCode));
    // this.form.get('work_address')?.get('provinceName')?.setValue(x.provinceCode);
    this.form.get('work_address')?.get('district')?.setValue(Number(row.JuristicInfo.districtCode));
    // this.form.get('work_address')?.get('districtName')?.setValue(x.districtCode);
    this.form.get('work_address')?.get('subdistrict')?.setValue(Number(row.JuristicInfo.subDistrictCode));
    // this.form.get('work_address')?.get('subdistrictName')?.setValue(x.subdistrictCode);
    this.form.get('work_address')?.get('zipcode')?.setValue(row.JuristicInfo.postcode);

    // this.form.get('etax_address')?.get('typeId')?.setValue(x.typeId);
    this.form.get('etax_address')?.get('addressNo')?.setValue(row.billingAddress.houseNo);
    this.form.get('etax_address')?.get('building')?.setValue(row.billingAddress.building);
    this.form.get('etax_address')?.get('floor')?.setValue(row.billingAddress.floor);
    this.form.get('etax_address')?.get('villageNo')?.setValue(row.billingAddress.moo);
    this.form.get('etax_address')?.get('village')?.setValue(row.billingAddress.village);
    this.form.get('etax_address')?.get('alley')?.setValue(row.billingAddress.alley);
    this.form.get('etax_address')?.get('soi')?.setValue(row.billingAddress.soi);
    this.form.get('etax_address')?.get('street')?.setValue(row.billingAddress.street);
    this.form.get('etax_address')?.get('province')?.setValue(Number(row.billingAddress.provinceCode));
    // this.form.get('etax_address')?.get('provinceName')?.setValue(x.provinceCode);
    this.form.get('etax_address')?.get('district')?.setValue(Number(row.billingAddress.districtCode));
    // this.form.get('etax_address')?.get('districtName')?.setValue(x.districtCode);
    this.form.get('etax_address')?.get('subdistrict')?.setValue(Number(row.billingAddress.subDistrictCode));
    // this.form.get('etax_address')?.get('subdistrictName')?.setValue(x.subdistrictCode);
    this.form.get('etax_address')?.get('zipcode')?.setValue(row.billingAddress.postcode);
    // this.zipcodeChanged.next(x.zipcode);
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
    const paylaod = {
      reason: "",
      remark: ""
    }
    const txnId: string = this.form.get('txnId')?.value;
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<any, any>(`pending-request/${txnId}/approve`, paylaod).subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        if (res.errorMessage === "Success") {
          this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การอนุมัติสำเร็จ').then((res: boolean) => {
            if (res) this.loadPendingRequest(this.pendingRequest.status, 1);
            this.onBack();
          })
        }
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onReject() {
    const txnId: string = this.form.get('txnId')?.value;
    const modalRef = this.ngbModal.open(RejectPendingRequestModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.data = txnId;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.loadPendingRequest(this.pendingRequest.status, 1);
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
