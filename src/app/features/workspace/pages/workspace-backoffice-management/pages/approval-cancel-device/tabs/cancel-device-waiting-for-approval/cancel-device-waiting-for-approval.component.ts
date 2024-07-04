import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomColumnModel, CustomerModel, RowActionEventModel } from '../../../../../../../../core/interfaces';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
    { id: 'formId', name: 'form Id', label: 'เลขใบคำร้อง', prop: 'formId', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuNo', name: 'Obu No', label: 'OBU no.', prop: 'obuNo', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'serialNo', name: 'Serial No', label: 'Serial no.', prop: 'serialNo', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'bankAccount', name: 'Bank Account', label: 'ชื่อเจ้าของบัญชี', prop: 'bankAccountNo', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'nameEmpTransaction', name: 'Amount', label: 'ชื่อพนักงานทำรายการ', prop: 'nameEmpTransaction', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public rows: any = [];
  public tempRows: any = [];

  public isLoading: boolean = false;

  public customer: CustomerModel | undefined;
  public form!: FormGroup;
  public isShowDescription: boolean = false;

  @Output() hiddenFillterMenu: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      date: new FormControl({value: undefined, disabled: true}, Validators.required),
      deviceOwnerName: new FormControl({value: undefined, disabled: true}, Validators.required),
    });
    this.rows = [
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายแอดมิน'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        createDate: '2024-03-05 14:06:17',
        formId: '123456',
        obuNo: '1234',
        serialNo: '1234',
        bankAccountNo: 'นายทดสอบ ทดสอบ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
    ];
    this.tempRows = this.rows;
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

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event);
    this.isShowDescription = true;
    this.hiddenFillterMenu.emit(true);
  }

  onBack() {
    this.isShowDescription = false;
    this.hiddenFillterMenu.emit(false);
  }

}