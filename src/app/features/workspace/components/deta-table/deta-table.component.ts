import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-deta-table',
  templateUrl: './deta-table.component.html',
  styleUrls: ['./deta-table.component.scss']
})
export class DetaTableComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent | undefined;

  ColumnMode = ColumnMode;

  @Input() public rows: any[] = [];

  temp = [...this.rows];

  columns = [
    { prop: 'ชื่อ', name: 'ชื่อ' },
    { prop: 'นามสกุล', name: 'นามสกุล' },
    { prop: 'หมายเลขบัตรประชาชน', name: 'หมายเลขบัตรประชาชน' },
    { prop: 'ประเภท', name: 'ประเภท' },
    { prop: 'วันเกิด', name: 'วันเกิด' },
    { prop: 'เบอร์ติดต่อ', name: 'เบอร์ติดต่อ' }
  ];

  constructor() {}

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      
    });

    this.rows = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }
}
