import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICampaignAddRoadShowRequest, IMasterDataResponse, IRoadShowByIdResponse } from 'src/app/core/interfaces';
import { TransformDatePipe } from 'src/app/core/pipes';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-add-roadshow-earning',
  templateUrl: './add-roadshow-earning.component.html',
  styleUrl: './add-roadshow-earning.component.scss'
})
export class AddRoadshowEarningComponent implements OnInit {

  public id: string | null;
  public roadShowForm: FormGroup;

  public isCustomerGroupsLoading: boolean = false;
  public customerGroupsList: IMasterDataResponse[] = [];

  constructor(
    private restApiService: RestApiService,
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private router: Router,
    private transformDatePipe: TransformDatePipe,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.roadShowForm = this.formBuilder.group({
      id: new FormControl(undefined),
      campaignName: new FormControl(undefined, Validators.required),
      takePoint: new FormControl(undefined, Validators.required),
      customerGroups: new FormControl(undefined, Validators.required),
      isAllCustomerGroups: new FormControl(false, Validators.required),
      fromDate: new FormControl(undefined, Validators.required),
      fromPeriod: new FormControl(undefined, Validators.required),
      toDate: new FormControl(undefined, Validators.required),
      toPeriod: new FormControl(undefined, Validators.required),
      publishing: new FormControl(undefined, Validators.required),
    });
    this.getCustomerGroups();
  }

  ngOnInit(): void {
    if(this.id) this.getRoadShowById();
  }

  getCustomerGroups() {
    this.isCustomerGroupsLoading = true;
    this.restApiService.getBackOfficeWithModel<IMasterDataResponse[]>(`master-data/customer-groups`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.customerGroupsList = res.data;
        }
        this.isCustomerGroupsLoading = false;
      },
      error: (error) => {
        this.isCustomerGroupsLoading = false;
        this.modalDialogService.handleError(error);
      },
    })
  }

  getRoadShowById() {
    this.modalDialogService.loading();
    this.restApiService.getBackOfficeWithModel<IRoadShowByIdResponse>(`campaign/road-show/${this.id}`).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.roadShowForm.get('id')?.setValue(res.data.id);
          this.roadShowForm.get('campaignName')?.setValue(res.data.campaignName);
          this.roadShowForm.get('takePoint')?.setValue(res.data.takePoint);
          this.roadShowForm.get('customerGroups')?.setValue(res.data.customerGroups);
          this.roadShowForm.get('isAllCustomerGroups')?.setValue(res.data.isAllCustomerGroups);
          this.roadShowForm.get('fromDate')?.setValue(res.data.fromDate);
          this.roadShowForm.get('fromPeriod')?.setValue(res.data.fromPeriod);
          this.roadShowForm.get('toDate')?.setValue(res.data.toDate);
          this.roadShowForm.get('toPeriod')?.setValue(res.data.toPeriod);
          this.roadShowForm.get('publishing')?.setValue(res.data.publish);
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onSubmitRoadShow() {
    const fromDate = new Date(this.roadShowForm.get('fromDate')?.value);
    fromDate.setHours(0, 0, 0, 0);
    const fromDateNewFormat: string = String(this.transformDatePipe.transform(fromDate, 'YYYY-MM-DD HH:mm'));
    const toDate = new Date(this.roadShowForm.get('toDate')?.value);
    toDate.setHours(23, 59, 0, 0);
    const toDateNewFormat: string = String(this.transformDatePipe.transform(toDate, 'YYYY-MM-DD HH:mm'));
    const payload: ICampaignAddRoadShowRequest = {
      campaignName: this.roadShowForm.get('campaignName')?.value,
      fromDate: fromDateNewFormat,
      toDate: toDateNewFormat,
      fromPeriod: this.roadShowForm.get('fromPeriod')?.value,
      toPeriod: this.roadShowForm.get('toPeriod')?.value,
      publish: this.roadShowForm.get('publishing')?.value,
      takePoint: this.roadShowForm.get('takePoint')?.value,
      customerGroups: this.roadShowForm.get('customerGroups')?.value,
      isAllCustomerGroups: this.roadShowForm.get('isAllCustomerGroups')?.value,
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<ICampaignAddRoadShowRequest, any>(`campaign/road-show/add`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          // this.isAddRoadShow = false;
          this.roadShowForm.reset();
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onEditRoadShow() {
    const fromDate = new Date(this.roadShowForm.get('fromDate')?.value);
    fromDate.setHours(0, 0, 0, 0);
    const fromDateNewFormat: string = String(this.transformDatePipe.transform(fromDate, 'YYYY-MM-DD HH:mm'));
    const toDate = new Date(this.roadShowForm.get('toDate')?.value);
    toDate.setHours(23, 59, 0, 0);
    const toDateNewFormat: string = String(this.transformDatePipe.transform(toDate, 'YYYY-MM-DD HH:mm'));
    const id: string = this.roadShowForm.get('id')?.value;
    const payload: ICampaignAddRoadShowRequest = {
      campaignName: this.roadShowForm.get('campaignName')?.value,
      fromDate: fromDateNewFormat,
      toDate: toDateNewFormat,
      fromPeriod: this.roadShowForm.get('fromPeriod')?.value,
      toPeriod: this.roadShowForm.get('toPeriod')?.value,
      publish: this.roadShowForm.get('publishing')?.value,
      takePoint: this.roadShowForm.get('takePoint')?.value,
      customerGroups: this.roadShowForm.get('customerGroups')?.value,
      isAllCustomerGroups: this.roadShowForm.get('isAllCustomerGroups')?.value,
    }
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeWithModel<ICampaignAddRoadShowRequest, any>(`campaign/road-show/${id}/edit`, payload).subscribe({
      next: (res) => {
        if (res.errorMessage === "Success") {
          this.roadShowForm.reset();
          this.onBack();
          // this.getRoadShowById(id, false);
        }
        this.modalDialogService.hideLoading();
      },
      error: (error) => {
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    })
  }

  onBack() {
    if(this.id) {
      this.router.navigate([`work-space/manage-earning/roadshow/discription/${this.id}`]);
    }else {
      this.router.navigate(['work-space/manage-earning']);
    }
  }

}
