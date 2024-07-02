import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../../../../../core/services';
import { ModalDialogService } from '../../../../../../core/services/modal-dialog/modal-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomeActivatedRouteModel, CustomColumnModel, IResponseFaremediaModel } from '../../../../../../core/interfaces';
import { TransformDatePipe } from '../../../../../../core/pipes';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-exception-transaction',
  templateUrl: './exception-transaction.component.html',
  styleUrl: './exception-transaction.component.scss'
})
export class ExceptionTransactionComponent {

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

  public activityColumns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 80, minWidth: 80, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'name', name: 'ชื่อ', label: 'ชื่อ', prop: 'name', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    ///...
  ];

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private activatedRoute: ActivatedRoute,
    private transformDatePipe: TransformDatePipe,
  ) {
    this.title = (this.activatedRoute as CustomeActivatedRouteModel).routeConfig.data?.label;
  }

  onDownloadAttachment() {
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    this.modalDialogService.loading();
    this.isLoading = true;
    let startDate = this.transformDatePipe.transform(this.form.get('startDate')?.value, 'YYYY-MM-DD');
    let endDate = this.transformDatePipe.transform(this.form.get('endDate')?.value, 'YYYY-MM-DD');
    let payload: any = {};
    payload['requestParam'] = this.restApiService.generateRequestParam();

    this.restApiService.getPostFile(`report/get/transaction/invalid/from/${startDate}/to/${endDate}/file`, payload).subscribe({
      next: (res: any) => {
        // console.log("[onDownloadAttachment] res => ", res);
        this.modalDialogService.hideLoading();
        this.isLoading = false;
        if (res.status === 200) {
          console.log("[onDownloadAttachment] res => ", res);
          let blob: Blob = res.body;
          let a = document.createElement('a');
          a.download = startDate + ' to ' + endDate + ' Exception-Transaction-List.csv';
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
    this.submitted = false;
  }


}
