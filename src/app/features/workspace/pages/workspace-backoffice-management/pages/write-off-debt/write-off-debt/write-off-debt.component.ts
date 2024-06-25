import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { first, map } from 'rxjs';
import { IBill, ResponseModel, RowActionEventModel  } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import moment from 'moment';

@Component({
  selector: 'write-off-debt',
  templateUrl: './write-off-debt.component.html',
  styleUrl: './write-off-debt.component.scss'
})
export class WriteOffDebtComponent {

  
  public approval: number = 1;
  public isLoading: boolean = false;

  public submitted: boolean = false;
  public form: FormGroup;
  public dataIsLoading: boolean = false;

  public isHiddenFillter: boolean = false;
  public bills: IBill[] = [];
  public pages: number = 1;
  public collectionSize: number = 10;
  public getDebtColumns: any[] = [
    { id: 'issueDate', name: 'issueDate', label: 'วันที่ และ เวลา', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'walletId', name: 'walletId', label: 'กระเป๋าเงิน', prop: 'walletId', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'billCycle', name: 'billCycle', label: 'รอบการชำระเงิน', prop: 'issueDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'MMMM BBBB', locale: 'th' } },
    { id: 'amount', name: 'amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'currency', currency: { currencyCode: ' ', display: 'symbol', digitsInfo: '1.2-2' } },
    { id: 'bill', name: 'Bill', label: 'ใบแจ้งหนี้', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'view', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];
  public data:IBill[]=this.bills;
  

  constructor(
    private router: Router,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private FormBuilder: FormBuilder
    ) {
    this.form = this.FormBuilder.group({
      startDate: new FormControl(undefined, [ Validators.required ])
      
    });
  }

  ngOnInit() {
    
  }

  loadBadDebt(startDate: Date){
    this.modalDialogService.loading();
    this.dataIsLoading = true;
    const payload = {
      // issueDate: "2024-06",
      issueDate: moment(startDate).format('YYYY-MM'),
      requestParam: {
        channelId: 2,
        reqId: "111908f1-04e9-499c"
      }
    };
    console.log('payload : ',payload);
    
    this.restApiService
      .postBackOffice('bill/get/bad-debt', payload)
      .pipe(
        first(),
        map(res => res as ResponseModel<IBill[]>)
      )
      .subscribe({
        next: (res) => {
          // console.log(res)
          this.bills = res.data;
          this.data = [...this.bills];
          console.log('response : ', this.bills)
          this.dataIsLoading = false;
         
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          console.error(err);
          this.dataIsLoading = false;
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
          // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/write-off-debt/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onSearch() {
    console.log("[onSearch]");
    this.loadBadDebt(this.form.value.startDate);
    console.log('data: ', this.data);
  }

  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }


}
