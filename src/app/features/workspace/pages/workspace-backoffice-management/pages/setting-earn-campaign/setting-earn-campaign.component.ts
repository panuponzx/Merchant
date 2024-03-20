import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
import { CustomColumnModel, CustomerModel, ReponseSearchCustomerModel, RowActionEventModel } from '../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../core/services';
import { style, animate, transition, trigger, stagger, query } from '@angular/animations';


@Component({
  selector: 'app-setting-earn-campaign',
  templateUrl: './setting-earn-campaign.component.html',
  styleUrls: ['./setting-earn-campaign.component.scss']
})
export class SettingEarnCampaignComponent {

  public rows: any[] = [
    { id: "1", activityName: 'ทุกด่านอาคาร', addOrMultiply: '10', pointAmount: '1', vehicleType: 'ทุกประเภท', activityDuration: new Date('1 มีนาคม 2567'), createdBy: 'นายทดสอบ ทดสอบ',  },
    { id: "2", activityName: 'ทุกด่านอาคาร', addOrMultiply: '10', pointAmount: '1', vehicleType: 'ทุกประเภท', activityDuration: new Date('2 มีนาคม 2567'), createdBy: 'นายทดสอบ ทดสอบ',  },
    // เพิ่มข้อมูลกิจกรรมเพิ่มเติมตามต้องการ
  ];

  public rows1: any[] = [
    { id: "1", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '10', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'กำลังเผยแพร่' },
    { id: "2", activityName: 'Promotion A', addOrMultiply: 'คูณ', pointAmount: '2', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "3", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '3', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "4", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "5", activityName: 'Promotion A', addOrMultiply: 'คูณ', pointAmount: '20', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "6", activityName: 'Promotion A', addOrMultiply: 'คูณ', pointAmount: '10', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "7", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "7", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "7", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    // เพิ่มข้อมูลกิจกรรมเพิ่มเติมตามต้องการ
  ];


  public columns: CustomColumnModel [] = [
    { id: 'activityName', name: 'อาคารด่าน', label: 'อาคารด่าน', prop: 'activityName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'addOrMultiply', name: 'ทุกจำนวนเงินบาท', label: 'ทุกจำนวนเงินบาท', prop: 'addOrMultiply', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'pointAmount', name: 'จำนวน Point ที่ได้รับ', label: 'จำนวน Point ที่ได้รับ', prop: 'pointAmount', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'vehicleType', name: 'สำหรับประเภทรถ', label: 'สำหรับประเภทรถ', prop: 'vehicleType', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'activityDuration', name: 'วันที่เปลี่ยนแปลงล่าสุด', label: 'วันที่เปลี่ยนแปลงล่าสุด', prop: 'activityDuration', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM YYYY', locale: 'th' } },
    { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'ตั้งค่า', label: 'ตั้งค่า', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public columns1: CustomColumnModel [] = [
    { id: 'activityName', name: 'ชื่อกิจกรรม', label: 'ชื่อกิจกรรม', prop: 'activityName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'addOrMultiply', name: 'บวก / คูณ', label: 'บวก / คูณ', prop: 'addOrMultiply', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'pointAmount', name: 'จำนวน Point', label: 'จำนวน Point', prop: 'pointAmount', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'vehicleType', name: 'สำหรับประเภทรถ', label: 'สำหรับประเภทรถ', prop: 'vehicleType', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'activityDuration', name: 'ระยะกิจกรรม', label: 'ระยะกิจกรรม', prop: 'activityDuration', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM YYYY', locale: 'en' } },
    { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'publishing', name: 'การเผยแพร่', label: 'การเผยแพร่', prop: 'publishing', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'ตั้งค่า', label: 'ตั้งค่า', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'setting', size: 'l', color: '#2255CE' } }
  ];

  public limitRow: number = 5;
  public pages: number = 1;
  public collectionSize: number = 0;
  
  

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    customerTypeId: new FormControl('domestic', [ Validators.required ]),
    citizenId: new FormControl(undefined, [ Validators.required ])
  });

  public tempSearch: string | undefined;

  public isLoading = false;

  constructor(
    private restApiService: RestApiService,
    public router: Router
  ) {}

  onAction(event: RowActionEventModel) {
    if (event.action === 'description' && event.row) {
      const row = event.row as CustomerModel;
      this.router.navigate(['work-space/user-info/general-info/' + row.id]);
    }
  }

  onBack() {
    this.submitted = false;
    this.pages = 1;
    this.tempSearch = undefined;
    this.form.reset();
    this.form.controls['customerTypeId'].setValue('domestic');
  }
}
