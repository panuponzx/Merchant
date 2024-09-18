import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CustomColumnModel, ObuInfoModel, ReponseWalletSummaryModel, RowActionEventModel, WalletSummaryModel, CustomerModel, IResponseFaremediaModel, IFaremediaModel, IWalletInfoModel } from 'src/app/core/interfaces';
import { first, map, firstValueFrom } from 'rxjs';
import { RestApiService } from '../../../../../../../../core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddWalletModalComponent } from '../../../../modals/add-wallet-modal/add-wallet-modal.component';
import { EditCarModalComponent } from '../../../../modals/edit-car-modal/edit-car-modal.component';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrl: './wallet-info.component.scss'
})
export class WalletInfoComponent implements OnInit {

  @Input() public customerId: string | null = null;
  @Input() public customerTypeId: string | null = null;
  @Input() public customer: CustomerModel | undefined;
  @Input() public wallets: IWalletInfoModel[] = [];

  public activeUsedColumns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'carModel', name: 'carModel', label: 'ยี่ห้อ', prop: 'carModel', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'model', name: 'Model', label: 'รุ่น', prop: 'carSubmodel', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'color', name: 'Color', label: 'สีรถ', prop: 'carColor', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'licensePlate', name: 'licensePlate', label: 'หมายเลขทะเบียนรถ', prop: 'plateNo', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'yearRegistration', name: 'yearRegistration', label: 'ปีจดทะเบียน', prop: 'carYear', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'faremediaValue', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'walletSmartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'faremediaStatus', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'edit', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public walletList: any[] = [];
  public fareMediaList: any[] = [];
  public defaultWalletList: any[] = [];
  public isLoading: boolean = false;
  public search: string | undefined;

  public pageSize: number = 5;
  public pages: number = 1;

  constructor(
    private restApiService: RestApiService,
    private ngbModal: NgbModal,
    private modalDialogService: ModalDialogService
  ) {

  }

  ngOnInit(): void {
    this.setWallet(this.wallets);

    // const modalRef = this.ngbModal.open(CancelObuModalComponent, {
    //   windowClass: 'cancel-car-modal',
    //   centered: true,
    //   size: 'md',
    //   scrollable: true,
    //   keyboard: false,
    // });
    // modalRef.result.then(
    //   (result) => {
    //     if (result) {
    //       console.log('[showTableModal] result => ', result);
    //     }
    //   },
    //   (reason) => {
    //     console.log('[showTableModal] reason => ', reason);
    //   }
    // );
  }

  onChangeSearch(event: any) {
    this.walletList = this.defaultWalletList.filter((x: any) => x.walletId.toString().includes(event) || x.walletName.toLowerCase().includes(event.toLowerCase()));
  }

  setWallet(lstSummary: IWalletInfoModel[]) {
    let walletArr: any = [];
    lstSummary.forEach((wallet) => {
      walletArr.push({
        totalBalance: wallet.totalBalance,
        totalPoint: wallet.totalPoint,
        totalPointBalance: wallet.totalPointBalance,
        walletId: wallet.id,
        walletName: wallet.name,
        walletStatus: wallet.statusId,
        walletTypeId: wallet.typeId,
        walletTypeName: wallet.typeName,
        walletLastUse: wallet.lastUse,
        isCollapsed: true,
      });
    });
    this.defaultWalletList = [...walletArr];
    this.walletList = [...walletArr];
    this.walletList?.sort((a: any, b: any) => a.walletId - b.walletId);
    console.log("[setWallet] walletList => ", this.walletList);
  }

  loadFareMediaDataTable(row: any) {
    console.log("[loadFareMediaDataTable] walletList => ", row);
    if (!row.isCollapsed) {
      this.fareMediaList[row?.walletId] = [];
      if (row?.walletId && !row?.isCollapsed) {
        this.modalDialogService.loading();
        const mockupData = {
          walletId: row.walletId,
          page: this.pages,
          limit: this.pageSize
        };
        this.restApiService
          .postBackOffice('faremedia/get/wallet-id', mockupData)
          .pipe(
            first(),
            map(res => res as any)
          ).subscribe({
            next: (res) => {
              // this.collectionSize = res.data.totalElements;
              this.setFareMedia(res.data.elements, res.data.totalElements, row.walletId);
              this.modalDialogService.hideLoading();
              this.isLoading = false;
            },
            error: (error) => {
              this.modalDialogService.hideLoading();
              console.error(error);
              this.modalDialogService.handleError(error);
            }
          });
      }
    }
  }

  setFareMedia(data: any, total: number, walletId: any) {
    let faremedia: any = [];
    for (const index of Object.keys(data)) {
      let faremediaIndex = data[index];
      faremedia.push(faremediaIndex);
    }
    if (faremedia.length > 0) {
      faremedia.forEach((wallet: any) => {
        const walletOBU = wallet.filter((wallet: any) =>
          wallet.faremediaType?.toLowerCase().includes("obu")
        );
        const walletSmartcard = wallet.filter((wallet: any) =>
          wallet.faremediaType?.toLowerCase().includes("smart card")
        );
        this.fareMediaList[walletId].push({ ...walletOBU[0], ...{ walletSmartcardNo: walletSmartcard[0]?.faremediaValue } });
        this.fareMediaList[walletId].collectionSize = total;
      });
    }
    // console.log(this.fareMediaList[walletId]);
    console.log(this.fareMediaList);
  }

  onAddWallet() {
    const modalRef = this.ngbModal.open(AddWalletModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
    });
    modalRef.componentInstance.customerId = this.customerId;
    modalRef.componentInstance.customerTypeId = this.customerTypeId;
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[onAddWallet] result => ', result);
          // this.loadWalletInfo();
          window.location.reload();
        }
      },
      (reason) => {
        console.log('[onAddWallet] reason => ', reason);
      }
    );
  }

  onChangePage(event: number, row: any) {
    console.log("[onChangePage] event => ", event);
    this.pages = event;
    row.isCollapsed = false;
    this.loadFareMediaDataTable(row);
  }

  onAction(event: RowActionEventModel, walletId?: number) {
    console.info("onAction edit car", event);
    const modalRef = this.ngbModal.open(EditCarModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
    });
    modalRef.componentInstance.carInfo = event.row;
    modalRef.componentInstance.customer = this.customer;
    modalRef.componentInstance.walletIdList = this.walletList.map((x) => x.walletId);
    modalRef.componentInstance.walletId = walletId;
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[showTableModal] result => ', result);
          // this.loadWalletInfo();
          window.location.reload();
        }
      },
      (reason) => {
        console.log('[showTableModal] reason => ', reason);
      }
    );
  }

  onSuspendWallet(walletId: number) {
    console.log("[onSuspendWallet] walletId => ", walletId);
  }

  onBlacklistWallet(walletId: number) {
    console.log("[onBlacklistWallet] walletId => ", walletId);
    Swal.fire({
      title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการปิดกระเป๋า</h2>',
      html: '<label>กรุณายืนยัน</label>',
      showCancelButton: true,
      customClass: {
        confirmButton: "custom-btn btn-type-1 red ms-2",
        cancelButton: "custom-btn btn-type-1 outline"
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      confirmButtonText: "ปิดกระเป๋า",
      cancelButtonText: "กลับ",
      reverseButtons: true,
      preConfirm: async () => {
        try {
          const payload = {
            wallet: {
              id: walletId,
            },
          };
          await firstValueFrom(this.restApiService.post('wallet/blacklist', payload).pipe(first()))
        } catch (error: any) {
          console.error(error);
          if (error instanceof HttpResponse) {
            Swal.showValidationMessage(`
            Request failed: ${error.body?.errorMessage}
          `);
          }
          else {
            Swal.showValidationMessage(`Some thing failed`);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }

}
