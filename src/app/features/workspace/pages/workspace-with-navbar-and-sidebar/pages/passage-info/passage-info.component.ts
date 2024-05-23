import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Observable, zip } from 'rxjs';
import { CustomColumnModel, CustomeActivatedRouteModel, CustomerModel, ReponseCustomerModel, ReponseWalletSummaryModel, RowActionEventModel, WalletSummaryModel, PassageInformationModel, PassageInformationPayloadModel, ResponsePassageInformationModel } from '../../../../../../core/interfaces';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PassageInfoModalComponent } from '../../modals/passage-info-modal/passage-info-modal.component';

@Component({
  selector: 'app-passage-info',
  templateUrl: './passage-info.component.html',
  styleUrl: './passage-info.component.scss'
})
export class PassageInfoComponent implements OnInit {

  @ViewChild('myTable') table: any;

  public title: string | undefined;

  public customerId: string | null = null;
  public customer: CustomerModel | undefined;

  public wallets: WalletSummaryModel[] = [];
  public allWallet: WalletSummaryModel = {
    totalBalance: 0,
    totalPoint: 0,
    totalPointBalance: 0,
    walletId: 0,
    walletName: 'ทุกกระเป๋า',
    walletStatus: 0,
    walletTypeId: 0,
    walletTypeName: 'ทุกกระเป๋า',
    lstCars: [],
    lstObus: []
  }

  public rows: any[] = [];
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'createDate', name: 'Create Date', label: 'วันที่ และ เวลา', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'route', name: 'Route', label: 'สายทาง', prop: 'exitHq', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'building', name: 'Building', label: 'อาคารด่าน', prop: 'exitPlaza', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'walletName', name: 'Wallet Name', label: 'กระเป่าเงิน', prop: 'walletId', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'properties.obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'properties.smartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'amount', name: 'amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'number', numberFormat: '1.2-2' },
    // { id: 'taxInvoice', name: 'Tax Invoice', label: 'ใบกำกับภาษี', prop: 'taxInvoice', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'check-uncheck' },
    { id: 'cancel', name: 'Cancel', label: 'การยกเลิก', prop: 'isCancelled', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-red-exat', textCondition1: 'ยกเลิกแล้ว', textCondition2: '-' } },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(undefined, [Validators.required]),
    endDate: new FormControl(undefined, [Validators.required]),
    walletId: new FormControl(this.allWallet.walletId, [Validators.required])
  });

  public tempSearch: PassageInformationPayloadModel | undefined;

  public isLoading: boolean = false;
  public isLoadingSearch: boolean = false;

  public columnMode = ColumnMode;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private transformDatePipe: TransformDatePipe,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal
  ) {
    this.title = (this.activatedRoute as CustomeActivatedRouteModel).routeConfig.data?.label;
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.loadCustomerInfo();
    }
  }

  async loadCustomerInfo() {
    console.log("[loadCustomerInfo]");
    this.isLoading = true;
    this.modalDialogService.loading();
    zip(
      await this.loadCustomer(),
      await this.loadWalletInfo()
    )
      .pipe()
      .subscribe({
        next: (info) => {
          console.log("[loadCustomerInfo] hideLoading");
          if (info[0].customer) {
            this.customer = info[0].customer;
          }
          if (info[1].lstSummary) {
            this.wallets = [...[this.allWallet], ...info[1].lstSummary];
          }
          this.modalDialogService.hideLoading();
          this.isLoading = false;
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      })
  }

  loadCustomer() {
    const mockupData = {
      queryType: 2,
      customer: {
        id: this.customerId,
        requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: 1
        }
      }
    };
    return this.restApiService.post('get-customer', mockupData) as Observable<ReponseCustomerModel>;
  }

  loadWalletInfo() {
    const mockupData = {
      id: this.customerId,
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: "1"
      }
    };
    return this.restApiService.post('get-summary', mockupData) as Observable<ReponseWalletSummaryModel>;
  }

  onSearch() {
    // if (this.form.invalid || this.isLoadingSearch) return;
    const searchValue = this.getSearchValue(1);
    this.tempSearch = searchValue;
    this.pages = searchValue.page;
    this.loadPassageInformation(searchValue);
  }

  getSearchValue(page: number): PassageInformationPayloadModel {
    const formValue = this.form.value;
    const { walletId, startDate, endDate } = formValue;
    const from = this.transformDatePipe.transform(startDate, 'YYYY-MM-DD');
    const to = this.transformDatePipe.transform(endDate, 'YYYY-MM-DD');
    const value: PassageInformationPayloadModel = { walletId: walletId, from: from, to: to, page: page }
    return value;
  }

  loadPassageInformation(data: PassageInformationPayloadModel) {
    this.isLoadingSearch = true;
    this.modalDialogService.loading();
    const mockupData = {
      customerId: this.customerId,
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: "2"
      },
      from: data.from,
      to: data.to,
      walletId: data.walletId,
      page: data.page,
    };
    this.restApiService
      .postBackOffice('transaction-history/get-passage', mockupData)
      .pipe(
        first(),
        map(res => res as ResponsePassageInformationModel)
      )
      .subscribe({
        next: (res) => {
          console.log(res)
          // this.rows = res.transactions.filter(x => x.typeId === '3');

          this.rows = res.data;
          let arr = [];
          for (let i = 0; i < this.rows.length; i++) {
            if (this.rows[i].passages.length > 0) {
              for (let j = 0; j < this.rows[i].passages.length; j++) {
                arr.push({
                  gTransactionDate: this.rows[i].transactionDate,
                  gObu: this.rows[i].obu,
                  gAmount: this.rows[i].amount,
                  gisCancelled: this.rows[i].cancelled,
                  transactionDate: this.rows[i].passages[j].transactionDate,
                  obu: this.rows[i].passages[j].obu,
                  amount: this.rows[i].passages[j].amount,
                  isCancelled: this.rows[i].passages[j].isCancelled,
                  smartCard: this.rows[i].passages[j].smartCard,
                  walletName: this.rows[i].passages[j].walletName,
                  entryHqName: this.rows[i].passages[j].entryHqName,
                  entryPlazaName: this.rows[i].passages[j].entryPlazaName,
                  exitHqName: this.rows[i].passages[j].exitHqName,
                  exitPlazaName: this.rows[i].passages[j].exitPlazaName,
                  transactionId: this.rows[i].passages[j].transactionId,
                  group: i
                });
              }
            } else {
              arr.push({
                gTransactionDate: this.rows[i].transactionDate,
                gObu: this.rows[i].obu,
                gAmount: this.rows[i].amount,
                gisCancelled: this.rows[i].cancelled,
                transactionDate: this.rows[i].transactionDate,
                obu: this.rows[i].obu,
                amount: this.rows[i].amount,
                isCancelled: this.rows[i].isCancelled,
                smartCard: this.rows[i].smartCard,
                walletName: this.rows[i].walletName,
                entryHqName: this.rows[i].entryHqName,
                entryPlazaName: this.rows[i].entryPlazaName,
                exitHqName: this.rows[i].exitHqName,
                exitPlazaName: this.rows[i].exitPlazaName,
                transactionId: this.rows[i].transactionId,
                group: i
              });
            }
          }

          console.log(arr);

          this.rows = arr;
          this.collectionSize = res.totalData;
          this.isLoadingSearch = false;
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          console.error(err);
          this.tempSearch = undefined;
          this.isLoadingSearch = false;
          this.modalDialogService.hideLoading();
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      })
  }

  onClear() {
    this.router.navigate(['/work-space/search-user']);
  }

  toggleExpandGroup(group: any) {
    console.log('Toggled Expand Group!', group);
    // setTimeout(() => {
    //   this.table.bodyComponent.scroller.scrollWidth = this.table.bodyComponent.innerWidth;
    // }, 500)

    // this.table.groupHeader.toggleExpandGroup(group);
    // this.table.groupHeader.toggleExpandAll();
    this.table.groupHeader.toggleExpandGroup(group);


  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }

  onChangePage(event: number) {
    this.pages = event;
    const searchValue = this.getSearchValue(this.pages);
    this.tempSearch = this.tempSearch;
    this.loadPassageInformation(searchValue);
  }

  onAction(event: RowActionEventModel) {
    console.info(event);
    const modalRef = this.ngbModal.open(PassageInfoModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
    });
    modalRef.componentInstance.row = event.row;
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[onAction] result => ', result);
          if(result && this.tempSearch) this.loadPassageInformation(this.tempSearch);
        }
      },
      (reason) => {
        console.log('[onAction] reason => ', reason);
      }
    );
  }

}
