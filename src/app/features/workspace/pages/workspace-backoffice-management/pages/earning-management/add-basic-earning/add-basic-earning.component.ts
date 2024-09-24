import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomColumnModel, IMasterDataResponse, ITopupAndTollAddBaseActiveResponse, ITopupAndTollAddBaseRequest, RowActionEventModel } from 'src/app/core/interfaces';
import { TransformDatePipe } from 'src/app/core/pipes';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-add-basic-earning',
  templateUrl: './add-basic-earning.component.html',
  styleUrl: './add-basic-earning.component.scss'
})
export class AddBasicEarningComponent implements OnInit {

  public campaignEvent: string | null;
  public id: string | null;
  public form: FormGroup;

  public isCampaignEventsLoading: boolean = false;
  public campaignEventsList: IMasterDataResponse[] = [];

  public rowList: any[] = [];
  public columns: CustomColumnModel[] = [
    { id: 'fromDate', name: 'เวลาเริ่มต้น', label: 'เวลาเริ่มต้น', prop: 'fromDate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'everyThaiBath', name: 'จำนวนเงินบาท ที่ได้รับคะแนน', label: 'จำนวนเงินบาท ที่ได้รับคะแนน', prop: 'everyThaiBath', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'takePoint', name: 'จำนวนคะแนนได้รับ', label: 'จำนวนคะแนนได้รับ', prop: 'takePoint', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'statusCode', name: 'สถานะ', label: 'สถานะ', prop: 'statusCode', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'remark', name: 'หมายเหตุ', label: 'หมายเหตุ', prop: 'remark', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'setting', name: 'รายละเอียด', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'setting', iconName: 'delete', size: 'l', color: '#2255CE' } }
  ];
  collectionSize: number = 0;
  isLoading: boolean = false;
  limit: number = 5;
  pages: number = 1;

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transformDatePipe: TransformDatePipe
  ) {
    this.form = this.formBuilder.group({
      id: new FormControl(undefined),
      campaignEvent: new FormControl(undefined, Validators.required),
      everyThaiBath: new FormControl(undefined, Validators.required),
      takePoint: new FormControl(undefined, Validators.required),
      fromDate: new FormControl(undefined, Validators.required),
      remark: new FormControl(undefined),
    });
    this.campaignEvent = this.activatedRoute.snapshot.paramMap.get('campaign-event');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.campaignEvent) {
      this.getCampaignTollAndTopupBaseActive();
    }
    this.getRedeemItemType();
    this.getCampaignAll();
  }

  getRedeemItemType() {
    this.isCampaignEventsLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/campaign-events`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.campaignEventsList = res.data.filter(val => val.key === 'TOLL' || val.key === 'TOP_UP');
        }
        this.isCampaignEventsLoading = false;
      },
      error: (error) => {
        this.isCampaignEventsLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getCampaignAll() {
    console.log("[getCampaignAll] campaignEvent => ", this.campaignEvent);
    if (this.campaignEvent) {
      const campaignEvent: string = this.campaignEvent.replace("_", "");
      this.isLoading = true;
      this.restApiService.getBackOfficeWithModel<any>(`campaign/${campaignEvent}/base?limit=${this.limit}&offset=${(this.pages * this.limit) - this.limit}`).subscribe({
        next: (res) => {
          if (res.errorMessage === "Success") {
            this.rowList = res.data.elements;
            this.collectionSize = res.data.totalElements;
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.modalDialogService.handleError(error);
        },
      })
    }
  }

  getCampaignTollAndTopupBaseActive() {
    this.modalDialogService.loading();
    if (this.campaignEvent) {
      const campaignEvent: string = this.campaignEvent.replace("_", "");
      const campaignEventUpperCase: string = this.campaignEvent?.toUpperCase();
      this.restApiService.getBackOfficeWithModel<ITopupAndTollAddBaseActiveResponse>(`campaign/${campaignEvent}/base/active`).subscribe({
        next: (res) => {
          if (res.errorMessage === "Success") {
            console.log("[getCampaignTollAndTopupBaseActive] res => ", res.data);
            this.form.get('id')?.setValue(res.data.id);
            this.form.get('campaignEvent')?.setValue(campaignEventUpperCase);
            this.form.get('campaignEvent')?.disable();
            this.form.get('everyThaiBath')?.setValue(res.data.everyThaiBath);
            this.form.get('takePoint')?.setValue(res.data.takePoint);
            this.form.get('fromDate')?.setValue(new Date(res.data.fromDate));
            this.form.get('remark')?.setValue(res.data.remark);
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

  onSubmit() {
    console.log("[onSubmit] form => ", this.form.value);
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
      this.postAddBase(payload, 'toll');
    } else if (this.form.get('campaignEvent')?.value === 'TOP_UP') {
      console.log("[TOP_UP]");
      this.postAddBase(payload, 'topup');
    }
  }

  postAddBase(payload: ITopupAndTollAddBaseRequest, url: string) {
    console.log("[postAddBase]");
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<ITopupAndTollAddBaseRequest, any>(`campaign/${url}/add-base`, payload).subscribe({
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
          if(res) this.getCampaignAll();
        })
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onChangePages(page: number) {
    this.pages = page;
    this.getCampaignAll();
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
