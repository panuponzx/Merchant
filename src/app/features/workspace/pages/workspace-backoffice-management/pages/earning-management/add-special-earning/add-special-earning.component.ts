import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ICampaignTollResponse, IMasterDataChildrenResponse, IMasterDataResponse, ITollAddRequest, ITopUpAddRequest, ITopupAndTollAddBaseActiveResponse, ITopupAndTollAddBaseRequest, RowActionEventModel } from 'src/app/core/interfaces';
import { TransformDatePipe } from 'src/app/core/pipes';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-add-special-earning',
  templateUrl: './add-special-earning.component.html',
  styleUrl: './add-special-earning.component.scss'
})
export class AddSpecialEarningComponent {

  public campaignEvent: string | null;
  public id: string | null;
  public form: FormGroup;

  public isCampaignEventsLoading: boolean = false;
  public campaignEventsList: IMasterDataResponse[] = [];

  public isCampaignCalOperationLoading: boolean = false;
  public campaignCalOperationList: IMasterDataResponse[] = [];

  public isCarTypeLoading: boolean = false;
  public carTypeList: IMasterDataResponse[] = [];

  public isCustomerGropLoading: boolean = false;
  public customerGroupList: IMasterDataResponse[] = [];

  // public isRouteLoading: boolean = false;
  // public routeList: IAllTollStationsResponse[] = [];

  public isTollStation: boolean = false;
  public tollStationList: IMasterDataChildrenResponse[] = [];
  public tempTollStationList: IMasterDataChildrenResponse[] = [];

  public isDayOfWeekLoading: boolean = false;
  public dayOfWeekList: IMasterDataResponse[] = [];

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transformDatePipe: TransformDatePipe
  ) {
    // TOLL
    // SALE
    // TOP_UP
    // ROAD_SHOW
    // OPEN_AOI
    // OPEN_CCH_APP
    // UPDATE_INFO
    this.form = this.formBuilder.group({
      id: new FormControl(undefined),
      campaignEvent: new FormControl(undefined, Validators.required), //ALL
      campaignName: new FormControl(undefined, Validators.required), //ALL
      operation: new FormControl(undefined, Validators.required), //TOLL, SALE, UPDATE_INFO, TOP_UP, OPEN_AOI, OPEN_CCH_APP
      calculateValue: new FormControl(undefined, Validators.required), //TOLL, SALE, UPDATE_INFO, TOP_UP, OPEN_AOI, OPEN_CCH_APP
      // takePoint: new FormControl(undefined), //ROAD_SHOW,
      carTypes: new FormControl(undefined), //TOLL
      isAllCarTypes: new FormControl(false), //TOLL
      customerGroups: new FormControl(undefined, Validators.required), //ALL
      isAllCustomerGroups: new FormControl(false), //ALL
      route: new FormControl(undefined), //TOLL
      tollStations: new FormControl({ value: undefined, disabled: true }, Validators.required), //TOLL
      isAllTollStation: new FormControl(false), //TOLL
      fromDate: new FormControl(undefined, Validators.required), //ALL
      toDate: new FormControl(undefined, Validators.required), //ALL
      fromPeriod: new FormControl(undefined, Validators.required), //ALL
      toPeriod: new FormControl(undefined, Validators.required), //ALL
      daysOfWeek: new FormControl(undefined, Validators.required), //TOLL
      isAllDaysOfWeek: new FormControl(false), //TOLL
      publishing: new FormControl(undefined, Validators.required), //ALL
    });
    this.campaignEvent = this.activatedRoute.snapshot.paramMap.get('campaign-event');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.get('campaignEvent')?.valueChanges.subscribe((value) => {
      this.updateValidators(value);
    });
  }

  ngOnInit(): void {
    this.getCampaignEvents();
    this.getCampaignCalOperation();


    this.getCarTypes();
    this.getCustomerCategories();
    // this.getAllTollStations();
    this.getTollStation();
    this.getDayOfWeek();
    // this.getCampaignAll();
  }

  updateValidators(campaignEvent: string) {
    console.log("[updateValidators] campaignEvent => ", campaignEvent);
    const controlsToUpdate = [
      //ประเภทที่ร่วมรายการ
      { controlName: 'carTypes', requiredFor: ['TOLL'] },
      { controlName: 'isAllCarTypes', requiredFor: ['TOLL'] },
      //รายละเอียดการจำกัด
      { controlName: 'route', requiredFor: ['TOLL'] },
      { controlName: 'tollStations', requiredFor: ['TOLL'] },
      { controlName: 'isAllTollStation', requiredFor: ['TOLL'] },
      //ตั้งเวลาแคมเปญ
      { controlName: 'daysOfWeek', requiredFor: ['TOLL'] },
      { controlName: 'isAllDaysOfWeek', requiredFor: ['TOLL'] },
    ];
    controlsToUpdate.forEach(({ controlName, requiredFor }) => {
      const control = this.form.get(controlName);
      if (requiredFor.includes(campaignEvent)) {
        control?.setValidators(Validators.required);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });
  }

  isVisibilityForm(campaignEventsName: string[]): boolean {
    const campaignEvent: string = this.form.get("campaignEvent")?.value;
    return campaignEventsName.includes(campaignEvent);
  }

  getCampaignEvents() {
    this.isCampaignEventsLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/campaign-events`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.campaignEventsList = res.data.filter(res => res.key != 'ROAD_SHOW');
        }
        this.isCampaignEventsLoading = false;
      },
      error: (error) => {
        this.isCampaignEventsLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignCalOperation() {
    this.isCampaignCalOperationLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/campaign-cal-operations`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.campaignCalOperationList = res.data;
        }
        this.isCampaignCalOperationLoading = false;
      },
      error: (error) => {
        this.isCampaignCalOperationLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCarTypes() {
    this.isCarTypeLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/car-types`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.carTypeList = res.data;
        }
        this.isCarTypeLoading = false;
      },
      error: (error) => {
        this.isCarTypeLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  // getAllTollStations() {
  //   this.isRouteLoading = true;
  //   this.restApiService.getBackOfficeWithModel<IAllTollStationsResponse[]>(`master-data/all-toll-stations`).subscribe({
  //     next: (res) => {
  //       if (res.errorMessage === "Success") {
  //         this.routeList = res.data;
  //       }
  //       this.isRouteLoading = false;
  //     },
  //     error: (error) => {
  //       this.isRouteLoading = false;
  //       this.modalDialogService.handleError(error);
  //     },
  //   })
  // }

  getTollStation() {
    this.isTollStation = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataChildrenResponse[]>(`master-data/toll-stations`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.tollStationList = res.data;
          this.tempTollStationList = res.data;
          if (this.campaignEvent && this.id) {
            this.getCampaignSpecialById();
          }
        }
        this.isTollStation = false;
      },
      error: (error) => {
        this.isTollStation = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCustomerCategories() {
    this.isCustomerGropLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/customer-groups`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.customerGroupList = res.data;
        }
        this.isCustomerGropLoading = false;
      },
      error: (error) => {
        this.isCustomerGropLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  // getCampaignAll() {
  //   console.log("[getCampaignAll] campaignEvent => ", this.campaignEvent);
  //   if (this.campaignEvent) {
  //     const campaignEvent: string = this.campaignEvent.replace("_", "");
  //     this.isLoading = true;
  //     this.restApiService.getBackOfficeWithModel<any>(`campaign/${campaignEvent}/base?limit=${this.limit}&offset=${(this.pages * this.limit) - this.limit}`).subscribe({
  //       next: (res) => {
  //         if (res.errorMessage === "Success") {
  //           this.rowList = res.data.elements;
  //           this.collectionSize = res.data.totalElements;
  //         }
  //         this.isLoading = false;
  //       },
  //       error: (error) => {
  //         this.isLoading = false;
  //         this.modalDialogService.handleError(error);
  //       },
  //     })
  //   }
  // }

  getDayOfWeek() {
    this.isDayOfWeekLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataChildrenResponse[]>(`master-data/days-of-week`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.dayOfWeekList = res.data;
          // this.demoSetFormData();
        }
        this.isDayOfWeekLoading = false;
      },
      error: (error) => {
        this.isDayOfWeekLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignSpecialById() {
    this.modalDialogService.loading();
    if (this.campaignEvent) {
      let campaignEventType: string = '';
      switch (this.campaignEvent) {
        case 'toll':
          campaignEventType = 'toll';
          break;
        case 'sale':
          campaignEventType = 'sale';
          break;
        case 'topup':
          campaignEventType = 'topup';
          break;
        case 'open_aoi':
          campaignEventType = 'opening/aoi';
          break;
        case 'open_cch_app':
          campaignEventType = 'opening/cch';
          break;
        case 'update_info':
          campaignEventType = 'update-info';
          break;
      }
      const campaignEvent: string = this.campaignEvent.replace("_", "");
      const campaignEventUpperCase: string = this.campaignEvent?.toUpperCase();
      this.restApiService.getBackOfficeWithModel<ICampaignTollResponse>(`campaign/${campaignEventType}/${this.id}`).subscribe({
        next: (res) => {
          if (res.errorMessage === "Success") {
            console.log("[getCampaignSpecialById] res => ", res.data);
            this.form.get('id')?.setValue(res.data.id);
            this.form.get('campaignEvent')?.setValue(campaignEventUpperCase);
            this.form.get('campaignEvent')?.disable();
            this.form.get('campaignName')?.setValue(res.data.campaignName);
            this.form.get('operation')?.setValue(res.data.operation);
            this.form.get('calculateValue')?.setValue(res.data.calculateValue);
            this.form.get('carTypes')?.setValue(res.data.carTypes);
            this.form.get('isAllCarTypes')?.setValue(res.data.isAllCarTypes);
            this.form.get('customerGroups')?.setValue(res.data.customerGroups);
            this.form.get('isAllCustomerGroups')?.setValue(res.data.isAllCustomerGroups);
            if (res.data.tollStations && res.data.tollStations.length > 0) {
              console.log("[getCampaignSpecialById] tempTollStationList => ", this.tempTollStationList);
              console.log("[getCampaignSpecialById] tollStations => ", res.data.tollStations);
              const route = this.tempTollStationList.reduce<string[]>((acc, item) => {
                const foundChildren = item.children.filter(child => res.data.tollStations.includes(child.key));
                if (foundChildren.length > 0 && !acc.includes(item.key)) {
                  acc.push(item.key);
                }
                return acc;
              }, []);
              this.form.get('route')?.setValue(route);
              this.form.get('tollStations')?.enable();
            }
            this.form.get('tollStations')?.setValue(res.data.tollStations);
            this.form.get('isAllTollStation')?.setValue(res.data.isAllTollStation);
            this.form.get('fromDate')?.setValue(new Date(res.data.fromDate));
            this.form.get('toDate')?.setValue(new Date(res.data.toDate));
            this.form.get('fromPeriod')?.setValue(res.data.fromPeriod);
            this.form.get('toPeriod')?.setValue(res.data.toPeriod);
            this.form.get('daysOfWeek')?.setValue(res.data.daysOfWeek);
            this.form.get('isAllDaysOfWeek')?.setValue(res.data.isAllDaysOfWeek);
            this.form.get('publishing')?.setValue(res.data.publish);
          }
          this.modalDialogService.hideLoading();
        },
        error: (error) => {
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(error);
        },
      })
    }
  }

  selectAll(formControlName: string) {
    console.log("[selectAll] formControlName => ", formControlName);
    switch (formControlName) {
      case 'carTypes':
        if (this.getStatusSelectAll(formControlName)) {
          this.form.get('carTypes')?.setValue(undefined);
          this.form.get('isAllCarTypes')?.setValue(false);
        } else {
          this.form.get('carTypes')?.setValue(this.carTypeList.map(x => x.key));
          this.form.get('isAllCarTypes')?.setValue(true);
        }
        break;
      case 'customerGroups':
        if (this.getStatusSelectAll(formControlName)) {
          this.form.get('customerGroups')?.setValue(undefined);
          this.form.get('isAllCustomerGroups')?.setValue(false);
        } else {
          this.form.get('customerGroups')?.setValue(this.customerGroupList.map(x => x.key));
          this.form.get('isAllCustomerGroups')?.setValue(true);
        }
        break;
      case 'route':
        if (this.getStatusSelectAll(formControlName)) {
          this.form.get('route')?.setValue(undefined);
        } else {
          this.form.get('route')?.setValue(this.tempTollStationList.map(x => x.key));
        }
        break;
      case 'daysOfWeek':
        if (this.getStatusSelectAll(formControlName)) {
          this.form.get('daysOfWeek')?.setValue(undefined);
          this.form.get('isAllDaysOfWeek')?.setValue(false);
        } else {
          this.form.get('daysOfWeek')?.setValue(this.dayOfWeekList.map(x => x.key));
          this.form.get('isAllDaysOfWeek')?.setValue(true);
        }
        break;
    }
  }

  getStatusSelectAll(formControlName: string): boolean {
    switch (formControlName) {
      case 'carTypes':
        if (this.form.get('carTypes')?.value && this.form.get('carTypes')?.value.length === this.carTypeList.length) {
          return true;
        } else {
          return false;
        }
      case 'customerGroups':
        if (this.form.get('customerGroups')?.value && this.form.get('customerGroups')?.value.length === this.customerGroupList.length) {
          return true;
        } else {
          return false;
        }
      case 'route':
        if (this.form.get('route')?.value && this.form.get('route')?.value.length === this.tempTollStationList.length) {
          return true;
        } else {
          return false;
        }
      case 'daysOfWeek':
        if (this.form.get('daysOfWeek')?.value && this.form.get('daysOfWeek')?.value.length === this.dayOfWeekList.length) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }

  onSelectRoute(event: string[]) {
    console.log("[onSelectTollStations] event => ", event);
    if (event && event.length > 0) {
      this.form.get('tollStations')?.enable();
      this.form.get('tollStations')?.reset();
      this.fillterTollStationsByRoute(event);
    } else {
      this.form.get('tollStations')?.disable();
      this.form.get('tollStations')?.reset();
    }
  }

  fillterTollStationsByRoute(route: string[]) {
    console.log("[fillterTollStationsByRoute] route => ", route);
    console.log("[fillterTollStationsByRoute] tollStationList => ", this.tollStationList);
    // let data: IMasterDataChildrenResponse[] = [];
    // this.tempTollStationList.forEach(item => {
    //   const filterChildren = item.children.filter(child =>  route.includes(child.key));
    //   if(filterChildren && filterChildren.length > 0) {
    //     data.push(item);
    //   }      
    // });
    // this.tollStationList = data;
    this.tollStationList = this.tempTollStationList.filter(res => route.includes(res.key));
  }

  onSubmit() {
    console.log("[onSubmit] form => ", this.form.value);
    // TOLL
    // SALE
    // TOP_UP
    // ROAD_SHOW
    // OPEN_AOI
    // OPEN_CCH_APP
    // UPDATE_INFO
    const campaignEventType: string = this.form.get('campaignEvent')?.value;
    switch (campaignEventType) {
      case 'TOLL':
        this.postAddToll();
        break;
      case 'SALE':
        this.postAddSaleOTopupOAoiOCchOUpdateInfo('sale');
        break;
      case 'TOP_UP':
        this.postAddSaleOTopupOAoiOCchOUpdateInfo('topup');
        break;
      case 'OPEN_AOI':
        this.postAddSaleOTopupOAoiOCchOUpdateInfo('opening/aoi');
        break;
      case 'OPEN_CCH_APP':
        this.postAddSaleOTopupOAoiOCchOUpdateInfo('opening/cch');
        break;
      case 'UPDATE_INFO':
        this.postAddSaleOTopupOAoiOCchOUpdateInfo('update-info');
        break;
    }
  }

  postAddToll() {
    this.modalDialogService.loading();
    const fromDate = new Date(this.form.get('fromDate')?.value);
    fromDate.setHours(0, 0, 0, 0);
    const fromDateNewFormat: string = String(this.transformDatePipe.transform(fromDate, 'YYYY-MM-DD HH:mm'));
    const toDate = new Date(this.form.get('toDate')?.value);
    toDate.setHours(0, 0, 0, 0);
    const toDateNewFormat: string = String(this.transformDatePipe.transform(fromDate, 'YYYY-MM-DD HH:mm'));
    const payload: ITollAddRequest = {
      campaignEvent: this.form.get('campaignEvent')?.value,
      campaignName: this.form.get('campaignName')?.value,
      fromDate: fromDateNewFormat,
      toDate: toDateNewFormat,
      fromPeriod: this.form.get('fromPeriod')?.value,
      toPeriod: this.form.get('toPeriod')?.value,
      publish: this.form.get('publishing')?.value,
      operation: this.form.get('operation')?.value,
      calculateValue: this.form.get('calculateValue')?.value,
      customerGroups: this.form.get('customerGroups')?.value,
      // isAllCustomerGroups: this.form.get('isAllCustomerGroups')?.value,
      isAllCustomerGroups: false,

      carTypes: this.form.get('carTypes')?.value,
      isAllCarTypes: this.form.get('isAllCarTypes')?.value,
      tollStations: this.form.get('tollStations')?.value,
      // isAllTollStation: this.form.get('isAllTollStation')?.value,
      isAllTollStation: false,
      daysOfWeek: this.form.get('daysOfWeek')?.value,
      isAllDaysOfWeek: false,
    }
    const url: string = this.campaignEvent && this.id ? `campaign/toll/${this.id}/edit` : `campaign/toll/add`;
    this.restApiService.postBackOfficeWithModel<ITollAddRequest, any>(url, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.form.reset();
          this.onBack();
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  postAddSaleOTopupOAoiOCchOUpdateInfo(campaignEventType: string) {
    const fromDate = new Date(this.form.get('fromDate')?.value);
    fromDate.setHours(0, 0, 0, 0);
    const fromDateNewFormat: string = String(this.transformDatePipe.transform(fromDate, 'YYYY-MM-DD HH:mm'));
    const toDate = new Date(this.form.get('toDate')?.value);
    toDate.setHours(0, 0, 0, 0);
    const toDateNewFormat: string = String(this.transformDatePipe.transform(fromDate, 'YYYY-MM-DD HH:mm'));
    const payload: ITopUpAddRequest = {
      campaignEvent: this.form.get('campaignEvent')?.value,
      campaignName: this.form.get('campaignName')?.value,
      fromDate: fromDateNewFormat,
      toDate: toDateNewFormat,
      fromPeriod: this.form.get('fromPeriod')?.value,
      toPeriod: this.form.get('toPeriod')?.value,
      publish: this.form.get('publishing')?.value,
      operation: this.form.get('operation')?.value,
      calculateValue: this.form.get('calculateValue')?.value,
      customerGroups: this.form.get('customerGroups')?.value,
      isAllCustomerGroups: this.form.get('isAllCustomerGroups')?.value,
    };
    this.modalDialogService.loading();
    const url: string = this.campaignEvent && this.id ? `campaign/${campaignEventType}/${this.id}/edit` : `campaign/${campaignEventType}/add`;
    this.restApiService.postBackOfficeWithModel<ITopUpAddRequest, any>(url, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.form.reset();
          this.onBack();
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onEdit() {
    const fromDate = new Date(this.form.get('fromDate')?.value);
    fromDate.setHours(0, 0, 0, 0);
    const fromDateNewFormat: string = String(this.transformDatePipe.transform(fromDate, 'YYYY-MM-DD HH:mm'));
    const payload: ITopupAndTollAddBaseRequest = {
      everyThaiBath: this.form.get('everyThaiBath')?.value,
      takePoint: this.form.get('takePoint')?.value,
      fromDate: fromDateNewFormat,
      remark: this.form.get('remark')?.value,
    }
    if (this.form.get('campaignEvent')?.value === 'TOLL') {
      console.log("[TOLL]");
      this.postEditBase(payload, 'toll');
    } else if (this.form.get('campaignEvent')?.value === 'TOP_UP') {
      console.log("[TOP_UP]");
      this.postEditBase(payload, 'topup');
    }
  }

  postEditBase(payload: ITopupAndTollAddBaseRequest, url: string) {
    console.log("[postEditBase]");
    const id: string = this.form.get('id')?.value;
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<ITopupAndTollAddBaseRequest, any>(`campaign/${url}/edit-base?id=${id}`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.form.reset();
          this.onBack();
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  postEditState(payload: any, url: string, id: string) {
    console.log("[postEditBase]");
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<any, any>(`campaign/${url}/${id}/edit-state`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.form.reset();
          this.onBack();
        }
        this.modalDialogService.hideLoading();
        this.modalDialogService.info("success", "#32993C", "ทำรายการสำเร็จ").then((res) => {
          // if(res) this.getCampaignAll();
        })
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onChangePages(page: number) {
    // this.pages = page;
    // this.getCampaignAll();
  }

  onAction(event: RowActionEventModel) {
    console.log("[onAction] event => ", event);
    const payload = {
      state: "0"
    };
    this.modalDialogService.confirm('ยืนยันการลบการตั้งค่า', 'กรุณายืนยัน?', 'กลับ', 'ยืนยัน').then((res) => {
      if (res) {
        if (this.form.get('campaignEvent')?.value === 'TOLL') {
          console.log("[TOLL]");
          this.postEditState(payload, 'toll', event.row.id);
        } else if (this.form.get('campaignEvent')?.value === 'TOP_UP') {
          console.log("[TOP_UP]");
          this.postEditState(payload, 'topup', event.row.id);
        }
      }
    });
  }

  onBack() {
    this.router.navigate(['work-space/manage-earning']);
  }
}
