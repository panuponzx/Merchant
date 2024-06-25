import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap/nav/nav.module';
import moment from 'moment';
import { Observable, first, map, min } from 'rxjs';
import { ResponseMessageModel, ResponseModel } from 'src/app/core/interfaces/response.interface';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { RestApiService } from 'src/app/core/services/rest-api-service/rest-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'outstanding-bill',
  templateUrl: './outstanding-bill.component.html',
  styleUrl: './outstanding-bill.component.scss'
})
export class OutstandingBillComponent {

  public approval: number = 1;
  public isLoading: boolean = false;
  public showButton: boolean = false;
  public form: FormGroup;
  
  public isHiddenFillter: boolean = false;
  
  public pages: number = 1;
  public collectionSize: number = 10;
  public getDebtColumns: any[] = [
    { id: 'issueDate', name: 'issueDate', label: 'วันที่ และ เวลา', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'walletId', name: 'walletId', label: 'กระเป๋าเงิน', prop: 'walletId', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'billCycle', name: 'billCycle', label: 'รอบการชำระเงิน', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'MMMM BBBB', locale: 'th' } },
    { id: 'amount', name: 'amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'currency', currency: { currencyCode: ' ', display: 'symbol', digitsInfo: '1.2-2' } },
    { id: 'bill', name: 'Bill', label: 'ใบแจ้งหนี้', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'view', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];
  
  

  constructor(
    private router: Router,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private FormBuilder: FormBuilder
    ) {
    this.form = this.FormBuilder.group({
      numberInput: new FormControl(undefined, [ Validators.required,Validators.min(1) ])
      
    });
  }

  ngOnInit() {
    
  }
  public file : any;

  getOutstanding(numberInput: number){
    this.modalDialogService.loading();
    
    const payload = {
      // minOutstandingMonthLate: 1,
      minOutstandingMonthLate: numberInput,
      requestParam: {
        channelId: 2,
        reqId: "111908f1-04e9-499c"
      }
    };
    console.log('payload : ',payload);
    
    this.restApiService
      .postBackOffice('bill/get/outstanding', payload)
      .subscribe({
        next: (res: any) => {
          console.log(res)
          this.file = res

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

  downloadData(): void{
    if (!this.file) {
      console.error('No Data Load');
      return;
    }

    console.log('file', this.file)

    const csvContent = 'id,customer_id,wallet_id,issue_date,due_date,amount,outstanding_month\n'
                      + `${this.file.id},${this.file.customer_id},${this.file.wallet_id},
                      ${this.file.issue_date},${this.file.due_date},${this.file.amount},
                      ${this.file.outstanding_month}`;
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
                  
    const a = document.createElement('a');
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);

  }


  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/outstanding-bill/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onSearch() {
    console.log("[onSearch]");
    this.getOutstanding(this.form.value.numberInput)
    this.showButton = true;
  }

  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }

  // onSentDebt() {
  //   Swal.fire ({
  //     title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการแก้ไข</h2>',
  //     html: '<label>กรุณายืนยัน</label>',
  //     icon: "question",
  //     showCancelButton: true,
  //     customClass: {
  //       confirmButton: "custom-btn btn-type-1 blue ms-2",
  //       cancelButton: "custom-btn btn-type-1 outline"
  //     },
  //     buttonsStyling: false,
  //     showLoaderOnConfirm: true,
  //     confirmButtonText: "ยืนยัน",
  //     cancelButtonText: "กลับ",
  //     reverseButtons: true,
  //     preConfirm: async() => {
  //       try {
  //         const payload = {
  //           billId: 'BLL101',
  //           requestParam: {
  //             reqId: "xxxxxx-xxxxx-xxxx",
  //             channelId: 1
  //           }
  //         }
  //         console.log('table payload : ', payload);

  //         const res = await firstValueFrom(this.restApiService.postBackOffice('bill/bad-debt',payload).pipe(first()))
  //         console.log('response', res);
  //       }
  //       catch (error : any ) {
  //         console.log(error);

  //         if (error instanceof HttpResponse) {
  //           Swal.showValidationMessage(`
  //             failed: ${error.body?.errorCode}, ${error.body?.errorMessage}
  //           `);
  //         } else {
  //           Swal.showValidationMessage(`Something failed`);
  //         }
  //       }
  //     },
  //     allowOutsideClick: () => !Swal.isLoading()
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: '<h2 style="color: var(--color-blue-exat)">ยืนยันการแก้ไข</h2>',
  //         html: '<label>แก้ไขเรียบร้อยแล้ว</label>',
  //         icon: "success",
  //         customClass: {
  //           confirmButton: "custom-btn custom-btn-type1 blue ms-2"
  //         },
  //       })
  //     }
  //   })
  // }

}
