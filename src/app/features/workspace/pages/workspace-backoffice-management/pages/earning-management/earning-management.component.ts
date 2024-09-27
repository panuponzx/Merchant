import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomColumnModel, RowActionEventModel, ICampaignRoadShowAllResponse, IElementCampaignRoadShowAllResponse, ITopupAndTollAddBaseActiveResponse, IMasterDataResponse } from '../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { forkJoin } from 'rxjs';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-earning-management',
  templateUrl: './earning-management.component.html',
  styleUrl: './earning-management.component.scss'
})
export class EarningManagementComponent implements OnInit {

  public baseList: ITopupAndTollAddBaseActiveResponse[] = [];
  public baseColumns: CustomColumnModel[] = [
    { id: 'campaignEvent', name: 'รูปแบบการให้คะแนน', label: 'รูปแบบการให้คะแนน', prop: 'campaignEvent', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'fromDate', name: 'เวลาเริ่มต้น', label: 'เวลาเริ่มต้น', prop: 'fromDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'takePoint', name: 'จำนวนคะแนนได้รับ', label: 'จำนวนคะแนนได้รับ', prop: 'takePoint', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'remark', name: 'หมายเหตุ', label: 'หมายเหตุ', prop: 'remark', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'รายละเอียด', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'setting', iconName: 'setting', size: 'l', color: '#2255CE' } }
  ];
  baseCollectionSize: number = 0;
  isBaseLoading: boolean = false;
  baseLimit: number = 5;
  basePages: number = 1;

  public campaignEventValue: string | undefined = undefined;
  public isCampaignEventsLoading: boolean = false;
  public campaignEventsList: IMasterDataResponse[] = [];

  public specialList: IElementCampaignRoadShowAllResponse[] = [];
  public specialColumns: CustomColumnModel[] = [
    { id: 'campaignName', name: 'ชื่อกิจกรรม', label: 'ชื่อกิจกรรม', prop: 'campaignName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'campaignName', name: 'รูปแบบคะแนน', label: 'รูปแบบคะแนน', prop: 'campaignEventName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'operation', name: 'บวก / คูณ', label: 'บวก / คูณ', prop: 'operation', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'takePoint', name: 'จำนวน Point', label: 'จำนวน Point', prop: 'takePoint', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'customerGroups', name: 'กลุ่มลูกค้า', label: 'กลุ่มลูกค้า', prop: 'customerGroups', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carTypes', name: 'สำหรับประเภทรถ', label: 'สำหรับประเภทรถ', prop: 'carTypes', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'fromDate', name: 'วันที่สร้าง', label: 'วันที่สร้าง', prop: '-', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'fromDate', name: 'เวลาเริ่มต้น', label: 'เวลาเริ่มต้น', prop: 'fromDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'toDate', name: 'เวลาสิ้นสุด', label: 'เวลาสิ้นสุด', prop: 'toDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'publish', name: 'publish', label: 'การเผยแพร่', prop: 'publish', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-primary', textCondition1: 'กำลังเผยแพร่', classCondition2: 'text-grey', textCondition2: 'แบบร่าง' } },
    { id: 'setting', name: 'รายละเอียด', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'setting', iconName: 'setting', size: 'l', color: '#2255CE' } }
  ];

  specialCollectionSize: number = 0;
  isSpecialLoading: boolean = false;
  specialLimit: number = 5;
  specialPages: number = 1;

  public roadShowList: IElementCampaignRoadShowAllResponse[] = [];
  public roadShowColumns: CustomColumnModel[] = [
    { id: 'campaignName', name: 'ชื่อ Road Show', label: 'ชื่อ Road Show', prop: 'campaignName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'fromDate', name: 'เวลาเริ่มต้น', label: 'เวลาเริ่มต้น', prop: 'fromDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'toDate', name: 'เวลาสิ้นสุด', label: 'เวลาสิ้นสุด', prop: 'toDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'takePoint', name: 'จำนวนคะแนนได้รับ', label: 'จำนวนคะแนนได้รับ', prop: 'takePoint', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'customerGroups', name: 'กลุ่มลูกค้า', label: 'กลุ่มลูกค้า', prop: 'customerGroups', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'remark', name: 'หมายเหตุ', label: 'หมายเหตุ', prop: 'remark', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'รายละเอียด', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];
  roadShowCollectionSize: number = 0;
  isRoadShowLoading: boolean = false;
  roadShowLimit: number = 5;
  roadShowPages: number = 1;

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private router: Router,
    private transformDatePipe: TransformDatePipe,
    private ngbModal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getCampaignEvents();
    this.getCampaignTollAndTopupBaseActive();
    // this.getCampaignSpecialAll();
    this.getCampaignRoadShowAll();
    // this.onAddEarnByCustomerId();
  }

  onAddBase() {
    this.router.navigate(['work-space/manage-earning/basic/add']);
  }

  onAddSpecial() {
    this.router.navigate(['work-space/manage-earning/special/add']);
  }

  onAddRoadShow() {
    this.router.navigate(['work-space/manage-earning/roadshow/add']);
  }

  onActionBase(event: RowActionEventModel) {
    console.log("[onActionBase] event => ", event);
    const campaignEvent: string = String(event.row.campaignEvent).toLocaleLowerCase();
    this.router.navigate([`work-space/manage-earning/basic/edit/${campaignEvent}`]);
  }


  onActionSpecial(event: RowActionEventModel) {
    console.log("[onActionSpecial] event => ", event);
    if (this.campaignEventValue) {
      // const campaignEventType: string = this.campaignEventValue.toLowerCase();

      this.router.navigate([`work-space/manage-earning/special/edit/${event.row.campaignEvent.toLowerCase()}/${event.row.id}`]);
    }
  }

  onChangePagesSpecial(page: number) {
    this.specialPages = page;
    this.getCampaignSpecialAll();
  }

  onActionRoadShow(event: RowActionEventModel) {
    const row = event.row as IElementCampaignRoadShowAllResponse;
    this.router.navigate([`work-space/manage-earning/roadshow/discription/${row.id}`]);
  }

  onChangePagesRoadShow(page: number) {
    this.roadShowPages = page;
    this.getCampaignRoadShowAll();
  }

  getCampaignEvents() {
    this.isCampaignEventsLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/campaign-events`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.campaignEventsList = res.data.filter(res => res.key != 'ROAD_SHOW');
          this.campaignEventValue = res.data[0].key;
          this.getCampaignSpecialAll();
        }
        this.isCampaignEventsLoading = false;
      },
      error: (error) => {
        this.isCampaignEventsLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignTollAndTopupBaseActive() {
    this.isBaseLoading = true;
    forkJoin({
      toll: this.restApiService.getBackOfficeWithModel<ITopupAndTollAddBaseActiveResponse>(`campaign/toll/base/active`),
      topup: this.restApiService.getBackOfficeWithModel<ITopupAndTollAddBaseActiveResponse>(`campaign/topup/base/active`),
    }).subscribe({
      next: (res) => {
        if (res.toll.errorMessage === "Success" && res.topup.errorMessage === "Success") {
          let concatList: ITopupAndTollAddBaseActiveResponse[] = [];
          if (res.toll.data) {
            res.toll.data.campaignEvent = "TOLL";
            concatList.push(res.toll.data);
          }
          if (res.topup.data) {
            res.topup.data.campaignEvent = "TOP_UP";
            concatList.push(res.topup.data);
          }
          this.baseList = concatList;
        }
        this.isBaseLoading = false;
      },
      error: (error) => {
        this.isBaseLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  onChangeCampaignEvent(event: string) {
    console.log("[onChangeCampaignEvent] event => ", event);
    this.getCampaignSpecialAll();
  }

  getCampaignSpecialAll() {
    switch (this.campaignEventValue) {
      case 'TOLL':
        this.getCampaignSpecialToll();
        break;
      case 'SALE':
        this.getCampaignSpecialSale();
        break;
      case 'TOP_UP':
        this.getCampaignSpecialTopup();
        break;
      case 'OPEN_AOI':
        this.getCampaignSpecialAoi();
        break;
      case 'OPEN_CCH_APP':
        this.getCampaignSpecialCch();
        break;
      case 'UPDATE_INFO':
        this.getCampaignSpecialUpdateInfo();
        break;
    }
  }

  getCampaignSpecialToll() {
    this.isSpecialLoading = true;
    this.restApiService.getBackOfficeWithModel<any>(`campaign/toll/all?limit=${this.specialLimit}&offset=${(this.specialPages * this.specialLimit) - this.specialLimit}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.specialList = res.data.elements;
          this.specialCollectionSize = res.data.totalElements;
        }
        this.isSpecialLoading = false;
      },
      error: (error) => {
        this.isSpecialLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignSpecialSale() {
    this.isSpecialLoading = true;
    this.restApiService.getBackOfficeWithModel<any>(`campaign/sale/all?limit=${this.specialLimit}&offset=${(this.specialPages * this.specialLimit) - this.specialLimit}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.specialList = res.data.elements;
          this.specialCollectionSize = res.data.totalElements;
        }
        this.isSpecialLoading = false;
      },
      error: (error) => {
        this.isSpecialLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignSpecialTopup() {
    this.isSpecialLoading = true;
    this.restApiService.getBackOfficeWithModel<any>(`campaign/topup/all?limit=${this.specialLimit}&offset=${(this.specialPages * this.specialLimit) - this.specialLimit}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.specialList = res.data.elements;
          this.specialCollectionSize = res.data.totalElements;
        }
        this.isSpecialLoading = false;
      },
      error: (error) => {
        this.isSpecialLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignSpecialAoi() {
    this.isSpecialLoading = true;
    this.restApiService.getBackOfficeWithModel<any>(`campaign/opening/aoi/all?limit=${this.specialLimit}&offset=${(this.specialPages * this.specialLimit) - this.specialLimit}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.specialList = res.data.elements;
          this.specialCollectionSize = res.data.totalElements;
        }
        this.isSpecialLoading = false;
      },
      error: (error) => {
        this.isSpecialLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignSpecialCch() {
    this.isSpecialLoading = true;
    this.restApiService.getBackOfficeWithModel<any>(`campaign/opening/cch/all?limit=${this.specialLimit}&offset=${(this.specialPages * this.specialLimit) - this.specialLimit}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.specialList = res.data.elements;
          this.specialCollectionSize = res.data.totalElements;
        }
        this.isSpecialLoading = false;
      },
      error: (error) => {
        this.isSpecialLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignSpecialUpdateInfo() {
    this.isSpecialLoading = true;
    this.restApiService.getBackOfficeWithModel<any>(`campaign/update-info/all?limit=${this.specialLimit}&offset=${(this.specialPages * this.specialLimit) - this.specialLimit}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.specialList = res.data.elements;
          this.specialCollectionSize = res.data.totalElements;
        }
        this.isSpecialLoading = false;
      },
      error: (error) => {
        this.isSpecialLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignRoadShowAll() {
    this.isRoadShowLoading = true;
    this.restApiService.getBackOfficeWithModel<ICampaignRoadShowAllResponse>(`campaign/road-show/all?limit=${this.roadShowLimit}&offset=${(this.roadShowPages * this.roadShowLimit) - this.roadShowLimit}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.roadShowList = res.data.elements;
          this.roadShowCollectionSize = res.data.totalElements;
        }
        this.isRoadShowLoading = false;
      },
      error: (error) => {
        this.isRoadShowLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }
}
