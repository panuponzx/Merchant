import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CustomColumnModel, RowActionEventModel } from 'src/app/core/interfaces';
import { IChangeStatusTestFaremediaResponseModel, ISearchTestFaremediaInfoResponseModel, ITestFaremediaInfoResponseModel } from 'src/app/core/interfaces/response.interface';
import { BorrowingModalComponent } from 'src/app/core/modals/borrowing-modal/borrowing-modal.component';
import { RegisterCardComponent } from 'src/app/core/modals/register-card/register-card.component';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-test-card-registration',
  templateUrl: './test-card-registration.component.html',
  styleUrls: ['./test-card-registration.component.scss']
})
export class TestCardRegistrationComponent {
  public approval: number = 1;
  public pages: number = 1;
  public pageFaremediaInfo: number = 1;
  public pageFaremediaInfoList: number = 1;
  public submitted: boolean = false;
  public form: FormGroup;
  public isLoading: boolean = false;
  public collectionSize: number = 0;
  public limitRow: number = 10;
  public isSearch: boolean = false;
  public isHiddenFillter: boolean = false;
  public rows: any = [];
  public tempRows: any = [];
  public isOpenDetail: boolean = false;
  public maxDate: Date = new Date();
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'status', name: 'status', label: 'สถานะ', prop: 'faremediaStatus', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'isReserved', name: 'isReserved', label: 'สถานะการจอง', prop: 'isReserved', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-red', textCondition1: 'จอง', classCondition2: 'text-primary ', textCondition2: 'ว่าง' } },
    { id: 'withdrawOrBorrow', name: 'withdrawOrBorrow', label: 'เบิก / ยืม', prop: 'isReserved', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'เบิก/ยืม', conditionDisable: true, mainCondition: false, mainProperty: "status" } },
    { id: 'returnObu', name: 'returnObu', label: 'คืน OBU', prop: 'isReserved', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'คืน', conditionDisable: false, mainCondition: false, mainProperty: "status", class: 'btn-success' } },
    { id: 'detail', name: 'detail', label: 'รายงานการเบิกยืมคืน', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'รายงาน', class: 'btn-link' } },

  ];
  public columnsDetail: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'name', name: 'name', label: 'ชื่อ-นามสกุล', prop: 'name', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'institute', name: 'institute', label: 'หน่วยงาน', prop: 'institute', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'withdrawOrBorrowDate', name: 'withdrawOrBorrowDate', label: 'วันที่ทำการเบิก/ยืม', prop: 'createdDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'ExpectedReturnDate', name: 'ExpectedReturnDate', label: 'วันที่ทำการคาดว่าจะคืน', prop: 'expectedReturnDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'ReturnDate', name: 'ReturnDate', label: 'วันที่ทำการคืน', prop: 'returnDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'remark', name: 'remark', label: 'หมายเหตุ', prop: 'remark', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
  ];
  public columnsSearch: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'walletId', name: 'walletId', label: 'walletId', prop: 'walletId', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'isActive', name: 'isActive', label: 'เป็นบัตรทดสอบ', prop: 'status', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'checkbox' },
  ];

  public detailRows: any = [];
  public collectionSizeDetail: number = 0;
  public filterSearchRows: any = [];
  public collectionSizeSearch: number = 0;
  public pagefilterSearchRows: number = 1;
  public changeStatus: any = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal
  ) {
    this.form = new FormGroup({
      search: new FormControl({ value: undefined, disabled: false }, [Validators.required])
    });
  }
  ngOnInit(): void {
    this.loadTestFaremediaInfo();

  }


  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/approval-cancel-device/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onActive(event: RowActionEventModel) {
    var row = event.row;
    console.log('action: ', event.action);
    if (event.action === "detail") {
      this.isOpenDetail = true;
      this.loadTestFaremediaInfoList(row.faremediaValue)

    } else if (event.action === "withdrawOrBorrow") {

      const modalRef = this.ngbModal.open(BorrowingModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });
      modalRef.componentInstance.actionType = "borrow";
      modalRef.componentInstance.title = "การยืม OBU";
      modalRef.componentInstance.faremediaValue = row.faremediaValue
      modalRef.result.then(
        async (result) => {
          modalRef.close();
          console.log('result: ', result);
          if (result !== null) {
            this.loadTestFaremediaInfo();
          }
        },
        async (_) => {
          this.loadTestFaremediaInfo();
        }
      );
    } else if (event.action === "returnObu") {
      const modalRef = this.ngbModal.open(BorrowingModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });
      modalRef.componentInstance.title = "การคืน OBU";
      modalRef.componentInstance.actionType = "return";
      modalRef.componentInstance.faremediaValue = row.faremediaValue
      modalRef.result.then(
        (result) => {
          modalRef.close();
          if (result !== null) {
            this.loadTestFaremediaInfo();
          }
        },
        (_) => {
          this.loadTestFaremediaInfo();
        }
      );
    } else if (event.action === "isActive") {
      const index = this.changeStatus.findIndex((existingRow: { faremediaValue: any; }) => existingRow.faremediaValue === row.faremediaValue);
      if (index === -1) {
        this.changeStatus.push(row);
      } else {
        this.changeStatus.splice(index, 1);
      }
    }
  }
  onChangeStatus() {
    if (this.changeStatus.length > 0) {
      this.isLoading = true;
      this.modalDialogService.loading();
      this.changeStatusTestFaremedia().subscribe(
        {
          next: (_) => {
            this.isLoading = false;
            this.modalDialogService.hideLoading();
            this.loadSearchTestFaremediaWithWalletId();
            this.changeStatus = [];
            this.modalDialogService.info("success", "#2255CE", "เปลี่ยนสถานะสำเร็จ");
            this.loadTestFaremediaInfo();
            this.isSearch = false;

          },
          error: (error) => {
            this.isLoading = false;
            this.modalDialogService.handleError(error);
            this.modalDialogService.hideLoading();
          }
        });
    }
  }
  changeStatusTestFaremedia() {
    const mockupData = {
      faremediaValues: this.changeStatus.map((row: any) => row.faremediaValue)
    };
    return this.restApiService.postBackOffice('faremedia/change-status-test-faremedia', mockupData) as Observable<IChangeStatusTestFaremediaResponseModel>;
  }
  RegisterFormModal() {
    const modalRef = this.ngbModal.open(RegisterCardComponent, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.result.then(
      (res) => {
        console.log('res: ', res);
        if (res) {
          this.loadTestFaremediaInfo();
        }
      },
      (_) => {
        this.loadTestFaremediaInfo();
      }
    );
  }
  backToMain() {
    this.isOpenDetail = false;
    this.pageFaremediaInfoList = 1;
  }
  clearSearch() {
    this.form.patchValue({ search: '' });
    this.isSearch = false;
    this.filterSearchRows = [];
    this.collectionSizeSearch = 0;
    this.pagefilterSearchRows = 1;
  }
  loadTestFaremediaInfo() {
    console.log("[loadTestFaremediaInfo]");
    this.isLoading = true;
    this.modalDialogService.loading();

    this.loadTestFaremidia()
      .subscribe(
        {
          next: (info) => {
            console.log("[loadTestFaremediaInfo] hideLoading");
            console.log('info: ', info);
            if (info.data) {
              this.rows = info.data.elements;
              this.collectionSize = info.data.totalElements;
            }
            this.modalDialogService.hideLoading();
            this.isLoading = false;
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            this.modalDialogService.handleError(err);
          }
        }
      )
  }
  loadTestFaremediaInfoList(faremediaValue: string) {
    console.log("[loadTestFaremediaInfoList]");
    this.isLoading = true;
    this.modalDialogService.loading();
    this.loadTestFaremediaList(faremediaValue)
      .subscribe(
        {
          next: (info) => {
            console.log("[loadTestFaremediaInfoList] hideLoading");
            console.log('info: ', info);
            if (info.data) {
              this.detailRows = info.data.elements;
              this.collectionSizeDetail = info.data.totalElements;
            }
            this.modalDialogService.hideLoading();
            this.isLoading = false;
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            console.error(err);
            this.modalDialogService.handleError(err);
          }
        }
      )
  }
  onSearchFaremediaWithWalletId() {
    this.isLoading = true;
    this.isSearch = true;
    this.modalDialogService.loading();
    this.loadSearchTestFaremediaWithWalletId()
      .subscribe(
        {
          next: (info) => {
            console.log("[onSearchFaremediaWithWalletId] hideLoading");
            if (info.data) {
              this.filterSearchRows = info.data.elements;
              this.collectionSizeSearch = info.data.totalElements;
            }
            this.modalDialogService.hideLoading();
            this.isLoading = false;
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            this.modalDialogService.handleError(err);
          }
        }
      )
  }
  loadTestFaremidia() {
    const mockupData = {
      page: this.pageFaremediaInfo,
      limit: 10
    };
    return this.restApiService.postBackOffice('faremedia/get/test-obu', mockupData) as Observable<ITestFaremediaInfoResponseModel>;
  }
  loadTestFaremediaList(faremediaValue: string) {
    const mockupData = {
      faremediaValue: faremediaValue,
      page: this.pageFaremediaInfoList,
      limit: 20
    };
    return this.restApiService.postBackOffice('faremedia/get-faremedia-test-histories', mockupData) as Observable<ITestFaremediaInfoResponseModel>;
  }
  onChangePageInfo(page: number) {
    this.pageFaremediaInfo = page;
    console.log('page: ', page);
    this.loadTestFaremediaInfo();
  }
  onChagePageFaremediaInfoList(page: number) {
    this.pageFaremediaInfoList = page;
    console.log('page: ', page);
    this.loadTestFaremediaInfoList(this.detailRows[0].faremediaValue);
  }
  onChangePageSearch(page: number) {
    this.pagefilterSearchRows = page;
    this.loadSearchTestFaremediaWithWalletId();
  }
  loadSearchTestFaremediaWithWalletId() {
    const mockupData = {
      faremediaValue: this.form.value.search,
      page: this.pagefilterSearchRows,
      limit: 10
    };
    return this.restApiService.postBackOffice('faremedia/search-faremedia-test-with-wallet-id', mockupData) as Observable<ISearchTestFaremediaInfoResponseModel>;
  }
}
