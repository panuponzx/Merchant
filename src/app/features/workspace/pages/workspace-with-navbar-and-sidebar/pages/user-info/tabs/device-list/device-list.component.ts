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
    private modalDialogService: ModalDialogService,
  ) {

  }

  ngOnInit(): void {
    this.loadAllDevice();
  }

  async loadAllDevice(): Promise<void> {
    this.modalDialogService.loading();
    this.isLoading = true;
    try {
      await this.loadDevice('active');
      await this.loadDevice('inactive');
      this.modalDialogService.hideLoading();
      this.isLoading = false;
    } catch (error) {
      console.error(error);
      this.modalDialogService.hideLoading();
      this.isLoading = false;
    }
    // forkJoin({
    //   active: this.loadDevice('active'),
    //   inactive: this.loadDevice('inactive'),
    // }).subscribe({
    //   next: ({ active, inactive }) => {
    //    this.activeRows = active.data;
    //    this.inactiveRows = inactive.data;
    //    this.modalDialogService.hideLoading();
    //    this.isLoading = false;
    //   },
    //   error: error => {
    //     this.modalDialogService.hideLoading();
    //     this.isLoading = false;
    //     console.error(error);
    //     this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', `${error.body.errorMessage}`);
    //   }
    // });
  }

  async loadDevice(tab: string): Promise<IResponseFaremediaModel | undefined> {
    return new Promise((resolve) => {
      const data = {};
      this.restApiService
        .post(`faremedia/get/${tab}/customer/${this.customerId}`, data)
        .pipe(
          first(),
          map(res => res as IResponseFaremediaModel)
        ).subscribe({
          next: (data) => {
            if (tab === 'active') { this.activeRows = data.data; }
            if (tab === 'inactive') { this.inactiveRows = data.data; }
            resolve(data);
            //  this.modalDialogService.hideLoading();
            //  this.isLoading = false;
          },
          error: error => {
            resolve(undefined);
            // this.modalDialogService.hideLoading();
            // this.isLoading = false;
            console.error(error);
            if (!error.body?.errorMessage?.includes('No record found')) this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', `${error.body?.errorMessage}`);
          }
        });
    });
  }

  loadWalletInfo() {
    const mockupData = {
      id: this.customerId,
    };
    return this.restApiService
      .post('get-summary', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseWalletSummaryModel)
      );
  }


  loadCustomerObu() {
    const mockupData = {
      customer: {
        id: this.customerId,
      }
    };
    return this.restApiService
      .post('get-customer-obu', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseCustomerObuModel)
      );
  }


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
