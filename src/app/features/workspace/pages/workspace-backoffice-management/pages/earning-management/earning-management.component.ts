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

  public basicRatingRows: any[] = [];
  public specialRatingRows: any[] = [];
  public CalculatedVariables: any[] = [];
  public CarType: any[] = [];
  public UserType: any[] = [];
  public route: any[] = [];
  public expressBuilding: any[] = [];
  public expressBuildingTemp: any[] = [];

  public basicRatingColumns: CustomColumnModel[] = [
    { id: 'tollStationsList', name: 'อาคารด่าน', label: 'อาคารด่าน', prop: 'tollStationsList', sortable: false, resizeable: true, width: 150, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'everyThaiBath', name: 'ทุกจำนวนเงินบาท', label: 'ทุกจำนวนเงินบาท', prop: 'everyThaiBath', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'takePoint', name: 'จำนวน Point ที่ได้รับ', label: 'จำนวน Point ที่ได้รับ', prop: 'takePoint', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carTypesList', name: 'สำหรับประเภทรถ', label: 'สำหรับประเภทรถ', prop: 'carTypesList', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'lastModifyDate', name: 'วันที่เปลี่ยนแปลงล่าสุด', label: 'วันที่เปลี่ยนแปลงล่าสุด', prop: 'lastModifyDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm', locale: 'th' } },
    // { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'ตั้งค่า', label: 'ตั้งค่า', prop: '', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'setting', iconName: 'setting', size: 'l', color: '#2255CE' } }
  ];

  public specialRatingColumns: CustomColumnModel[] = [
    { id: 'campaignName', name: 'ชื่อกิจกรรม', label: 'ชื่อกิจกรรม', prop: 'campaignName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'condition', name: 'บวก / คูณ', label: 'บวก / คูณ', prop: 'conditionText', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'calculateValue', name: 'จำนวน Point', label: 'จำนวน Point', prop: 'calculateValue', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'customerTypesList', name: 'กลุ่มลูกค้า', label: 'กลุ่มลูกค้า', prop: 'customerTypesList', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carTypesList', name: 'สำหรับประเภทรถ', label: 'สำหรับประเภทรถ', prop: 'carTypesList', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'activityDuration', name: 'ระยะกิจกรรม', label: 'ระยะกิจกรรม', prop: 'activityDuration', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'activityDuration', name: 'ระยะกิจกรรม', label: 'ระยะกิจกรรม', prop: 'activityDuration', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'createdBy', name: 'ชื่อพนักงานที่สร้าง', label: 'ชื่อพนักงานที่สร้าง', prop: 'createdBy', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'publishText', name: 'การเผยแพร่', label: 'การเผยแพร่', prop: 'publishText', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'ตั้งค่า', label: 'ตั้งค่า', prop: '', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'setting', iconName: 'setting', size: 'l', color: '#2255CE' } }
  ];

  selectCarType: any;

  public limitRow: number = 1;
  public limitRow1: number = 5;

  public pages: number = 1;
  public pages1: number = 1;

  public collectionSize: number = 0;
  public collectionSize1: number = 0;

  public isShowDescription: boolean = false;
  public isEditCondition: boolean = false;
  public isBaseCampaign: boolean = false;

  public submitted: boolean = false;
  public form: FormGroup;

  public tempSearch: string | undefined;

  public isLoading = false;

  public today: Date = new Date();

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
      everyThaiBath: [null],
      takePoint: [null],
    });
    // this.loadData();
    this.loadData().then(() => {
      this.loadCampaignBase();
      this.loadCampaignSpecial();
    });
  }

  async loadData(): Promise<void> {
    try {
      this.loadCarType();
      this.loadCustomerType();
      this.loadTollStation();
      this.loadSubTollStation();
      this.loadCampaignOperation();
      await new Promise(resolve => setTimeout(resolve, 1000));
      // this.loadCampaignBase();
      // this.loadCampaignSpecial();
    }
    catch (error) {
      console.log(error);
    }
  }

  loadCampaignBase() {
    this.isLoading = true;
    this.modalDialogService.loading();
    this.restApiService
      .getBackOffice(`campaign/base`)
      .pipe(
        first(),
        map(res => res as any)
      ).subscribe({
        next: (res) => {
          let data: any[] = [];
          // let toll: any[] = res.data['tollStations'];
          // toll = toll.map(item => {
          //   item = this.expressBuildingTemp.find(toll => toll.id == item);
          //   console.log(item);
          //   console.log(item?.tollName);
          //   return item;
          // });
          // console.log(toll);
          res.data['campaignType'] = 'base'
          let carTypesTextTemp = this.CarType.filter(car =>
            !!res.data['carTypes']?.find((carEvent: any) => car.key == carEvent)
          );
          res.data['carTypesText'] = [...carTypesTextTemp.map((value: any) => value.name)].join(', ');
          res.data['carTypesList'] = res.data['isAllCarType'] == true ? 'ทุกประเภทรถ' : res.data['carTypesText'];
          let tollStationsTextTemp = this.expressBuildingTemp.filter(toll =>
            !!res.data['tollStations']?.find((tollEvent: any) => toll.tollCode == tollEvent)
          );
          res.data['tollStationsText'] = [...tollStationsTextTemp.map((value: any) => value.tollName)].join(', ');
          res.data['tollStationsList'] = res.data['isAllTollStation'] == true ? 'ทุกด่านอาคาร' : res.data['tollStationsText'];
          data.push(res.data);
          console.log("[loadData] res => ", res);
          this.basicRatingRows = data;
          this.collectionSize = this.basicRatingRows?.length | 0;
          this.isLoading = false;
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          this.isLoading = false;
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage ? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

  loadCampaignSpecial() {
    this.isLoading = true;
    this.modalDialogService.loading();
    this.restApiService
      .getBackOffice(`campaign/all?limit=${this.limitRow1}&offset=${(this.pages1 * this.limitRow1) - this.limitRow1}`)
      .pipe(
        first(),
        map((res: any) => {
          if (res.data?.elements?.length > 0) {
            const data = Object.assign([] as any[], res.data.elements)
              .map((value: any) => {
                let customerTypesTextTemp = this.UserType.filter(user =>
                  !!value.customerTypes?.find((userEvent: any) => user.key == userEvent)
                );
                value.customerTypesText = [...customerTypesTextTemp.map((value: any) => value.name)].join(', ');
                value.customerTypesList = value.isAllCustomerTypes == true ? 'ทุกกลุ่มลูกค้า' : value.customerTypesText;
                let carTypesTextTemp = this.CarType.filter(car =>
                  !!value.carTypes?.find((carEvent: any) => car.key == carEvent)
                );
                value.carTypesText = [...carTypesTextTemp.map((value: any) => value.name)].join(', ');
                value.carTypesList = value.isAllCarTypes == true ? 'ทุกประเภทรถ' : value.carTypesText;
                // value.conditionText = value.operation == 1 ? 'บวก (+)' : value.operation == 2 ? 'คูณ (x)' : null;
                value.conditionText = this.CalculatedVariables?.find(x => x.key == value.operation)?.name
                value.activityDuration = this.transformDatePipe.transform(value?.fromDate, 'D MMM BBBB HH:mm', 'th') + ' - ' + this.transformDatePipe.transform(value?.toDate, 'D MMM BBBB HH:mm', 'th');
                value.publishText = value.publish == true ? 'กำลังเผยแพร่' : 'แบบร่าง';
                value.campaignType = 'special';
                return value;
              });
            res.data.value = data;
          }
          return res;
        })
      ).subscribe({
        next: (res) => {
          console.log("[loadData] res => ", res);
          this.specialRatingRows = res.data.value;
          this.collectionSize1 = res.data.totalElements | 0;
          this.isLoading = false;
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          this.isLoading = false;
          this.modalDialogService.hideLoading();
          console.error(err);
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage ? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

  onChangePageSpecial(event: number) {
    console.log("[onChangePage] event => ", event);
    this.pages1 = event;
    this.loadCampaignSpecial();
  }

  loadCarType() {
    this.restApiService.getBackOffice('master-data/car-types').subscribe(
      (Response: any) => {
        if (Array.isArray(Response.data)) {
          this.CarType = Response.data;
          this.CarType?.sort((a: any, b: any) => a.name.localeCompare(b.name) || a.id - b.id);
        }
      });
  }

  loadCustomerType() {
    this.restApiService.getBackOffice('master-data/customer-types').subscribe(
      (Response: any) => {
        if (Array.isArray(Response.data)) {
          this.UserType = Response.data;
          // this.UserType?.sort((a: any, b: any) => a.name.localeCompare(b.name) || a.id - b.id);
        }
      });
  }

  loadTollStation() {
    this.restApiService.getBackOffice('master-data/toll-stations').subscribe(
      (Response: any) => {
        if (Array.isArray(Response.data)) {
          this.route = Response.data;
          this.route?.sort((a: any, b: any) => a.name.localeCompare(b.name) || a.id - b.id);
        }
      });
  }

  loadSubTollStation() {
    this.restApiService.getBackOffice('master-data/all-toll-stations').subscribe(
      (Response: any) => {
        if (Array.isArray(Response.data)) {
          this.expressBuildingTemp = Response.data;
          // this.expressBuildingTemp?.sort((a: any, b: any) => a.expresswayId.localeCompare(b.expresswayId) || a.tollName - b.tollName);
        }
      });
  }

  loadCampaignOperation() {
    this.restApiService.getBackOffice('master-data/campaign-cal-operations').subscribe(
      (Response: any) => {
        if (Array.isArray(Response.data)) {
          this.CalculatedVariables = Response.data;
          this.CalculatedVariables?.sort((a: any, b: any) => a.name.localeCompare(b.name) || a.id - b.id);
        }
      });

  }

  onSelectRoute(item: any, pages?: any) {
    console.log("[onSelectRoute] item => ", item);
    if (!item || item?.length === 0) {
      this.form?.get('expressBuilding')?.setValue(undefined);
    }
    this.expressBuilding = [];
    if (item?.length > 0) {
      let routeSelect: any[] = this.expressBuildingTemp.filter(route =>
        !!item?.find((routeEvent: any) => route.expresswayId == routeEvent.key)
      );
      this.expressBuilding = routeSelect;
      if (pages != 'edit') {
        let tollBuilding: any[] = this.form?.get('expressBuilding')?.value;
        let tollRoute: any = tollBuilding?.filter(itemA => routeSelect.some(itemB => itemB.tollCode === itemA));
        this.form?.get('expressBuilding')?.setValue(tollRoute);
      }
    }
    this.expressBuilding?.sort((a: any, b: any) => a.tollName.localeCompare(b.tollName) || a.tollCode - b.tollCode);
  }

  selectAll(formControlName: string) {
    if (formControlName === 'carType') {
      if (this.getStatusSelectAll(formControlName)) {
        this.form?.get('carType')?.setValue(undefined);
      } else {
        this.form?.get('carType')?.setValue(this.CarType.map(x => x.key));
      }
    } else if (formControlName === 'route') {
      if (this.getStatusSelectAll(formControlName)) {
        this.form?.get('route')?.setValue(undefined);
      } else {
        this.form?.get('route')?.setValue(this.route.map(x => x));
      }
    } else if (formControlName === 'tollBuilding') {
      if (this.getStatusSelectAll(formControlName)) {
        this.form?.get('expressBuilding')?.setValue(undefined);
      } else {
        this.form?.get('expressBuilding')?.setValue(this.expressBuilding.map(x => x.tollCode));
      }
    } else if (formControlName === 'customerType') {
      if (this.getStatusSelectAll(formControlName)) {
        this.form?.get('customerType')?.setValue(undefined);
      } else {
        this.form?.get('customerType')?.setValue(this.UserType.map(x => x.key));
      }
    }
  }

  getStatusSelectAll(formControlName: string): boolean {
    if (formControlName === 'carType') {
      if (this.form?.get('carType')?.value && this.form?.get('carType')?.value.length === this.CarType.length) return true;
    } else if (formControlName === 'route') {
      if (this.form?.get('route')?.value && this.form?.get('route')?.value.length === this.route.length) return true;
    } else if (formControlName === 'tollBuilding') {
      if (this.form?.get('expressBuilding')?.value && this.form?.get('expressBuilding')?.value.length === this.expressBuilding.length) return true;
    } else if (formControlName === 'customerType') {
      if (this.form?.get('customerType')?.value && this.form?.get('customerType')?.value.length === this.UserType.length) return true;
    }
    return false;
  }

  onSubmit() {
    console.log("[onSubmit] form => ", this.form.value);
    let payload: any = {};
    if (this.isBaseCampaign) {
      payload = {
        tollStations: this.form?.get('expressBuilding')?.value,
        isAllTollStation: this.getStatusSelectAll('route') && this.getStatusSelectAll('tollBuilding'),
        everyThaiBath: this.form?.get('everyThaiBath')?.value,
        takePoint: this.form?.get('takePoint')?.value,
        carTypes: this.form?.get('carType')?.value,
        isAllCarType: this.getStatusSelectAll('carType'),
        // lastModifyDate: this.transformDatePipe.transform(Date(), `YYYY-MM-DD HH:mm`),
        requestParam: this.restApiService.generateRequestParam(),
      }
    }
    else {
      const fromDate = this.transformDatePipe.transform(this.form.get('startdate')?.value, `YYYY-MM-DD HH:mm`);
      const toDate = this.transformDatePipe.transform(this.form.get('enddate')?.value, `YYYY-MM-DD HH:mm`);
      payload = {
        campaignName: this.form.get('campaignName')?.value,
        operation: Number(this.form?.get('conditionPoint')?.value),
        calculateValue: Number(this.form?.get('calculatePoint')?.value),
        // tollStations: this.form?.get('route')?.value,
        // isAllTollStation: this.getStatusSelectAll('route'),
        tollStations: this.form?.get('expressBuilding')?.value,
        isAllTollStation: this.getStatusSelectAll('route') && this.getStatusSelectAll('tollBuilding'),
        customerTypes: this.form?.get('customerType')?.value,
        isAllCustomerTypes: this.getStatusSelectAll('customerType'),
        carTypes: this.form?.get('carType')?.value,
        isAllCarTypes: this.getStatusSelectAll('carType'),
        fromDate: fromDate,
        toDate: toDate,
        publish: this.form.get('publishing')?.value,
        // lastModifyDate: this.transformDatePipe.transform(Date(), `YYYY-MM-DD HH:mm`),
        requestParam: this.restApiService.generateRequestParam(),
      }
    }
    console.log("[onSubmit] form => ", payload);
    const url = !this.isEditCondition ? 'campaign/add' : this.isBaseCampaign ? 'campaign/edit-base' : `campaign/${this.form?.get('id')?.value}/edit`;
    const message = this.isEditCondition ? 'แก้ไขเงือนไขการให้คะแนนสำเร็จ' : 'เพิ่มเงือนไขการให้คะแนนสำเร็จ';
    this.modalDialogService.loading();
    this.restApiService
      .postBackOffice(url, payload)
      .pipe(
        first(),
        map(res => res as any)
      ).subscribe({
        next: (res) => {
          this.modalDialogService.hideLoading();
          if (res.errorMessage === "Success") {
            console.log("[onSubmit] res => ", res);
            this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', message).then(function () {
              // this.onBack();
              window.location.reload();
            })
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
    if (event.row.campaignType === 'base') {
      this.isBaseCampaign = true;
      this.form.get('campaignName')?.clearValidators();
      this.form.get('conditionPoint')?.clearValidators();
      this.form.get('calculatePoint')?.clearValidators();
      this.form.get('customerType')?.clearValidators();
      this.form.get('startdate')?.clearValidators();
      this.form.get('enddate')?.clearValidators();
      this.form.get('publishing')?.clearValidators();
      this.form.get('everyThaiBath')?.setValidators([Validators.required]);
      this.form.get('takePoint')?.setValidators([Validators.required]);
      this.form.updateValueAndValidity();
    }
    else {
      this.form.get('everyThaiBath')?.clearValidators();
      this.form.get('takePoint')?.clearValidators();
      this.form.updateValueAndValidity();
    }
    this.setFormValue(event?.row);
    this.isShowDescription = true;
    this.isEditCondition = true;
    // if (event.action === 'description' && event.row) {
    //   this.isShowDescription = true;
    //   // const row = event.row as CustomerModel;
    //   // this.router.navigate(['/work-space/add-edit' + row.id]);
    // }
  }

  setFormValue(event: any) {
    this.form?.get('id')?.setValue(event?.id);
    this.form?.get('campaignName')?.setValue(event?.campaignName);
    if (event?.operation) this.form?.get('conditionPoint')?.setValue(String(event?.operation));
    this.form?.get('calculatePoint')?.setValue(event?.calculateValue);
    // this.form?.get('route')?.setValue(event?.tollStations);
    this.selectToll(event?.tollStations);
    // this.form?.get('expressBuilding')?.setValue(event?.tollStations);
    this.form?.get('customerType')?.setValue(event?.customerTypes);
    this.form?.get('carType')?.setValue(event?.carTypes);
    if (event?.fromDate) this.form?.get('startdate')?.setValue(new Date(event?.fromDate));
    if (event?.toDate) this.form?.get('enddate')?.setValue(new Date(event?.toDate));
    this.form?.get('publishing')?.setValue(event?.publish);
    this.form?.get('everyThaiBath')?.setValue(event?.everyThaiBath);
    this.form?.get('takePoint')?.setValue(event?.takePoint);
  }

  selectToll(tollStations: any) {
    if (tollStations && tollStations.length > 0) {
      let TollSelect: any[] = this.expressBuildingTemp.filter(route =>
        !!tollStations?.find((routeEvent: any) => route.tollCode == routeEvent)
      );
      let routeSelect: any[] = this.route.filter(route =>
        !!TollSelect?.find((routeEvent: any) => route.key == routeEvent.expresswayId)
      );
      this.form?.get('route')?.setValue(routeSelect);
      this.onSelectRoute(routeSelect, 'edit');
      this.form?.get('expressBuilding')?.setValue(tollStations);
    }
  }

  onBack() {
    this.submitted = false;
    this.isShowDescription = false;
    this.isEditCondition = false;
    this.pages = 1;
    this.tempSearch = undefined;
    this.isBaseCampaign = false;
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
      everyThaiBath: [null],
      takePoint: [null],
    });
    // this.loadCampaignBase();
    // this.loadCampaignSpecial();
  }


}
