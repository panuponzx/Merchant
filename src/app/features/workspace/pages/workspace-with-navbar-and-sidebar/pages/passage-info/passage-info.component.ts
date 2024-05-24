import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Observable, zip } from 'rxjs';
import { CustomColumnModel, CustomeActivatedRouteModel, CustomerModel, ReponseCustomerModel, ReponseWalletSummaryModel, RowActionEventModel, WalletSummaryModel, PassageInformationPayloadModel, ResponsePassageInformationModel, IPassageModel, IPaginationModel, ResponseModel } from '../../../../../../core/interfaces';
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

  public rows: any[] = [];
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(undefined, [Validators.required]),
    endDate: new FormControl(undefined, [Validators.required]),
    walletId: new FormControl(undefined, [Validators.required])
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
            this.wallets = [...info[1].lstSummary];
          }
          this.modalDialogService.hideLoading();
          this.isLoading = false;
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage ? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
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
    const searchValue = this.getSearchValue(this.pages);
    this.tempSearch = searchValue;
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
      limit: this.limitRow
    };
    const walletName = this.wallets.find((w) => w.walletId === data.walletId)?.walletName;
    this.restApiService
      .postBackOffice('transaction-history/get-passage', mockupData)
      .pipe(
        first(),
        map(res => res as ResponseModel<IPaginationModel<IPassageModel[]>>)
      )
      .subscribe({
        next: (res) => {
          console.log("payload passage", res)
          this.rows = res.data.elements.map((item) => {
            return {
              ...item,
              group: item.entryHq + " - " + item.exitHq,
              amount: item.amount,
              walletName: walletName
            }
          })
          this.collectionSize = res.data.totalElements;
          this.isLoadingSearch = false;
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          console.error(err);
          this.tempSearch = undefined;
          this.isLoadingSearch = false;
          this.modalDialogService.hideLoading();
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage ? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      })
  }

  sumAmount(data: IPassageModel[]) {
    const num =  data.reduce((acc, item) => {
      return acc + item.amount
    }, 0)
    return ((Math.round(num * 100) / 100)*-1).toFixed(2);
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
