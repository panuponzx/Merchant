import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomColumnModel, RowActionEventModel, CustomerModel } from '../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { first, map } from 'rxjs';
import { TransformDatePipe } from '../../../../../../core/pipes';

@Component({
  selector: 'app-earning-management',
  templateUrl: './earning-management.component.html',
  styleUrl: './earning-management.component.scss'
})
export class EarningManagementComponent {

  public basicRatingRows: any[] = [
    { id: "1", tollStationsList: 'ทุกด่านอาคาร', everyThaiBath: '10', takePoint: '1', carTypesList: 'ทุกประเภท', lastModifyDate: new Date(), createdBy: 'นายทดสอบ ทดสอบ', },
  ];

  public specialRatingRows: any[] = [
    { id: "1", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '10', vehicleType: 'ทุกประเภท', activityDuration: new Date(), createdBy: 'นายทดสอบ ทดสอบ', publishing: 'กำลังเผยแพร่' },
    { id: "2", activityName: 'Promotion A', addOrMultiply: 'คูณ', pointAmount: '2', vehicleType: 'ทุกประเภท', activityDuration: new Date(), createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "3", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '3', vehicleType: 'ทุกประเภท', activityDuration: new Date(), createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "4", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: new Date(), createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "5", activityName: 'Promotion A', addOrMultiply: 'คูณ', pointAmount: '20', vehicleType: 'ทุกประเภท', activityDuration: new Date(), createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "6", activityName: 'Promotion A', addOrMultiply: 'คูณ', pointAmount: '10', vehicleType: 'ทุกประเภท', activityDuration: new Date(), createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "7", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: new Date(), createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "7", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: new Date(), createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
    { id: "7", activityName: 'Promotion A', addOrMultiply: 'บวก', pointAmount: '15', vehicleType: 'ทุกประเภท', activityDuration: new Date(), createdBy: 'นายทดสอบ ทดสอบ', publishing: 'แบบร่าง' },
  ];

  public basicRatingColumns: CustomColumnModel[] = [
    { id: 'tollStationsList', name: 'อาคารด่าน', label: 'อาคารด่าน', prop: 'tollStationsList', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'everyThaiBath', name: 'ทุกจำนวนเงินบาท', label: 'ทุกจำนวนเงินบาท', prop: 'everyThaiBath', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'takePoint', name: 'จำนวน Point ที่ได้รับ', label: 'จำนวน Point ที่ได้รับ', prop: 'takePoint', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carTypesList', name: 'สำหรับประเภทรถ', label: 'สำหรับประเภทรถ', prop: 'carTypesList', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'lastModifyDate', name: 'วันที่เปลี่ยนแปลงล่าสุด', label: 'วันที่เปลี่ยนแปลงล่าสุด', prop: 'lastModifyDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM YYYY', locale: 'th' } },
    // { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'ตั้งค่า', label: 'ตั้งค่า', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'setting', iconName: 'setting', size: 'l', color: '#2255CE' } }
  ];

  public specialRatingColumns: CustomColumnModel[] = [
    { id: 'campaignName', name: 'ชื่อกิจกรรม', label: 'ชื่อกิจกรรม', prop: 'campaignName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'conditionText', name: 'บวก / คูณ', label: 'บวก / คูณ', prop: 'conditionText', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'calculateValue', name: 'จำนวน Point', label: 'จำนวน Point', prop: 'calculateValue', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'customerTypesList', name: 'กลุ่มลูกค้า', label: 'กลุ่มลูกค้า', prop: 'customerTypesList', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carTypesList', name: 'สำหรับประเภทรถ', label: 'สำหรับประเภทรถ', prop: 'carTypesList', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'activityDuration', name: 'ระยะกิจกรรม', label: 'ระยะกิจกรรม', prop: 'activityDuration', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM YYYY', locale: 'th' } },
    // { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'publishText', name: 'การเผยแพร่', label: 'การเผยแพร่', prop: 'publishText', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
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
  public isEditCondition: boolean = false;


  public submitted: boolean = false;
  public form: FormGroup;

  public tempSearch: string | undefined;

  public isLoading = false;


  constructor(
    private restApiService: RestApiService,
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private router: Router,
    private transformDatePipe: TransformDatePipe,
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      campaignName: [null, Validators.required],
      conditionPoint: [null, Validators.required],
      calculatePoint: [null, Validators.required],
      carType: new FormControl(undefined, Validators.required),
      customerType: new FormControl(undefined, Validators.required),
      route: new FormControl(undefined, Validators.required),
      expressBuilding: new FormControl(undefined, Validators.required),
      publishing: new FormControl(false, Validators.required),
      startdate: [null, Validators.required],
      enddate: [null, Validators.required],
    });
    // this.loadCampaignBase();
    // this.loadCampaignSpecial();
  }

  loadCampaignBase() {
    this.isLoading = true;
    this.restApiService
      .get(`campaign/base`)
      .pipe(
        first(),
        // map(res => res as any)
        map((res: any) => {
          if (res.data) {
            const data = Object.assign([] as any[], res.data)
              .map((value: any) => {
                value.customerTypesList = value.isAllCustomerTypes == true ? 'ทุกด่านอาคาร' : value.customerTypes
                value.carTypesList = value.isAllCarType == true ? 'ทุกประเภท' : value.carTypes
                value.conditionText = value.condition == 0 ? 'บวก' : 'คูณ'
                value.activityDuration = this.transformDatePipe.transform(value?.fromDate, 'DD/MM/BBBB HH:mm', 'th') + ' - ' + this.transformDatePipe.transform(value?.toDate, 'DD/MM/BBBB HH:mm', 'th');
                value.publishText = value.publish == true ? 'กำลังเผยแพร่' : 'แบบร่าง'

                return value;
              });
            res.result.data = data;
          }
          return res;
        })
      ).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log("[loadData] res => ", res);
          this.basicRatingRows = res.data;
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage ? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

  loadCampaignSpecial() {
    this.isLoading = true;
    this.restApiService
      .get(`campaign/all?limit=${this.limitRow1}&offset=${this.pages1 * this.limitRow1}`)
      .pipe(
        first(),
        map((res: any) => {
          if (res.data) {
            const data = Object.assign([] as any[], res.data)
              .map((value: any) => {
                value.customerTypesList = value.isAllCustomerTypes == true ? 'ทุกด่านอาคาร' : value.customerTypes
                value.carTypesList = value.isAllCarTypes == true ? 'ทุกประเภท' : value.carTypes
                return value;
              });
            res.result.data = data;
          }
          return res;
        })
      ).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log("[loadData] res => ", res);
          this.specialRatingRows = res.data;
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage ? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

  selectAll(formControlName: string) {
    if (formControlName === 'carType') {
      if (this.getStatusSelectAll(formControlName)) {
        this.form?.get('carType')?.setValue(undefined);
      } else {
        this.form?.get('carType')?.setValue(this.CarType.map(x => x.name));
      }
    } else if (formControlName === 'route') {
      if (this.getStatusSelectAll(formControlName)) {
        this.form?.get('route')?.setValue(undefined);
      } else {
        this.form?.get('route')?.setValue(this.route.map(x => x.name));
      }
    } else if (formControlName === 'customerType') {
      if (this.getStatusSelectAll(formControlName)) {
        this.form?.get('customerType')?.setValue(undefined);
      } else {
        this.form?.get('customerType')?.setValue(this.UserType.map(x => x.name));
      }
    }
  }

  getStatusSelectAll(formControlName: string): boolean {
    if (formControlName === 'carType') {
      if (this.form?.get('carType')?.value && this.form?.get('carType')?.value.length === this.CarType.length) return true;
    } else if (formControlName === 'route') {
      if (this.form?.get('route')?.value && this.form?.get('route')?.value.length === this.route.length) return true;
    } else if (formControlName === 'customerType') {
      if (this.form?.get('customerType')?.value && this.form?.get('customerType')?.value.length === this.UserType.length) return true;
    }
    return false;
  }

  onSubmit() {
    console.log("[onSubmit] form => ", this.form.value);
    const fromDate = this.transformDatePipe.transform(this.form.get('startdate')?.value, 'YYYY-MM-DD');
    const toDate = this.transformDatePipe.transform(this.form.get('endDate')?.value, 'YYYY-MM-DD');
    const data = {
      campaignName: this.form.get('campaignName')?.value,
      condition: this.form?.get('conditionPoint')?.value,
      calculateValue: this.form?.get('calculatePoint')?.value,
      tollStations: this.form?.get('route')?.value,
      isAllTollStation: this.getStatusSelectAll('route'),
      customerTypes: this.form?.get('customerType')?.value,
      isAllCustomerTypes: this.getStatusSelectAll('customerType'),
      carTypes: this.form?.get('carType')?.value,
      isAllCarTypes: this.getStatusSelectAll('carType'),
      fromDate: fromDate,
      toDate: toDate,
      publish: this.form.get('publishing')?.value
    }
    // console.log("[onSubmit] form => ", data);
    const url = this.isEditCondition ? `campaign/${this.form?.get('id')?.value}/edit` : 'campaign/add';
    const message = this.isEditCondition ? 'แก้ไขเงือนไขการให้คะแนนสำเร็จ' : 'เพิ่มเงือนไขการให้คะแนนสำเร็จ';
    this.modalDialogService.loading();
    this.restApiService
      .post(url, data)
      .pipe(
        first(),
        map(res => res as any)
      ).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          if (res.errorMessage === "Success") {
            console.log("[onSubmit] res => ", res);
            this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', message);
            this.onBack();
          } else {
            this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
          }

        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage ? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

  onAddCondition(): void {
    this.isShowDescription = true;
    this.isEditCondition = false;
  }

  onAction(event: RowActionEventModel) {
    console.log("[onAction] event => ", event);
    this.form?.get('id')?.setValue(event.row.id);
    this.isShowDescription = true;
    this.isEditCondition = true;
    // if (event.action === 'description' && event.row) {
    //   this.isShowDescription = true;
    //   // const row = event.row as CustomerModel;
    //   // this.router.navigate(['/work-space/add-edit' + row.id]);
    // }
  }


  onBack() {
    this.submitted = false;
    this.isShowDescription = false;
    this.isEditCondition = false;
    this.pages = 1;
    this.tempSearch = undefined;
    this.form.reset();
    this.form = this.formBuilder.group({
      id: [null],
      campaignName: [null, Validators.required],
      conditionPoint: [null, Validators.required],
      calculatePoint: [null, Validators.required],
      carType: new FormControl(undefined, Validators.required),
      customerType: new FormControl(undefined, Validators.required),
      route: new FormControl(undefined, Validators.required),
      expressBuilding: new FormControl(undefined, Validators.required),
      publishing: new FormControl(false, Validators.required),
      startdate: [null, Validators.required],
      enddate: [null, Validators.required],
    });
  }


}
