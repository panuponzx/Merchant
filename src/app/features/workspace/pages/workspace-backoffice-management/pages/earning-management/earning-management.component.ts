import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomColumnModel, RowActionEventModel, CustomerModel } from '../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../core/services';

@Component({
  selector: 'app-earning-management',
  templateUrl: './earning-management.component.html',
  styleUrl: './earning-management.component.scss'
})
export class EarningManagementComponent {

  public basicRatingRows: any[] = [
    { id: "1", activityName: 'ทุกด่านอาคาร', addOrMultiply: '10', pointAmount: '1', vehicleType: 'ทุกประเภท', createDate: new Date('1 มีนาคม 2567'), createdBy: 'นายทดสอบ ทดสอบ', },
  ];

  public specialRatingRows: any[] = [
    { id: "1", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '10', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'กำลังเผยแพร่' },
    { id: "2", activityName: 'Promotion A', addOrMultiply: 'คูณ', pointAmount: '2', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "3", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '3', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "4", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "5", activityName: 'Promotion A', addOrMultiply: 'คูณ', pointAmount: '20', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "6", activityName: 'Promotion A', addOrMultiply: 'คูณ', pointAmount: '10', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "7", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "7", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "7", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: '1 มี.ค.2567 - 31มี.ค.2567', createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
  ];


  public basicRatingColumns: CustomColumnModel[] = [
    { id: 'activityName', name: 'อาคารด่าน', label: 'อาคารด่าน', prop: 'activityName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'addOrMultiply', name: 'ทุกจำนวนเงินบาท', label: 'ทุกจำนวนเงินบาท', prop: 'addOrMultiply', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'pointAmount', name: 'จำนวน Point ที่ได้รับ', label: 'จำนวน Point ที่ได้รับ', prop: 'pointAmount', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'vehicleType', name: 'สำหรับประเภทรถ', label: 'สำหรับประเภทรถ', prop: 'vehicleType', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'createDate', name: 'วันที่เปลี่ยนแปลงล่าสุด', label: 'วันที่เปลี่ยนแปลงล่าสุด', prop: 'createDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM YYYY', locale: 'th' } },
    { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'ตั้งค่า', label: 'ตั้งค่า', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'setting', iconName: 'setting', size: 'l', color: '#2255CE' } }
  ];

  public specialRatingColumns: CustomColumnModel[] = [
    { id: 'activityName', name: 'ชื่อกิจกรรม', label: 'ชื่อกิจกรรม', prop: 'activityName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'addOrMultiply', name: 'บวก / คูณ', label: 'บวก / คูณ', prop: 'addOrMultiply', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'pointAmount', name: 'จำนวน Point', label: 'จำนวน Point', prop: 'pointAmount', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'vehicleType', name: 'สำหรับประเภทรถ', label: 'สำหรับประเภทรถ', prop: 'vehicleType', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'activityDuration', name: 'ระยะกิจกรรม', label: 'ระยะกิจกรรม', prop: 'activityDuration', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM YYYY', locale: 'en' } },
    { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'publishing', name: 'การเผยแพร่', label: 'การเผยแพร่', prop: 'publishing', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'ตั้งค่า', label: 'ตั้งค่า', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'setting', iconName: 'setting', size: 'l', color: '#2255CE' } }
  ];


  public CalculatedVariables = [
    {
      label: 'คูณ',
      id: '*'
    },
    {
      label: 'บวก',
      id: '+'
    }
  ];

  public CarType = [
    { name: "ประเภท 1 (รถ 4 ล้อ)" },
    { name: "ประเภท 2 (รถ 6 ล้อ)" },
    { name: "ประเภท 3 (รถ 8 ล้อ)" },
    { name: "ประเภท 4 (รถ 10 ล้อ)" }
  ];

  public UserType = [
    { name: 'บุคคลธรรมดา' },
    { name: 'ชาวต่างชาติ' },
    { name: 'นิติบุคคล / องค์กร' },

  ];

  public route = [
    { name: 'ชื่อสายทางที่ 1' },
    { name: 'ชื่อสายทางที่ 2' },
    { name: 'ชื่อสายทางที่ 3' },
    { name: 'ชื่อสายทางที่ 4' },
    { name: 'ชื่อสายทางที่ 5' },
    { name: 'ชื่อสายทางที่ 6' },
    { name: 'ชื่อสายทางที่ 7' },

  ];

  public expressBuilding = [
    { 
      name: 'ชื่ออาคารด่าน 1 - 1',
      group: 'ชื่อสายทางที่ 1'
    },
    { 
      name: 'ชื่ออาคารด่าน 1 - 2',
      group: 'ชื่อสายทางที่ 1'
    },
    { 
      name: 'ชื่ออาคารด่าน 1 - 3',
      group: 'ชื่อสายทางที่ 1'
    },
    { 
      name: 'ชื่ออาคารด่าน 1 - 4',
      group: 'ชื่อสายทางที่ 1'
    },
    { 
      name: 'ชื่ออาคารด่าน 3 - 1',
      group: 'ชื่อสายทางที่ 3'
    },
    { 
      name: 'ชื่ออาคารด่าน 3 - 2',
      group: 'ชื่อสายทางที่ 3'
    },
  ]
  selectCarType: any;

  public limitRow: number = 1;
  public limitRow1: number = 5;

  public pages: number = 1;
  public pages1: number = 1;

  public collectionSize: number = this.basicRatingRows.length;
  public collectionSize1: number = this.specialRatingRows.length;

  public isShowDescription: boolean = false;
  public isAddCondition: boolean = false;


  public submitted: boolean = false;
  public form: FormGroup;

  public tempSearch: string | undefined;

  public isLoading = false;


  constructor(
    private restApiService: RestApiService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      startdate: [null, Validators.required],
      enddate: [null, Validators.required],
      isEtaxActive: [null],
      lastName: [''],
      firstName: [''],
      carType: new FormControl(undefined, Validators.required),
      customerType: new FormControl(undefined, Validators.required),
      route: new FormControl(undefined, Validators.required),
      expressBuilding: new FormControl(undefined, Validators.required),
      publishing: new FormControl(undefined, Validators.required),
    });
  }

  selectAll(formControlName: string) {
    if(formControlName === 'carType') {
      if(this.getStatusSelectAll(formControlName)) {
        this.form?.get('carType')?.setValue(undefined);
      }else {
        this.form?.get('carType')?.setValue(this.CarType.map(x => x.name));
      }
    }else if(formControlName === 'route') {
      if(this.getStatusSelectAll(formControlName)) {
        this.form?.get('route')?.setValue(undefined);
      }else {
        this.form?.get('route')?.setValue(this.route.map(x => x.name));
      }
    }
  }

  getStatusSelectAll(formControlName: string): boolean {
    if(formControlName === 'carType') {
      if(this.form?.get('carType')?.value && this.form?.get('carType')?.value.length === this.CarType.length) return true;
    }else if(formControlName === 'route') {
      if(this.form?.get('route')?.value && this.form?.get('route')?.value.length === this.route.length) return true;
    }
    return false;
  }

  onAddCondition(): void {
    this.isShowDescription = true;
  }


  onSubmit(){
    console.log("[onSubmit] form => ", this.form.value);
    
  }


  onAction(event: RowActionEventModel) {
    console.log("[onAction] event => ", event);
    this.isShowDescription = true;
    if (event.action === 'description' && event.row) {
      this.isShowDescription = true;
      // const row = event.row as CustomerModel;
      // this.router.navigate(['/work-space/add-edit' + row.id]);
    }
  }


  onBack() {
    this.submitted = false;
    this.isShowDescription = false;
    this.pages = 1;
    this.tempSearch = undefined;
    this.form.reset();
  }


}
