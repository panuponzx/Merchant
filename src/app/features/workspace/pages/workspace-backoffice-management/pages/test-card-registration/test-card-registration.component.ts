import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, zip } from 'rxjs';
import { CustomColumnModel, RowActionEventModel } from 'src/app/core/interfaces';
import { ITestFaremediaInfoResponseModel } from 'src/app/core/interfaces/response.interface';
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

  public activeTab: 'waiting-for-approval' | 'approval' | 'reject' | string | null = 'waiting-for-approval';
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
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'status', name: 'status', label: 'สถานะ', prop: 'status', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-primary', textCondition1: 'Active', classCondition2: ' text-red', textCondition2: 'In Active' } },
    { id: 'isReserved', name: 'isReserved', label: 'สถานะการจอง', prop: 'isReserved', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-red', textCondition1: 'จอง', classCondition2: 'text-primary ', textCondition2: 'ว่าง' } },
    { id: 'withdrawOrBorrow', name: 'withdrawOrBorrow', label: 'เบิก / ยืม', prop: 'isReserved', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'เบิก/ยืม', conditionDisable: true, mainCondition: false, mainProperty: "status" } },
    { id: 'returnObu', name: 'returnObu', label: 'คืน OBU', prop: 'isReserved', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'คืน', conditionDisable: false, mainCondition: false, mainProperty: "status", class: 'btn-success' } },
    { id: 'detail', name: 'detail', label: 'รายงานการเบิกยืมคืน', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'รายงาน', class: 'btn-link' } },

  ];
  public columnsDetail: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'name', name: 'name', label: 'ชื่อ-นามสกุล', prop: 'name', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'institute', name: 'institute', label: 'หน่วยงาน', prop: 'institute', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'withdrawOrBorrowDate', name: 'withdrawOrBorrowDate', label: 'วันที่ทำการเบิก/ยืม', prop: 'createdDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'ExpectedReturnDate', name: 'ExpectedReturnDate', label: 'วันที่ทำการคาดว่าจะคืน', prop: 'expectedReturnDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'ReturnDate', name: 'ReturnDate', label: 'วันที่ทำการคืน', prop: 'returnDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'remark', name: 'remark', label: 'หมายเหตุ', prop: 'remark', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
  ];
  public columnsSearch: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'walletId', name: 'walletId', label: 'walletId', prop: 'walletId', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'isActive', name: 'isActive', label: 'เป็นบัตรทดสอบ', prop: 'isActive', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'checkbox' },
  ];

  public detailRows: any = [];
  public filterSearchRows: any = [];
  public changeStatus: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal
  ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
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

  async onActive(event: RowActionEventModel) {
    var row = event.row;
    console.log('action: ', event.action);
    if (event.action === "detail") {
      this.isOpenDetail = true;
      zip(
        await this.loadTestFaremediaInfoList(row.faremediaValue)
      ).pipe().subscribe({
        next: (info) => {
          console.log('info: ', info);
          if (info[0].data) {
            this.detailRows = info[0].data.elements;
          }
        },
        error: (err) => {
          console.error(err);
          this.modalDialogService.handleError(err);
        }
      });
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
            await this.loadTestFaremediaInfo();
          }
        },
        async (reason) => {
          await this.loadTestFaremediaInfo();
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
        async (result) => {
          modalRef.close();
          if (result !== null) {
            await this.loadTestFaremediaInfo();
          }
        },
        async (reason) => {
          await this.loadTestFaremediaInfo();
        }
      );
    } else if (event.action === "isActive") {
      const index = this.changeStatus.findIndex((existingRow: { faremediaValue: any; }) => existingRow.faremediaValue === row.faremediaValue);
      if (index === -1) {
        this.changeStatus.push(row);
      } else {
        this.changeStatus.splice(index, 1);
      }
      console.log(this.changeStatus)
    }
  }
  onChangeStatus() {
    this.changeStatus.forEach((item: { faremediaValue: any; }) => {
      const index = this.rows.findIndex((existingRow: { faremediaValue: any; }) => existingRow.faremediaValue === item.faremediaValue);
      this.rows[index].isActive = !this.rows[index].isActive;
    });
    this.changeStatus = [];
    this.clearSearch();
  }
  async RegisterFormModal() {
    const modalRef = this.ngbModal.open(RegisterCardComponent, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.result.then(
      async (result) => {
         this.loadTestFaremediaInfo();
      },
      async (reason) => {
        await this.loadTestFaremediaInfo();
      }
    );
  }
  backToMain() {
    this.isOpenDetail = false;
  }
  onSearch() {
    this.isSearch = true;
    this.filterSearchRows = this.rows.filter((row: { faremediaValue: string; }) => row.faremediaValue.startsWith(this.form.value.search));
  }
  clearSearch() {
    this.form.patchValue({ search: '' });
    this.isSearch = false;
  }
  async loadTestFaremediaInfo() {
    console.log("[loadCustomerInfo]");
    this.isLoading = true;
    this.modalDialogService.loading();
    zip(
      await this.loadTestFaremidia()
    )
      .pipe()
      .subscribe(
        {
          next: (info) => {
            console.log("[loadCustomerInfo] hideLoading");
            console.log('info: ', info);
            if (info[0].data) {
              this.rows = info[0].data.elements;
              this.collectionSize = info[0].data.totalElements;
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
  loadTestFaremidia() {
    const mockupData = {
      page: this.pageFaremediaInfo,
      limit: 10
    };
    return this.restApiService.postBackOffice('faremedia/get/test-obu', mockupData) as Observable<ITestFaremediaInfoResponseModel>;
  }
  loadTestFaremediaInfoList(faremediaValue: string) {
    const mockupData = {
      faremediaValue: faremediaValue,
      page: 1,
      limit: 10
    };
    return this.restApiService.postBackOffice('faremedia/get-faremedia-test-histories', mockupData) as Observable<ITestFaremediaInfoResponseModel>;
  }
  async onChangePageInfo(page: number) {
    this.pageFaremediaInfo = page;
    console.log('page: ', page);
    await this.loadTestFaremediaInfo();
  }
  async onChagePageFaremediaInfoList(page: number) {
    this.pageFaremediaInfoList = page;
    console.log('page: ', page);
    await this.loadTestFaremediaInfoList(this.detailRows[0].faremediaValue);
  }
}
