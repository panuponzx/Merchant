import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomColumnModel, CustomerModel, RowActionEventModel } from '../../../../../../../../core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';

@Component({
  selector: 'maintenance-costs',
  templateUrl: './maintenance-costs.component.html',
  styleUrl: './maintenance-costs.component.scss'
})
export class MaintenanceCostsComponent implements OnInit {
  @Input() public tempSearch: any | undefined;
  public pageSize: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'customerName', name: 'customerName', label: 'ชื่อผู้ใช้', prop: 'customerName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'displayLastTransactionDate', name: 'displayLastTransactionDate', label: 'ระยะเวลาที่ไม่มีการเคลือนไหว', prop: 'displayLastTransactionDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'feePerMonth', name: 'feePerMonth', label: 'จำนวนเงินเรียกเก็บต่อเดือน', prop: 'feePerMonth', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'lastTransactionDate', name: 'lastTransactionDate', label: 'เคลื่อนไหวล่าสุด', prop: 'lastTransactionDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    // { id: 'lastTransactionDate', name: 'lastTransactionDate', label: 'เคลื่อนไหวล่าสุด', prop: 'lastTransactionDate', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'isCancelled', name: 'isCancelled', label: 'ยกเลิกการเรียกเก็บ', prop: 'isCancelled', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'isCancelled', name: 'isCancelled', label: 'ยกเลิกการเรียกเก็บ', prop: 'isCancelled', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-red', textCondition1: 'ยกเลิกแล้ว', classCondition2: 'text-primary text-underline', textCondition2: 'ยกเลิกการเรียกเก็บ' } },
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
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {
    this.form = this.formBuilder.group({
      date: new FormControl({ value: undefined, disabled: true }, Validators.required),
      deviceOwnerName: new FormControl({ value: undefined, disabled: true }, Validators.required),
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

  ngOnInit(): void {
    this.loadMaintenanceCosts();
  }

  loadMaintenanceCosts() {
    this.modalDialogService.loading();
    const mockupData = {
      // content: '',
      page: this.pages,
      pageSize: this.pageSize
    };
    this.restApiService
      .postBackOffice('report/get/faremedia/dormant', mockupData)
      .pipe(
        first(),
        map(res => res as any)
      ).subscribe({
        next: (res) => {
          console.log("[loadMaintenanceCosts] res => ", res);
          this.collectionSize = res.totalData;
          this.rows = res.data;
          this.modalDialogService.hideLoading();
          this.isLoading = false;
        },
        error: (error) => {
          this.modalDialogService.hideLoading();
          console.error(error);
          this.modalDialogService.handleError(error);
        }
      });
  }

  onChangePage(event: number) {
    this.pages = event;
    this.loadMaintenanceCosts();
  }

  onAction(event: RowActionEventModel) {
    console.info(event);
    // this.isShowDescription = true;
    this.hiddenFillterMenu.emit(true);
  }

  onBack() {
    this.isShowDescription = false;
    this.hiddenFillterMenu.emit(false);
  }

}
