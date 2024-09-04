import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent as DatatablesComponent } from '@swimlane/ngx-datatable';
import { CustomColumnModel, RowActionEventModel } from '../../../../core/interfaces';

@Component({
  selector: 'datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent {

  @ViewChild(DatatablesComponent) public dataTableEl: DatatablesComponent | undefined;

  @Input() public id: string = 'datatable';

  @Input() public collectionSize: number = 0;
  @Input() public page: number = 1;
  @Input() public pageSize: number = 5;
  @Input() public totalPages: number = 0;

  @Input() public rows: any[] = [];
  @Input() public emptyMessage: string = 'No Data Found';
  @Input() public loadingMessage: string = 'กำลังโหลดข้อมูล...';
  @Input() public columns: CustomColumnModel[] = [];
  @Input() public headerHeight: number = 0;
  @Input() public rowHeight: any = 'auto';
  @Input() public customDatatableContainerClass: string | undefined;
  @Input() public customDatatableContentClass: string | undefined;
  @Input() public customDatatableClass: string | undefined;
  @Input() public customDatatableFooterClass: string | undefined;
  @Input() public isLoading: boolean = false;
  @Input() public footer: boolean = true;
  @Input() public externalPaging: boolean = false;
  @Input() public isPagination: boolean = true;

  @Input() public footerOptions: { info: boolean } = {
    info: true
  };

  public columnMode = ColumnMode;

  @Output() onChangePageEvent = new EventEmitter<number>();
  @Output() onChangeLimitEvent = new EventEmitter<number>();

  @Output() onRowActionEvent = new EventEmitter<RowActionEventModel>();
  @Output() onRowCancelEvent = new EventEmitter<RowActionEventModel>();
  @Output() onRowTextBooleanEvent = new EventEmitter<RowActionEventModel>();

  constructor(
  ) { }

  ngOnInit(): void {
    // this.collectionSize = this.rows.length;
    // console.log(this.totalPages);
  }

  onChangePage(value: number) {
    // console.log('xxxxxxxx');
    this.onChangePageEvent.emit(value);
    this.dataTableEl?.recalculate();
  }

  onChangeLimit(value: number) {
    this.onChangeLimitEvent.emit(value);
    this.dataTableEl?.recalculate();
  }

  onAction(event: RowActionEventModel) {
    this.onRowActionEvent.emit(event);
  }

  onCancel(event: RowActionEventModel) {
    this.onRowCancelEvent.emit(event);
  }

  onClickTextBoolean(event: RowActionEventModel) {
    this.onRowTextBooleanEvent.emit(event);
  }
  logLabel(t: string) {
    console.log(t);
    console.log("onRowActionEvent : ", this.onRowActionEvent);
    this.onRowActionEvent.emit();
  }
  getType(value: any) {
    return typeof value;
  }
  getColumnValue(key: string, row: any): any {
    return row[key] || '';
  }
  getFormattedText(value: string): string {
    return value.replace(/\n/g, '<br>');
  }
}
