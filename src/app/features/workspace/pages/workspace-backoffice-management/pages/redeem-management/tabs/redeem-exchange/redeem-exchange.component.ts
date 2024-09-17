import { Component, Input, OnInit } from '@angular/core';
import { CustomColumnModel, RowActionEventModel, CustomerModel, ILoyaltyProductsResponse, IElementLoyaltyProductsResponse } from '../../../../../../../../core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'redeem-exchange',
  templateUrl: './redeem-exchange.component.html',
  styleUrl: './redeem-exchange.component.scss'
})
export class RedeemExchangeComponent implements OnInit {

  @Input() redeemItemType!: string;

  public rows1: any[] = [
    { id: "1", activityName: '1', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "2", activityName: '2', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "3", activityName: '3', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "4", activityName: '4', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "5", activityName: '5', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "6", activityName: '6', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "7", activityName: '7', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "8", activityName: '8', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "9", activityName: '9', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "10", activityName: '10', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "11", activityName: '11', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "12", activityName: '12', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "13", activityName: '13', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "14", activityName: '14', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567', createdBy: 'นายทดสอบ ทดสอบ' },

  ];

  public columns1: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    // { id: 'activityName', name: 'กิจกรรม', label: 'กิจกรรม', prop: 'activityName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'name', name: 'ชื่อสินค้า', label: 'ชื่อสินค้า', prop: 'name.th', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'pointAmount', name: 'ประเภท', label: 'ประเภท', prop: 'pointAmount', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'pointUse', name: 'คะแนนที่ใช้แลก', label: 'คะแนนที่ใช้แลก', prop: 'pointUse', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'activityDuration', name: 'เวลาที่เริ่ม', label: 'เวลาที่เริ่ม', prop: 'activityDuration', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text', date: { format: 'D MMMM YYYY', locale: 'en' } },
    { id: 'expiryDate', name: 'เวลาที่สิ้นสุด', label: 'เวลาที่สิ้นสุด', prop: 'expiryDate', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'รายละเอียด', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public loyaltyProductsList: IElementLoyaltyProductsResponse[] = [];
  public isLoyaltyProductsLoading: boolean = false;
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = this.rows1.length;

  public isLoading = false;

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService
  ) {

  }

  ngOnInit(): void {
    this.getLoyaltyProducts();
  }

  getLoyaltyProducts() {
    this.isLoyaltyProductsLoading = true;
    this.restApiService.getBackOfficeWithModel<ILoyaltyProductsResponse>(`loyalty/products/${this.redeemItemType}/all?limit=${this.limitRow}&offset=${(this.pages * this.limitRow) - this.limitRow}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.loyaltyProductsList = res.data.elements;
          this.collectionSize = res.data.totalElements;
        }
        this.isLoyaltyProductsLoading = false;
      },
      error: (error) => {
        this.isLoyaltyProductsLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  onChangePage(event: number) {
    this.pages = event;
    this.getLoyaltyProducts();
  }

  onAction(event: RowActionEventModel) {
    if (event.action === 'description' && event.row) {
      const row = event.row as CustomerModel;
      // this.router.navigate(['work-space/user-info/general-info/' + row.id]);
    }
  }

}
