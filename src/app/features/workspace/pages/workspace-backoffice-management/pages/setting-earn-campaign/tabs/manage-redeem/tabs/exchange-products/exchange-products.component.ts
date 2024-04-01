import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, from, map } from 'rxjs';
import {  CustomColumnModel,CustomerModel,ReponseSearchCustomerModel,RowActionEventModel } from '../../../../../../../../../../core/interfaces';


@Component({
  selector: 'app-exchange-products',
  templateUrl: './exchange-products.component.html',
  styleUrl: './exchange-products.component.scss'
})
export class ExchangeProductsComponent {
  public activeTab: 'Exchange-products' | 'coupon' | 'toll' | string | null;

  public rows1: any[] = [
    { id: "1", activityName: '1', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "2", activityName: '2', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "3", activityName: '3', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "4", activityName: '4', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "5", activityName: '5', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "6", activityName: '6', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "7", activityName: '7', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "8", activityName: '8', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "9", activityName: '9', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "10", activityName: '9', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "11", activityName: '9', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "12", activityName: '9', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "13", activityName: '9', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },
    { id: "14", activityName: '9', addOrMultiply: 'ชื่อสินค้า', pointAmount: 'สินค้า', vehicleType: '100', activityDuration: '1 มีนาคม 2567', publishing: '1 เมษายน 2567' , createdBy: 'นายทดสอบ ทดสอบ' },

  ];

  public columns1: CustomColumnModel [] = [
    { id: 'activityName', name: 'อันดับ', label: 'อันดับ', prop: 'activityName', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'addOrMultiply', name: 'ชื่อสินค้า', label: 'ชื่อสินค้า', prop: 'addOrMultiply', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'pointAmount', name: 'ประเภท', label: 'ประเภท', prop: 'pointAmount', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'vehicleType', name: 'คะแนนที่ใช้แลก', label: 'คะแนนที่ใช้แลก', prop: 'vehicleType', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'activityDuration', name: 'เวลาที่เริ่ม', label: 'เวลาที่เริ่ม', prop: 'activityDuration', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text', date: { format: 'D MMMM YYYY', locale: 'en' } },
    { id: 'publishing', name: 'เวลาที่สิ้นสุด', label: 'เวลาที่สิ้นสุด', prop: 'publishing', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'รายละเอียด', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];
isHiddenFillter: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/approval-management/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = this.rows1.length;

  public isLoading = false;
  



  onAction(event: RowActionEventModel) {
    if (event.action === 'description' && event.row) {
      const row = event.row as CustomerModel;
      this.router.navigate(['work-space/user-info/general-info/' + row.id]);
    }
  }
}
