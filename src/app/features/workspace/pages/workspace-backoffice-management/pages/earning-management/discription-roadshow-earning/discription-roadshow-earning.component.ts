import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IElementCampaignRoadShowAllResponse, CustomColumnModel, RowActionEventModel, IRoadShowByIdResponse } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { AddCustomerRoadshowCampaignComponent } from '../../../modals/add-customer-roadshow-campaign/add-customer-roadshow-campaign.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-discription-roadshow-earning',
  templateUrl: './discription-roadshow-earning.component.html',
  styleUrl: './discription-roadshow-earning.component.scss'
})
export class DiscriptionRoadshowEarningComponent implements OnInit {

  public id: string | null;


  settingRoadShowList: IElementCampaignRoadShowAllResponse[] = [];
  public settingRoadShowColumns: CustomColumnModel[] = [
    { id: 'campaignName', name: 'ชื่อ Road Show', label: 'ชื่อ Road Show', prop: 'campaignName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'fromDate', name: 'เวลาเริ่มต้น', label: 'เวลาเริ่มต้น', prop: 'fromDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'toDate', name: 'เวลาสิ้นสุด', label: 'เวลาสิ้นสุด', prop: 'toDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'takePoint', name: 'จำนวนคะแนนได้รับ', label: 'จำนวนคะแนนได้รับ', prop: 'takePoint', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    // { id: 'customerGroups', name: 'กลุ่มลูกค้า', label: 'กลุ่มลูกค้า', prop: 'customerGroups', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'remark', name: 'หมายเหตุ', label: 'หมายเหตุ', prop: 'remark', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'รายละเอียด', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'setting', iconName: 'setting', size: 'l', color: '#2255CE' } }
  ];
  settingRoadShowcollectionSize: number = 0;
  isSettingRoadShowLoading: boolean = false;
  settingRoadShowLimit: number = 1;
  settingRoadShowPages: number = 1;

  bonusPointList: IElementCampaignRoadShowAllResponse[] = [];
  public bonusPointColumns: CustomColumnModel[] = [
    { id: 'campaignName', name: 'ชื่อผู้ได้รับคะแนน', label: 'ชื่อผู้ได้รับคะแนน', prop: 'campaignName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'fromDate', name: 'วันที่ได้รับคะแนน', label: 'วันที่ได้รับคะแนน', prop: 'fromDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } }
  ];
  bonusPointCollectionSize: number = 0;
  bonusPointLoading: boolean = false;
  bonusPointLimit: number = 5;
  bonusPointPages: number = 1;
  
  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal

  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getRoadShowById();
    this.getCampaignRoadShowEarnAll();
  }

  getRoadShowById() {
    this.modalDialogService.loading();
    this.restApiService.getBackOfficeWithModel<IRoadShowByIdResponse>(`campaign/road-show/${this.id}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          console.log("[getRoadShowById] res => ", res.data);
          // this.roadShowForm.get('id')?.setValue(res.data.id);
          // this.roadShowForm.get('campaignName')?.setValue(res.data.campaignName);
          // this.roadShowForm.get('takePoint')?.setValue(res.data.takePoint);
          // this.roadShowForm.get('customerGroups')?.setValue(res.data.customerGroups);
          // this.roadShowForm.get('isAllCustomerGroups')?.setValue(res.data.isAllCustomerGroups);
          // this.roadShowForm.get('fromDate')?.setValue(res.data.fromDate);
          // this.roadShowForm.get('fromPeriod')?.setValue(res.data.fromPeriod);
          // this.roadShowForm.get('toDate')?.setValue(res.data.toDate);
          // this.roadShowForm.get('toPeriod')?.setValue(res.data.toPeriod);
          // this.roadShowForm.get('publishing')?.setValue(res.data.publish);
          this.settingRoadShowList = [res.data];
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignRoadShowEarnAll() {
    this.bonusPointLoading = true;
    this.restApiService.getBackOfficeWithModel<any>(`campaign/road-show/earn/${this.id}/all?limit=${this.bonusPointLimit}&offset=${(this.bonusPointPages * this.bonusPointLimit) - this.bonusPointLimit}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.bonusPointList = res.data.elements;
          this.bonusPointCollectionSize = res.data.totalElements;
        }
        this.bonusPointLoading = false;
      },
      error: (error) => {
        this.bonusPointLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  onActionSettingRoadShow(event: RowActionEventModel) {
    const row = event.row as IElementCampaignRoadShowAllResponse;
    this.router.navigate([`work-space/manage-earning/roadshow/edit/${row.id}`]);
  }

  onAddEarnByCustomerId() {
    const modelRef = this.ngbModal.open(AddCustomerRoadshowCampaignComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    });
    modelRef.componentInstance.id = "event.row.walletId";
    modelRef.result.then(
      (result) => {
        if (result) {
          console.log('[onActive] result => ', result);
          window.location.reload();
        }
      },
      (reason) => {
        console.log('[onActive] reason => ', reason);
      }
    );
  }
  
  onBack() {
    this.router.navigate(['work-space/manage-earning']);
  }

}
