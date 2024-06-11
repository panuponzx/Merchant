import { Component, Input, OnInit } from '@angular/core';
import { CustomColumnModel, ObuInfoModel, ReponseWalletSummaryModel, RowActionEventModel, WalletSummaryModel, CustomerModel } from 'src/app/core/interfaces';
import { first, map } from 'rxjs';
import { RestApiService } from '../../../../../../../../core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddWalletModalComponent } from '../../../../modals/add-wallet-modal/add-wallet-modal.component';
import { EditCarModalComponent } from '../../../../modals/edit-car-modal/edit-car-modal.component';
import { FairmediaStatusPipe } from 'src/app/core/pipes/fairmedia-status.pipe';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrl: './wallet-info.component.scss'
})
export class WalletInfoComponent implements OnInit {

  @Input() public customerId: string | null = null;
  @Input() public customerTypeId: string | null = null;
  @Input() public customer: CustomerModel | undefined;

  // public isCollapsedPrepaid: boolean = true;
  // public isCollapsedPostpaid: boolean = true;
  // public isCollapsedDirectCredit: boolean = true;
  // public isCollapsedType9: boolean = true;

  public activeUsedColumns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'ลำดับ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'brand', name: 'Brand', label: 'ยี่ห้อ', prop: 'brand', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'model', name: 'Model', label: 'รุ่น', prop: 'model', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'color', name: 'Color', label: 'สีรถ', prop: 'color', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'licensePlate', name: 'licensePlate', label: 'หมายเลขทะเบียนรถ', prop: 'licensePlate', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'yearRegistration', name: 'yearRegistration', label: 'ปีจดทะเบียน', prop: 'yearRegistration', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'smartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'obuStatusText', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'edit', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public walletList: any[] = [];
  public defaultWalletList: any[] = [];
  public isLoading: boolean = false;
  public search: string | undefined;

  public limitRow: number = 5;
  public pages: number = 1;

  constructor(
    private restApiService: RestApiService,
    private ngbModal: NgbModal,
    private fairmediaStatusPipe: FairmediaStatusPipe,
    private modalDialogService: ModalDialogService
    ) {

  }


  ngOnInit(): void {
    this.loadWalletInfo();
  }

  loadWalletInfo() {
    this.modalDialogService.loading();
    const mockupData = {
      id: this.customerId,
    };
    return this.restApiService
      .post('get-summary', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseWalletSummaryModel)
      ).subscribe({
        next: (res) => {
          console.log("[loadWalletInfo] res => ", res);
          this.setWallet(res.lstSummary);
          this.modalDialogService.hideLoading();
          this.isLoading = false;
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.handleError(err);
          // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

  onChangeSearch() {
    if (this.search) {
      this.walletList = [...this.defaultWalletList]
        .filter(y => {
          if (y && y.row) {
            const isMatch = y.row.findIndex((x: any) => x.obuPan.match(this.search) || x.smartcardNo.match(this.search)) !== -1;
            if (isMatch) {
              return y;
            }
          }
        });
    } else {
      this.walletList = [...this.defaultWalletList];
    }
  }

  setWallet(lstSummary: WalletSummaryModel[]) {
    let walletArr: any = [];
    lstSummary.forEach((wallet) => {
      wallet.lstObus.forEach((obu: any) => {
        wallet.lstCars.filter((car: any) => {
          if (car.index === obu.index) {
            const hasDuplicateId = walletArr.some((value: any) => value.walletId === wallet.walletId);
            if (!hasDuplicateId) {
              const mergedArray = wallet.lstCars.reduce((acc: any, obj1) => {
                const matchingObj2 = wallet.lstObus.find(obj2 => obj2.index === obj1.index);
                if (matchingObj2) {
                  matchingObj2.obuStatusText = this.fairmediaStatusPipe.transform(matchingObj2.obuStatus);
                  console.log("[setWallet] matchingObj2 => ", matchingObj2);
                  acc.push({ ...obj1, ...matchingObj2, walletId: wallet.walletId});
                }
                return acc;
              }, []);
              walletArr.push({
                lstCars: wallet.lstCars,
                lstObus: wallet.lstObus,
                row: Object.keys(car).length === 0 || Object.keys(obu).length === 0 ? [] : mergedArray,
                totalBalance: wallet.totalBalance,
                totalPoint: wallet.totalPoint,
                totalPointBalance: wallet.totalPointBalance,
                walletId: wallet.walletId,
                walletName: wallet.walletName,
                walletStatus: wallet.walletStatus,
                walletTypeId: wallet.walletTypeId,
                walletTypeName: wallet.walletTypeName,
                isCollapsed: true,
              });
            }
          }
        });
      })
    });
    this.defaultWalletList = [...walletArr];
    this.walletList = [...walletArr];
    console.log("[setWallet] walletList => ", this.walletList);
  }

  onAddWallet() {
    const modalRef = this.ngbModal.open(AddWalletModalComponent, {
      centered: true,
      backdrop: 'static',
      // size: 'xl',
      keyboard: false,
    });
    modalRef.componentInstance.customerId = this.customerId;
    modalRef.componentInstance.customerTypeId = this.customerTypeId;
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[onAddWallet] result => ', result);
          this.loadWalletInfo();
        }
      },
      (reason) => {
        console.log('[onAddWallet] reason => ', reason);
      }
    );
  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
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
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('[showTableModal] result => ', result);
          this.loadWalletInfo();
        }
      },
      (reason) => {
        console.log('[showTableModal] reason => ', reason);
      }
    );
  }

}
