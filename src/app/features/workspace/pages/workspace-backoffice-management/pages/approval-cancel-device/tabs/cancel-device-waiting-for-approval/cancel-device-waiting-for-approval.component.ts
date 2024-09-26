import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomColumnModel, CustomerModel, IPendingRequestCancelObu, IPendingRequestCancelObuResponse, IPendingRequestDetailCancelObuResponse, IPendingRequestReturnDetailObu, IReasonModel, IReasonResponse, ResponseModel, RowActionEventModel, UserModel } from '../../../../../../../../core/interfaces';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/core/services/rest-api-service/rest-api.service';
import { Observable, zip } from 'rxjs';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { formatDate } from 'src/app/features/utils/textUtils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmCancelWithEmployeeIdComponent } from 'src/app/features/workspace/pages/workspace-with-navbar-and-sidebar/modals/confirm-cancel-with-employee-id/confirm-cancel-with-employee-id.component';
import { AuthenticationService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmSelectionRemarkModalComponent } from 'src/app/features/workspace/pages/workspace-with-navbar-and-sidebar/modals/confirm-selection-remark-modal/confirm-selection-remark-modal.component';
@Component({
  selector: 'cancel-device-waiting-for-approval',
  templateUrl: './cancel-device-waiting-for-approval.component.html',
  styleUrl: './cancel-device-waiting-for-approval.component.scss'
})
export class CancelDeviceWaitingForApprovalComponent {

  @Input() public tempSearch: any | undefined;
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'createDate', name: 'Create Date', label: 'เวลาที่ยื่นคำร้อง', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'formId', name: 'form Id', label: 'เลขใบคำร้อง', prop: 'eventValue.requestNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuNo', name: 'Obu No', label: 'OBU no.', prop: 'eventValue.obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'serialNo', name: 'Serial No', label: 'Serial no.', prop: 'eventValue.smartcardPan', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'bankAccount', name: 'Bank Account', label: 'ชื่อเจ้าของบัญชี', prop: 'eventValue.customerName', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'nameEmpTransaction', name: 'Amount', label: 'ชื่อพนักงานทำรายการ', prop: 'eventValue.staffName', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];
  public tempColumns: CustomColumnModel[] = [
    { id: 'createDate', name: 'Create Date', label: 'เวลาที่ยื่นคำร้อง', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'formId', name: 'form Id', label: 'เลขใบคำร้อง', prop: 'eventValue.requestNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuNo', name: 'Obu No', label: 'OBU no.', prop: 'eventValue.obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'serialNo', name: 'Serial No', label: 'Serial no.', prop: 'eventValue.smartcardPan', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'bankAccount', name: 'Bank Account', label: 'ชื่อเจ้าของบัญชี', prop: 'eventValue.customerName', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'nameEmpTransaction', name: 'Amount', label: 'ชื่อพนักงานทำรายการ', prop: 'eventValue.staffName', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
  ];

  public options: IReasonModel[] = [];
  public rows: IPendingRequestCancelObu[] = [];
  public tempRow: IPendingRequestCancelObu[] = [];

  public isLoading: boolean = false;
  public customer: CustomerModel | undefined;
  public form!: FormGroup;
  public isShowDescription: boolean = false;
  public id: string | null = null;
  public reasonText: string | undefined = undefined;
  @Output() hiddenFillterMenu: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() search: EventEmitter<(startDate: Date, endDate: Date, tollPlaza: string) => void> = new EventEmitter<(startDate: Date, endDate: Date, tollPlaza: string) => void>();
  constructor(
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      date: new FormControl({ value: undefined, disabled: true }, Validators.required),
      deviceOwnerName: new FormControl({ value: undefined, disabled: true }, Validators.required),
      isOwnerOperator: new FormControl({ value: '1', disabled: true }, Validators.required),
      phoneOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      lastnameOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      positionOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      citizenIdOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
      firstnameOperator: new FormControl({ value: undefined, disabled: true }, Validators.required),
    });
    this.collectionSize = this.rows.length;

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
      displayCreateDateTime: "",
      birthdate: "2023-10-09",
      occupation: "พนักงานบริษัท",
      status: 1,
      createDate: "2024-02-27T01:07:16.062+00:00",
      updateDate: "2024-04-01 12:58:22",
      citizenDocId: 1,
      taxId: "1234567890123",
      branchTypeId: 0,
      firstNameEng: '',
      email: ''
    }

  }
  ngOnInit() {
    this.search.emit((startDate: Date, endDate: Date, tollPlaza: string) => {
      this.isLoading = true;
      this.modalDialogService.loading();
      this._loadData(startDate, endDate, tollPlaza).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          this.isLoading = false;
          this.rows = res.data;
          console.info("Data received:", res);
        },
        error: (err) => {
          this.isLoading = false;
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
          console.error("Error:", err);
        }
      });
    });
    this.activeRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadDetail(this.id);
      }
    });

  }
  onChangePage(event: number) {
    this.pages = event;
  }
  loadDetail(id: string) {
    this.modalDialogService.loading();
    zip(
      this._loadReasonData(),
      this._loadDescriptionData(id)
    ).subscribe({
      next: (response) => {
        var res = response[1]
        this.options = response[0].data;
        this.tempRow = [res.data.pendingRequestInfo];
        this.tempRow[0].eventValue.customerName = res.data.customer.firstName + ' ' + res.data.customer.lastName;
        this.customer!.firstName = res.data.customer.firstName;
        this.customer!.lastName = res.data.customer.lastName;
        this.form.patchValue({
          date: this.tempRow[0]?.createDate ? new Date(this.tempRow[0].createDate.replace(' ', 'T')) : undefined,
          deviceOwnerName: this.tempRow[0]?.eventValue.customerName,
          isOwnerOperator: this.tempRow[0]?.eventValue.isOwnerOperator ? '1' : '0',
          phoneOperator: this.tempRow[0]?.eventValue.phoneOperator,
          lastnameOperator: this.tempRow[0]?.eventValue.lastnameOperator,
          positionOperator: this.tempRow[0]?.eventValue.positionOperator,
          citizenIdOperator: this.tempRow[0]?.eventValue.citizenIdOperator,
          firstnameOperator: this.tempRow[0]?.eventValue.firstnameOperator,
        });
        if (this.tempRow[0]?.status !== 0) {
          this.reasonText = this.options.find(x => x.id === this.tempRow[0]?.reason)?.name;
        }
        console.log('this.tempRow[0]?.status !== 0: ', this.tempRow[0]?.status !== 0);
        console.log('reasonText : ', this.reasonText);

        this.isShowDescription = true;
        this.hiddenFillterMenu.emit(true);
        this.modalDialogService.hideLoading();
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(err);
      }
    });
  }

  onAction(event: RowActionEventModel) {
    this.tempRow = [event.row];
    this.router.navigate([], {
      queryParams: { id: this.tempRow[0].id },
      queryParamsHandling: 'merge'
    });
    this.loadDetail(this.tempRow[0].id.toString());
  }

  handleChange() {
    console.log('change : ', this.form.value);
  }
  onBack() {
    this.isShowDescription = false;
    this.hiddenFillterMenu.emit(false);
    this.router.navigate([], {
      queryParams: { id: null },
      queryParamsHandling: 'merge'
    });
  }
  _loadData(startDate: Date, endDate: Date, tollPlazaId: string): Observable<IPendingRequestCancelObuResponse> {
    var payload = {
      page: this.pages,
      content: {
        eventType: 10,
        status: 0,
        eventValue: tollPlazaId
      },
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    }
    return this.restApiService.postBackOffice('pending-request/ewallet/get', payload) as Observable<IPendingRequestCancelObuResponse>;
  }

  _loadDescriptionData(id: string) {
    var payload = {
      id: id
    }
    return this.restApiService.postBackOffice('pending-request/ewallet/get-by-id', payload) as Observable<IPendingRequestDetailCancelObuResponse>;
  }
  _loadReasonData() {
    return this.restApiService.getBackOffice('master-data/reason/cancel-return-obu') as Observable<IReasonResponse>;
  }
  onSubmited() {
    console.log('submited : ', this.form.value);
    const modalRef = this.ngbModal.open(ConfirmCancelWithEmployeeIdComponent, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'อนุมัติยกเลิก OBU';
    modalRef.componentInstance.onSubmitted = () => {
      this.modalDialogService.loading();
      this.approveCancelObu().subscribe({
        next: async (_) => {
          this.modalDialogService.hideLoading();
          await this.modalDialogService.info('success', '#2255CE', 'อนุมัติยกเลิก OBU สำเร็จ', 'ทำการสร้างคำร้องขอยกเลิก OBU ของท่านเรียบร้อยแล้ว');
          window.location.reload();
        },
        error: async (error) => {
          let errorText;
          this.modalDialogService.hideLoading();
          errorText = error.body.throwableMessage ? error.body.throwableMessage : error.error.message;
          await this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', errorText);
          window.location.reload();
        }
      })
    };
  }

  approveCancelObu() {
    var payload = {
      id: this.tempRow[0].id,
      reasonId: 0,
      isApprove: true,
      remark: '',
      updateBy: this.authenticationService.getUserValue()?.username ?? '',
    };
    return this.restApiService.postBackOffice('pending-request/ewallet/approval/cancel-obu', payload) as Observable<any>;
  }
  rejectCancelObuApi(reason: string, remark: string) {
    var payload = {
      id: this.tempRow[0].id,
      reasonId: reason,
      isApprove: false,
      remark: remark,
      updateBy: this.authenticationService.getUserValue()?.username ?? '',
    };
    return this.restApiService.postBackOffice('pending-request/ewallet/approval/cancel-obu', payload) as Observable<any>;
  }
  rejectCancelObu() {
    const modalRef = this.ngbModal.open(ConfirmSelectionRemarkModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'ปฏิเสธการยกเลิก OBU';
    modalRef.componentInstance.options = this.options;
    modalRef.componentInstance.optionsDescription = 'เหตุผลในการปฏิเสธ';
    modalRef.componentInstance.remarkDescription = 'หมายเหตุเพิ่มเติม (ถ้ามี)';
    modalRef.componentInstance.submitDescription = 'ยืนยันการปฏิเสธ';
    modalRef.componentInstance.onSubmitted = (reason: string, remark: string) => {
      this.modalDialogService.loading();
      this.rejectCancelObuApi(reason, remark).subscribe({
        next: async (_) => {
          this.modalDialogService.hideLoading();
          await this.modalDialogService.info('success', '#2255CE', 'ปฏิเสธการยกเลิก OBU สำเร็จ', 'ทำการปฏิเสธการยกเลิก OBU ของท่านเรียบร้อยแล้ว');
          window.location.reload();
        },
        error: async (error) => {
          let errorText;
          this.modalDialogService.hideLoading();
          errorText = error.body.throwableMessage ? error.body.throwableMessage : error.error.message;
          await this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', errorText);
          window.location.reload();
        }
      })
    }
  }
}