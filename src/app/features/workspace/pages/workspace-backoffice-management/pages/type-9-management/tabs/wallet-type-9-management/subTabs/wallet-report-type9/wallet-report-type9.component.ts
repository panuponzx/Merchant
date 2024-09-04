import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CustomColumnModel,
  ILogRowModel,
  RowActionEventModel,
  ILogModel,
  IResponseLogModel,
} from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import {
  getOptionsText,
  handleActionDetail,
} from 'src/app/features/utils/textUtils';

@Component({
  selector: 'wallet-report-type9',
  templateUrl: './wallet-report-type9.component.html',
  styleUrl: './wallet-report-type9.component.scss',
})
export class WalletReportType9Component {
  @Input() refreshTrigger: number = 0;
  @Input() walletId: string = '';
  @Input() actions: string[] = [];
  public isLoading: boolean = false;
  public limitRow: number = 10;
  public step: number = 0;
  public pages: number = 1;
  public columns: CustomColumnModel[] = [
    {
      id: 'no',
      name: 'no',
      label: 'รายการ',
      prop: '',
      sortable: false,
      resizeable: true,
      width: 90,
      minWidth: 90,
      headerClass: 'text-break text-center',
      cellClass: 'text-break text-center',
      type: 'no',
    },
    {
      id: 'WalletId',
      name: 'WalletId',
      label: 'หมายเลขกระเป๋า',
      prop: 'log.WalletId',
      sortable: false,
      resizeable: true,
      width: 200,
      minWidth: 200,
      headerClass: 'text-break text-center',
      cellClass: 'text-break text-center',
      type: 'text',
    },
    {
      id: 'faremediaValue',
      name: 'faremediaValue',
      label: 'OBU serial no.',
      prop: 'log.faremediaValue',
      sortable: false,
      resizeable: true,
      width: 200,
      minWidth: 200,
      headerClass: 'text-break text-center',
      cellClass: 'text-break text-center',
      type: 'text',
    },
    {
      id: 'action',
      name: 'action',
      label: 'action',
      prop: 'actionMeaning',
      sortable: false,
      resizeable: true,
      width: 150,
      minWidth: 150,
      headerClass: 'text-break text-center',
      cellClass: 'text-break text-center',
      type: 'text',
    },
    {
      id: 'detail',
      name: 'detail',
      label: 'รายละเอียด',
      prop: 'meaning',
      sortable: false,
      resizeable: true,
      width: 200,
      minWidth: 200,
      headerClass: 'text-break text-center',
      cellClass: 'text-break text-start',
      type: 'p',
    },
    {
      id: 'createdDate',
      name: 'createdDate',
      label: 'เวลา',
      prop: 'log.createdDate',
      sortable: false,
      resizeable: true,
      width: 150,
      minWidth: 150,
      headerClass: 'text-break text-center',
      cellClass: 'text-break text-center',
      type: 'date',
      date: { format: 'D MMMM BBBB', locale: 'th' },
    },
    {
      id: 'requestId',
      name: 'requestId',
      label: 'requestId',
      prop: 'log.requestId',
      sortable: false,
      resizeable: true,
      width: 150,
      minWidth: 150,
      headerClass: 'text-break text-center',
      cellClass: 'text-break text-center long-text',
      type: 'text',
    },
  ];
  public rows: ILogRowModel[] = [];
  public collectionSize: number = 0;
  constructor(
    private modalDialogService: ModalDialogService,
    private activeRoute: ActivatedRoute,
    private restApiService: RestApiService
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['refreshTrigger'] &&
      !changes['refreshTrigger'].firstChange &&
      this.walletId
    ) {
      this.onSearch();
    }
  }
  ngOnInit() {
    if (this.walletId) {
      this.onSearch();
    }
  }
  onActive(event: RowActionEventModel) {}
  onChangePage(page: number) {
    this.pages = page;
  }
  onSearch() {
    this.isLoading = true;
    this.rows = [];
    this.modalDialogService.loading();
    this._onSearch().subscribe({
      next: (res) => {
        this.modalDialogService.hideLoading();
        res.data.elements.forEach((element, index) => {
          this.rows.push({
            log: element,
            meaning: this.handleActionDetail(element.action, element),
            actionMeaning:this.getText(element.action),
          } as ILogRowModel);
        });
        this.collectionSize = res.data.totalElements;
        this.isLoading = false;
        this.pages = res.data.page;
        this.limitRow = res.data.pageSize;
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(err);
        this.isLoading = false;
      },
    });
  }
  handleActionDetail(action: string, row: ILogModel) {
    return handleActionDetail(action, row);
  }
  getText(value: string) {
    return getOptionsText(value);
  }
  _onSearch() {
    let payload = {
      limit: this.limitRow,
      page: this.pages,
      search: this.walletId,
      actions: this.actions,
    };
    return this.restApiService.postBackOffice(
      'customer-type-9/get-log-wallet',
      payload
    ) as Observable<IResponseLogModel>;
  }
}
