import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomeActivatedRouteModel, CustomColumnModel, IResponseFaremediaModel } from '../../../../../../core/interfaces';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-expired-faremedia-list',
  templateUrl: './expired-faremedia-list.component.html',
  styleUrl: './expired-faremedia-list.component.scss'
})
export class ExpiredFaremediaListComponent {
  public title: string | undefined;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(undefined, [Validators.required]),
    endDate: new FormControl(undefined, [Validators.required]),
  });
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public collectionSize: number = 0;
  public data: any[] = [];
  public pages: number = 1;

  public expiredColumns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'customerName', name: 'ชื่อลูกค้า', label: 'ชื่อลูกค้า', prop: 'customerName', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'walletName', name: 'ชื่อกระเป๋าเงิน', label: 'ชื่อกระเป๋าเงิน', prop: 'walletName', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carBrand', name: 'ยี้ห้อรถ', label: 'ยี้ห้อรถ', prop: 'carBrand', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carModel', name: 'รุ่นรถ', label: 'รุ่นรถ', prop: 'carModel', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carLicensePlate', name: 'หมายเลขทะเบียน', label: 'หมายเลขทะเบียน', prop: 'carLicensePlate', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'carYearRegistration', name: 'ปีที่จดทะเบียน', label: 'ปีที่จดทะเบียน', prop: 'carYearRegistration', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'obuNo', name: 'หมายเลข OBU', label: 'หมายเลข OBU', prop: 'obuNo', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'smartCardNo', name: 'หมายเลข Smart Card', label: 'หมายเลข Smart Card', prop: 'smartCardNo', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'faremediaTypeId', name: 'ประเภทอุปกรณ์', label: 'ประเภทอุปกรณ์', prop: 'faremediaTypeId', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'expired', name: 'วันที่หมดอายุ', label: 'วันที่หมดอายุ', prop: 'expired', sortable: false, resizeable: true, width: 120, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm', locale: 'th' } },
  ];


  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private activatedRoute: ActivatedRoute,
    private transformDatePipe: TransformDatePipe,
  ) {
    this.title = (this.activatedRoute as CustomeActivatedRouteModel).routeConfig.data?.label;
  }

  onSearchExpiredFareMedia() {
    this.modalDialogService.loading();
    this.isLoading = true;
    let startDate = this.transformDatePipe.transform(this.form.get('startDate')?.value, 'YYYY-MM-DD');
    let endDate = this.transformDatePipe.transform(this.form.get('endDate')?.value, 'YYYY-MM-DD');

    let payload: any = {};
    payload['requestParam'] = this.restApiService.generateRequestParam();

    this.restApiService
      .post(`faremedia/get/expired/from/${startDate}/to/${endDate}`, payload)
      .pipe(
        first(),
        map(res => res as IResponseFaremediaModel)
      ).subscribe({
        next: (res) => {
          console.log(res.data);
          this.data = res.data;
          this.collectionSize = res.data?.length | 0;
          this.modalDialogService.hideLoading();
          this.isLoading = false;
        },
        error: (err) => {
          this.modalDialogService.hideLoading();
          this.isLoading = false;
          console.error(err.message);
          this.modalDialogService.handleError(err);
        }
      });
  }

  onChangePageSpecial(event: number) {
    // console.log(event);
    this.pages = event;
  }

  onDownloadAttachment() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.modalDialogService.loading();
    this.isLoading = true;
    let startDate = this.transformDatePipe.transform(this.form.get('startDate')?.value, 'YYYY-MM-DD');
    let endDate = this.transformDatePipe.transform(this.form.get('endDate')?.value, 'YYYY-MM-DD');
    let payload: any = {};
    payload['requestParam'] = this.restApiService.generateRequestParam();

    this.restApiService.getPostFile(`faremedia/get/expired/from/${startDate}/to/${endDate}/file`, payload).subscribe({
      next: (res: any) => {
        // console.log("[onDownloadAttachment] res => ", res);
        this.modalDialogService.hideLoading();
        this.isLoading = false;
        if (res.status === 200) {
          console.log("[onDownloadAttachment] res => ", res);
          let blob: Blob = res.body;
          let a = document.createElement('a');
          a.download = startDate + ' to ' + endDate + ' Expired-Fare-Media.csv';
          a.href = window.URL.createObjectURL(blob);
          a.click();
          this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'ดาวน์โหลดไฟล์สำเร็จ');
        } else {
          this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
        }
      },
      error: (err) => {
        this.modalDialogService.hideLoading();
        this.isLoading = false;
        console.error(err);
        this.modalDialogService.handleError(err);
      }
    });
  }


  onClear() {
    this.form.reset();
  }

}
