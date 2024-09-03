import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomColumnModel, RowActionEventModel } from 'src/app/core/interfaces';

@Component({
  selector: 'app-report-type-9',
  templateUrl: './report-type-9.component.html',
  styleUrl: './report-type-9.component.scss'
})
export class ReportType9Component {
  // ตัวแปรที่ใช้ในการควบคุมตารางและข้อมูล
  currentTable: string = 'customer';
  customerColumns: CustomColumnModel[] = [];
  faremediaColumns: CustomColumnModel[] = [
    { id: 'item', name: 'item', label: 'Item', prop: 'item', sortable: true, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' }
  ];
  isHiddenFillter: boolean = false;
  rows: any[] = [];
  faremediaRows: any[] = [];
  isLoading: boolean = false;
  limitRow: number = 10;
  pages: number = 1;
  collectionSize: number = 0;
  createdDate: Date | undefined;
  userType: string | undefined;
  userName: string | undefined;
  public activeTab: 'customer-type-9-management' | 'wallet-type-9-management' | string | null = 'customer-type-9-management';

  // เพิ่มการสร้างฟอร์ม
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  // ข้อมูลตัวอย่าง
  public data = [
    {
      item: '1',
      department: 'กระทรวง',
      walletId: 'กท.6050',
      obu: '123',
      action: 'แก้ไข',
      detail: 'A-B public',
    },
  ];

  public columns: CustomColumnModel[] = [
    { id: 'item', name: 'item', label: 'รายการ', prop: 'item', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'department', name: 'department', label: 'หน่วยงาน', prop: 'department', sortable: false, resizeable: true, width: 200, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'walletId', name: 'walletId', label: 'Wallet_Id', prop: 'walletId', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obu', name: 'obu', label: 'OBU', prop: 'obu', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'action', name: 'action', label: 'Action', prop: 'action', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'detail', name: 'detail', label: 'รายละเอียด', prop: 'detail', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' }
  ];

  ngOnInit() {
    this.userName = '';
    this.userType = '';
    this.createdDate = new Date('');

    // จำลองการโหลดข้อมูล
    this.loadRows();
    this.loadFaremediaRows();
  }

  loadRows() {
    this.isLoading = true;
    setTimeout(() => {
      this.rows = [
        { item: '1', department: 'กระทรวง', walletId: 'กท.6050', obu: '123', action: 'แก้ไข', detail: 'A-B OBU' },
        { item: '2', department: 'สมาคมตำรวจ', walletId: 'พต.8526', obu: '963', action: 'แก้ไข', detail: 'A-C OBU' },
        { item: '3', department: 'กระทรวงยุติธรรม', walletId: 'ยส.7415', obu: '874', action: 'แก้ไข', detail: 'A-B OBU' }
      ];
      this.collectionSize = this.rows.length;
      this.isLoading = false;
    }, 1000);
  }

  loadFaremediaRows() {
    this.isLoading = true;
    setTimeout(() => {
      this.faremediaRows = [
        { item: 'Item 1' }
      ];
      this.collectionSize = this.faremediaRows.length;
      this.isLoading = false;
    }, 1000);
  }

  showTable(table: string) {
    this.currentTable = table;
  }

  onActive(event: RowActionEventModel): void {
    console.log(event);
  }

  onChangeNav(event: NgbNavChangeEvent): void {
    console.log(event.nextId);
  }

  onChangePageInfo(event: any): void {
    console.log(event);
  }
}
