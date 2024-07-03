import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { first, firstValueFrom, map } from 'rxjs';
import { IBill, IResponseTransferModel, ResponseModel, RowActionEventModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import moment from 'moment';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'write-off-bad-debt',
  templateUrl: './write-off-bad-debt.component.html',
  styleUrl: './write-off-bad-debt.component.scss'
})
export class WriteOffBadDebtComponent {


  public isLoading: boolean = false;

  public form: FormGroup = new FormGroup({
    startDate: new FormControl(undefined, [Validators.required])
  });
  public isHiddenFillter: boolean = false;
  public getDebtColumns: any[] = [
    { id: 'issueDate', name: 'issueDate', label: 'วันที่ และ เวลา', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'walletId', name: 'walletId', label: 'กระเป๋าเงิน', prop: 'walletId', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'billCycle', name: 'billCycle', label: 'รอบการชำระเงิน', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'MMMM BBBB', locale: 'th' } },
    { id: 'amount', name: 'amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'currency', currency: { currencyCode: ' ', display: 'symbol', digitsInfo: '1.2-2' } },
    { id: 'writeOff', name: 'writeOff', label: 'ตัดหนี้', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'view', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];
  public data: IBill[] = [];

  public maxDate: Date = new Date();

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
  ) {
  }

  loadBadDebt(startDate: Date) {
    this.modalDialogService.loading();
    const payload = {
      issueDate: moment(startDate).format('YYYY-MM'),
    };

    this.restApiService
      .postBackOffice('bill/get/bad-debt', payload)
      .pipe(
        first(),
        map(res => res as ResponseModel<IBill[]>)
      )
      .subscribe({
        next: (res) => {
          this.data = res.data;
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          console.error(err);
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
          // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

  onSearch() {
    this.loadBadDebt(this.form.value.startDate);
  }

  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }

  onSentDebt() {
    Swal.fire({
      title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการแก้ไข</h2>',
      html: '<label>กรุณายืนยัน</label>',
      icon: "question",
      showCancelButton: true,
      customClass: {
        confirmButton: "custom-btn btn-type-1 blue ms-2",
        cancelButton: "custom-btn btn-type-1 outline"
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "กลับ",
      reverseButtons: true,
      preConfirm: async () => {
        try {
          const payload = {
            billId: 'BLL101',
          }
          const res = await firstValueFrom(this.restApiService.postBackOffice('bill/bad-debt', payload).pipe(first()))
        }
        catch (error: any) {
          if (error instanceof HttpResponse) {
            Swal.showValidationMessage(`
              failed: ${error.body?.errorCode}, ${error.body?.errorMessage}
            `);
          } else {
            Swal.showValidationMessage(`Something failed`);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการแก้ไข</h2>',
          html: '<label>แก้ไขเรียบร้อยแล้ว</label>',
          icon: "success",
          customClass: {
            confirmButton: "custom-btn custom-btn-type1 blue ms-2"
          },
        }).then(() => {
          this.loadBadDebt(this.form.value.startDate);
        })
      }
    })
  }

}
