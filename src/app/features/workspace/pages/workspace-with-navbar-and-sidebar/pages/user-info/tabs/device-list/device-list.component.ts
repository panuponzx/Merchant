import { Component, Input, OnInit } from '@angular/core';
import { first, forkJoin, map, Observable, zip } from 'rxjs';
import { CarInfoModel, CustomColumnModel, IFaremediaModel, IResponseFaremediaModel, ObuInfoModel, ReponseCustomerObuModel, ReponseWalletSummaryModel, RowActionEventModel, WalletSummaryModel } from '../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../core/services';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent implements OnInit {

  @Input() public customerId: string | null = null;
  @Input() public customerTypeId: string | null = null;

  public activeTab: 'active' | 'inactive' | undefined;

  public limitRow: number = 5;
  public pages: number = 1;
  public collectionSize: number = 0;
  public activeUsedColumns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: '#', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'licensePlate', name: 'licensePlate', label: 'ทะเบียนรถ', prop: 'carLicensePlate', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'brand', name: 'Brand', label: 'ยี่ห้อ', prop: 'carBrand', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'model', name: 'Model', label: 'รุ่น', prop: 'carModel', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'yearRegistration', name: 'yearRegistration', label: 'ปีจดทะเบียน', prop: 'carYearRegistration', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'obuNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'smartCardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'walletId', name: 'Wallet ID', label: 'หมายเลขกระเป๋าเงินที่ผูก', prop: 'walletName', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'edit', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public inactiveUsedColumns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: '#', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'licensePlate', name: 'licensePlate', label: 'ทะเบียนรถ', prop: 'carLicensePlate', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'brand', name: 'Brand', label: 'ยี่ห้อ', prop: 'carBrand', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'model', name: 'Model', label: 'รุ่น', prop: 'carModel', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'yearRegistration', name: 'yearRegistration', label: 'ปีจดทะเบียน', prop: 'carYearRegistration', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'obuNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'smartCardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'edit', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public activeRows: IFaremediaModel[] = [];
  public inactiveRows: IFaremediaModel[] = [];

  public isLoading: boolean = false;

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {

  }

  ngOnInit(): void {
    this.loadAllDevice();
  }

  loadAllDevice(): void {
    this.modalDialogService.loading();
    this.isLoading = true;
    forkJoin({
      active: this.loadDevice('active'),
      inactive: this.loadDevice('inactive'),
    }).subscribe({
      next: ({ active, inactive }) => {
       this.activeRows = active.data;
       this.inactiveRows = inactive.data;
       this.modalDialogService.hideLoading();
       this.isLoading = true;
      },
      error: error => {
        this.modalDialogService.hideLoading();
        this.isLoading = true;
        console.error(error);
      }
    });
  }

  // loadDevice(tab: string) {
  //   this.isLoading = true;
  //   const data = {
  //     requestParam: {
  //       reqId: "23498-sss-k339c-322s2",
  //       channelId: "4"
  //     }
  //   };
  //   return this.restApiService
  //     .post(`faremedia/get/${tab}/customer/${this.customerId}`, data)
  //     .pipe(
  //       first(),
  //       map(res => res as IResponseFaremediaModel)
  //     ).subscribe({
  //       next: (res) => {
  //         console.log("[loadActiveDevice] res => ", res);
  //         if (tab === 'active') this.activeRows = res.data;
  //         else if (tab === 'inactive') this.inactiveRows = res.data;
  //         this.isLoading = false;
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     });
  // }

  loadDevice(tab: string): Observable<IResponseFaremediaModel> {
    const data = {
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: "4"
      }
    };
    return this.restApiService
      .post(`faremedia/get/${tab}/customer/${this.customerId}`, data)
      .pipe(
        first(),
        map(res => res as IResponseFaremediaModel)
      );
  }

  // loadDevice() {
  //   this.isLoading = true;
  //   zip(
  //     this.loadWalletInfo(),
  //     this.loadCustomerObu()
  //   )
  //     .subscribe({
  //       next: (res) => {
  //         this.setActive(res[0].lstSummary);
  //         this.setinactive(res[1].obus);
  //         this.isLoading = false;
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     })
  // }

  loadWalletInfo() {
    const mockupData = {
      id: this.customerId,
      requestParam: {
        reqId: "23498-sss-k339c-322s2",
        channelId: "1"
      }
    };
    return this.restApiService
      .post('get-summary', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseWalletSummaryModel)
      );
  }

  // setActive(lstSummary: WalletSummaryModel[]) {
  //   const obus = lstSummary.flatMap(y => {
  //     let lstObus = [...y.lstObus];
  //     let newLstObus = lstObus
  //       .filter(x => Object.keys(x).length !== 0)
  //       .map(x => {
  //         let newObu = x;
  //         newObu.walletId = y.walletId;
  //         return newObu;
  //       });
  //     return newLstObus;
  //   });
  //   const cars = lstSummary.flatMap(y => {
  //     const lstCars = [...y.lstCars];
  //     const newLstCars = lstCars
  //       .filter(x => Object.keys(x).length !== 0)
  //       .map(x => {
  //         let newCar = x;
  //         newCar.walletId = y.walletId;
  //         let obu = obus.find(z => z.walletId === x.walletId && z.index === x.index);
  //         if (obu) {
  //           newCar.smartcardNo = obu.smartcardNo;
  //           newCar.obuPan = obu.obuPan;
  //         }
  //         return newCar;
  //       });
  //     return newLstCars;
  //   });
  //   this.activeRows = [...cars];
  // }

  loadCustomerObu() {
    const mockupData = {
      customer: {
        id: this.customerId,
        requestParam: {
          reqId: "23498-sss-k339c-322s2",
          channelId: "1"
        }
      }
    };
    return this.restApiService
      .post('get-customer-obu', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseCustomerObuModel)
      );
  }

  // setinactive(obus: [ObuInfoModel, CarInfoModel][]) {
  //   const newCars = obus
  //     .filter(x => x.length >= 2)
  //     .map(x => {
  //       let newCar = x[1];
  //       newCar.smartcardNo = x[0].smartcardNo;
  //       newCar.obuPan = x[0].obuPan;
  //       return newCar;
  //     });
  //   this.inactiveRows = [...newCars];
  // }

  onAddDevice() {

  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

  onChangeNav() {
    this.pages = 1;
  }

}
