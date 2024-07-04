import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomColumnModel, CustomerModel, RowActionEventModel } from '../../../../../../../../core/interfaces';

@Component({
  selector: 'maintenance-costs',
  templateUrl: './maintenance-costs.component.html',
  styleUrl: './maintenance-costs.component.scss'
})
export class MaintenanceCostsComponent {
  @Input() public tempSearch: any | undefined;
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'userName', name: 'User Name', label: 'ชื่อผู้ใช้', prop: 'userName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'period', name: 'Period', label: 'ระยะเวลาที่ไม่มีการเคลือนไหว', prop: 'period', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'deviceId', name: 'Device Id', label: 'หมายเลขอุปกรณ์', prop: 'deviceId', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'amountBilledMonth', name: 'Amount Billed Month', label: 'จำนวนเงินเรียกเก็บต่อเดือน', prop: 'amountBilledMonth', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'movement', name: 'Movement', label: 'เคลื่อนไหวล่าสุด', prop: 'movement', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'cancelCharge', name: 'Cancel Charge', label: 'ยกเลิกการเรียกเก็บ', prop: 'cancelCharge', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
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
        userName: 'นาย ทดสอบ ทดสอบ',
        period: '335 วัน',
        deviceId: '1234567890',
        amountBilledMonth: '25 บาท',
        movement: '24 ธันวาคม 2566',
        cancelCharge: 'ยกเลิกแล้ว'
      },
      {
        userName: 'นาย ทดสอบ ทดสอบ',
        period: '335 วัน',
        deviceId: '1234567890',
        amountBilledMonth: '25 บาท',
        movement: '24 ธันวาคม 2566',
        cancelCharge: 'ยกเลิกแล้ว'
      },
      {
        userName: 'นาย ทดสอบ ทดสอบ',
        period: '335 วัน',
        deviceId: '1234567890',
        amountBilledMonth: '25 บาท',
        movement: '24 ธันวาคม 2566',
        cancelCharge: 'ยกเลิกแล้ว'
      },
      {
        userName: 'นาย ทดสอบ ทดสอบ',
        period: '335 วัน',
        deviceId: '1234567890',
        amountBilledMonth: '25 บาท',
        movement: '24 ธันวาคม 2566',
        cancelCharge: 'ยกเลิกแล้ว'
      },
      {
        userName: 'นาย ทดสอบ ทดสอบ',
        period: '335 วัน',
        deviceId: '1234567890',
        amountBilledMonth: '25 บาท',
        movement: '24 ธันวาคม 2566',
        cancelCharge: 'ยกเลิกแล้ว'
      },
      {
        userName: 'นาย ทดสอบ ทดสอบ',
        period: '335 วัน',
        deviceId: '1234567890',
        amountBilledMonth: '25 บาท',
        movement: '24 ธันวาคม 2566',
        cancelCharge: 'ยกเลิกแล้ว'
      },
      {
        userName: 'นาย ทดสอบ ทดสอบ',
        period: '335 วัน',
        deviceId: '1234567890',
        amountBilledMonth: '25 บาท',
        movement: '24 ธันวาคม 2566',
        cancelCharge: 'ยกเลิกแล้ว'
      },
      {
        userName: 'นาย ทดสอบ ทดสอบ',
        period: '335 วัน',
        deviceId: '1234567890',
        amountBilledMonth: '25 บาท',
        movement: '24 ธันวาคม 2566',
        cancelCharge: 'ยกเลิกแล้ว'
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
      updateDate: "2024-04-01 12:58:22",
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
