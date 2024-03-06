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
  @Input() public limitRow: number = 5;
  @Input() public collectionSize: number = 0;
  @Input() public pages: number = 1;
  @Input() public rows: any[] = [];
  @Input() public emptyMessage: string = 'No Data Found';
  @Input() public columns: CustomColumnModel[] = [];
  @Input() public headerHeight: number = 0;
  @Input() public rowHeight: any = 'auto';
  @Input() public customClass: string | undefined;
  @Input() public isLoading: boolean = false;
  @Input() public footer: boolean = true;

  @Input() public footerOptions: { info: boolean } = {
    info: true
  };

  public wow: number | undefined = 0;

  public columnMode = ColumnMode;

  @Output() onChangePageEvent = new EventEmitter<number>();
  @Output() onChangeLimitEvent = new EventEmitter<number>();

  @Output() onRowActionEvent = new EventEmitter<RowActionEventModel>();

  constructor(

  ) {
  }

  onChangePage(value: number) {
    this.onChangePageEvent.emit(value);
    this.dataTableEl?.recalculate()
  }

  onChangeLimit(value: number) {
    this.onChangeLimitEvent.emit(value);
    this.dataTableEl?.recalculate();
  }

  onAction(event: RowActionEventModel) {
    this.onRowActionEvent.emit(event);
  }

}
