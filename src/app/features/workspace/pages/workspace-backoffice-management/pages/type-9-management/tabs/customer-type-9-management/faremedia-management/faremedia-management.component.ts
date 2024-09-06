import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first, last, Observable } from 'rxjs';
import { CarInfoModel, CustomColumnModel, ICustomerType9Model, IResponseWalletWithFaremediaModel, IWalletWithFaremediaModel, RowActionEventModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { AddCarModalComponent } from 'src/app/features/workspace/pages/workspace-with-navbar-and-sidebar/modals/add-car-modal/add-car-modal.component';
import { AddWalletModalComponent } from 'src/app/features/workspace/pages/workspace-with-navbar-and-sidebar/modals/add-wallet-modal/add-wallet-modal.component';
import { EditCarModalComponent } from 'src/app/features/workspace/pages/workspace-with-navbar-and-sidebar/modals/edit-car-modal/edit-car-modal.component';
import { EditWalletModalComponent } from '../../../../../modals/edit-wallet-modal/edit-wallet-modal.component';
import { mode } from 'crypto-js';

@Component({
  selector: 'faremedia-management-component',
  templateUrl: './faremedia-management.component.html',
  styleUrl: './faremedia-management.component.scss'
})
export class FaremediaManagementComponent {
  @Input() public customerId: string = "ทดสอบ";
  @Input() public searchType: string = '';
  @Output() public back: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  public customerName: string = '';
  public isLoading: boolean = false;
  public limitRow: number = 10;
  public step: number = 0;
  public pages: number = 1;
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'id', name: 'id', label: 'wallet no.', prop: 'walletId', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'walletName', name: 'walletName', label: 'หมายเลขข้างรถ (ชื่อกระเป๋า)', prop: 'walletName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'OBU serial no.', prop: 'faremediaValue', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'faremediaStatusName', name: 'faremediaStatusName', label: 'สถานะ', prop: 'faremediaStatusName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'plateProvince', name: 'plateProvince', label: 'จังหวัด (ทะเบียนรถยนต์)', prop: 'plateProvince', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'plateNo', name: 'plateNo', label: 'หมายเลขทะเบียนรถ', prop: 'plateNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carModel', name: 'carModel', label: 'ยี่ห้อ', prop: 'carModel', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carSubModel', name: 'carSubModel', label: 'รุ่น', prop: 'carSubModel', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carColor', name: 'carColor', label: 'สี', prop: 'carColor', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carYear', name: 'carYear', label: 'ปีจดทะเบียน', prop: 'carYear', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'cardNo', name: 'cardNo', label: 'SmartCard no.', prop: 'cardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'detail', name: 'detail', label: 'การจัดการอุปกรณ์', prop: '', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'แก้ไขอุปกรณ์', label2: 'เพิ่มอุปกรณ์', label2Condition: 'faremediaValue', class: 'btn-link' } },
    { id: 'detailWallet', name: 'detailWallet', label: 'การจัดการกระเป๋า', prop: '', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'แก้ไขกระเป๋า', class: 'btn-link' } },

  ];
  public rows: IWalletWithFaremediaModel[] = [];
  public collectionSize: number = 0;

  constructor(
    private ngbModal: NgbModal,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {

  }
  ngOnInit() {
    this.loadWalletWithFaremedia();
  }

  handleOnBack() {
    this.back.emit(true);
  }
  onChangePage(page: number) {
    this.pages = page;
  }
  onActive(event: RowActionEventModel) {
    if (event.action === "detailWallet") {
      const modelRef = this.ngbModal.open(EditWalletModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      modelRef.componentInstance.walletId = event.row.walletId;
      modelRef.componentInstance.walletName = event.row.walletName;
      modelRef.componentInstance.walletTypeId = 9;
      modelRef.result.then(
        (result) => {
          if (result) {
            console.log('[onActive] result => ', result);
            window.location.reload();
          }
        },
        (reason) => {
          console.log('[onActive] reason => ', reason);
        }
      );
    }
    else if (event.row.faremediaValue) {
      const modelRef = this.ngbModal.open(EditCarModalComponent, {
        centered: true,
        backdrop: 'static',
        size: 'lg',
        keyboard: false
      });
      modelRef.componentInstance.walletId = event.row.walletId;
      modelRef.componentInstance.customerId = this.customerId;
      modelRef.componentInstance.canEditType = false;
      modelRef.componentInstance.isType9 = true;
      modelRef.componentInstance.walletName = event.row.walletName;
      var carInfo = {
        plateNo: event.row.plateNo,
        plateProvince: event.row.plateProvince,
        carModel: event.row.carModel,
        carSubmodel: event.row.carSubModel,
        carYear: event.row.carYear,
        faremediaValue: event.row.faremediaValue,
        walletSmartcardNo: event.row.cardNo,
        isType9: true,
        carColor: event.row.carColor,
        faremediaStatusId: event.row.faremediaStatus
      }
      modelRef.componentInstance.carInfo = carInfo;
      modelRef.componentInstance.walletIdList = this.rows.map((item) => item.walletId);
      modelRef.componentInstance.customer = {
        title: "",
        firstName: this.customerName,
        lastName: "",
      };
      modelRef.result.then(
        (result) => {
          if (result) {
            console.log('[onActive] result => ', result);
            window.location.reload();
          }
        },
        (reason) => {
          console.log('[onActive] reason => ', reason);
        }
      );
    }
    else {
      const modelRef = this.ngbModal.open(AddCarModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });
      modelRef.componentInstance.walletId = event.row.walletId;
      modelRef.componentInstance.customerId = this.customerId;
      modelRef.result.then(
        (result) => {
          if (result) {
            console.log('[onActive] result => ', result);
            this.loadWalletWithFaremedia();
          }
        },
        (reason) => {
          console.log('[onActive] reason => ', reason);
        }
      );
    }

  }
  onAddWallet() {
    const modalRef = this.ngbModal.open(AddWalletModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.customerId = this.customerId;
    modalRef.componentInstance.customerTypeId = 3;
    modalRef.componentInstance.customWalletType = [
      {
        id: 9,
        lable: "Type 9"
      }
    ]
    modalRef.componentInstance.fixedWalletType = 9;
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[onAddWallet] result => ', result);
          window.location.reload();
        }
      },
      (reason) => {
        console.log('[onAddWallet] reason => ', reason);
      }
    );
  }
  loadWalletWithFaremedia() {
    this.isLoading = true;
    if (this.searchType !== '') {
      this.modalDialogService.loading();
    }
    this._loadingWalletFaremedia().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        this.rows = response.data.pagination.elements;
        this.collectionSize = response.data.pagination.totalElements;
        this.pages = response.data.pagination.page;
        this.limitRow = response.data.pagination.pageSize;
        this.customerName = response.data.customerType9.name;
      },
      error: (error) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      }
    });
  }
  _loadingWalletFaremedia() {
    const payload = {
      search: this.customerId,
      page: this.pages,
      limit: this.limitRow,
      searchType: this.searchType !== '' ? this.searchType : null
    };
    return this.restApiService.postBackOffice('customer-type-9/get-wallet-with-faremedia', payload) as Observable<IResponseWalletWithFaremediaModel>;
  }
}
