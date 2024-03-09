import { Component, Input, OnInit } from '@angular/core';
import { first, map, Observable, zip } from 'rxjs';
import { CarInfoModel, CustomColumnModel, ObuInfoModel, ReponseCustomerObuModel, ReponseWalletSummaryModel, RowActionEventModel, WalletSummaryModel } from '../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../core/services';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent implements OnInit {

  @Input() public customerId: string | null = null;

  public activeTab: 'active' | 'unactive' | undefined;

  public limitRow: number = 5;
  public pages: number = 1;
  public collectionSize: number = 0;
  public activeUsedColumns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: '#', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'licensePlate', name: 'licensePlate', label: 'ทะเบียนรถ', prop: 'licensePlate', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'brand', name: 'Brand', label: 'ยี่ห้อ', prop: 'brand', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'model', name: 'Model', label: 'รุ่น', prop: 'model', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'yearRegistration', name: 'yearRegistration', label: 'ปีจดทะเบียน', prop: 'yearRegistration', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'smartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'walletId', name: 'Wallet ID', label: 'หมายเลขกระเป๋าเงินที่ผูก', prop: 'walletId', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'edit', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public unactiveUsedColumns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: '#', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'licensePlate', name: 'licensePlate', label: 'ทะเบียนรถ', prop: 'licensePlate', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'brand', name: 'Brand', label: 'ยี่ห้อ', prop: 'brand', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'model', name: 'Model', label: 'รุ่น', prop: 'model', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'yearRegistration', name: 'yearRegistration', label: 'ปีจดทะเบียน', prop: 'yearRegistration', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuSerialNo', name: 'OBU serial no.', label: 'OBU serial no.', prop: 'obuPan', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardSerialNo', name: 'Smart card serial no.', label: 'Smart card serial no.', prop: 'smartcardNo', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'edit', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public activeRows: CarInfoModel[] = [];
  public unactiveRows: CarInfoModel[] = [];

  public isLoading: boolean = false;

  constructor(
    private restApiService: RestApiService
  ) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    zip(
      this.getActive(),
      this.getUnactive()
    )
    .subscribe({
      next: (res) => {
        this.setActive(res[0].lstSummary);
        this.setUnactive(res[1].obus);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getActive() {
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

  setActive(lstSummary: WalletSummaryModel[]) {
          const obus = lstSummary.flatMap(y => {
            let lstObus = [...y.lstObus];
            let newLstObus = lstObus
              .filter(x => Object.keys(x).length !== 0)
              .map(x => {
                  let newObu = x;
                      newObu.walletId = y.walletId;
                  return newObu;
                });
            return newLstObus;
          });
          const cars = lstSummary.flatMap(y => {
            const lstCars = [...y.lstCars];
            const newLstCars = lstCars
                .filter(x => Object.keys(x).length !== 0)
                .map(x => {
                  let newCar = x;
                      newCar.walletId = y.walletId;
                  let obu = obus.find(z => z.walletId === x.walletId && z.index === x.index);
                  if (obu) {
                    newCar.smartcardNo = obu.smartcardNo;
                    newCar.obuPan = obu.obuPan;
                  }
                  return newCar;
                });
            return newLstCars;
          });
          this.activeRows = [...cars];
  }

  getUnactive() {
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

  setUnactive(obus: [ ObuInfoModel, CarInfoModel ][]) {
    const newCars = obus
      .filter(x => x.length >= 2)
      .map(x => {
        let newCar = x[1];
        newCar.smartcardNo = x[0].smartcardNo;
        newCar.obuPan = x[0].obuPan;
        return newCar;
      });
    this.unactiveRows = [...newCars];
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
