import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { first, map } from 'rxjs';
import { CustomColumnModel, ReponseTopupModel, RowActionEventModel, TopupModel } from '../../../../../../../../core/interfaces';
import { TopupPayloadModel } from '../../../../../../../../core/interfaces/payload.interface';
import { RestApiService } from '../../../../../../../../core/services';
import { ModalDialogService } from '../../../../../../../../core/services/modal-dialog/modal-dialog.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PassageInfoModalComponent } from '../../../../modals/passage-info-modal/passage-info-modal.component';
import { ConfirmCancelWithEmployeeIdComponent } from '../../../../modals/confirm-cancel-with-employee-id/confirm-cancel-with-employee-id.component';

@Component({
  selector: 'topup-information',
  templateUrl: './topup-information.component.html',
  styleUrl: './topup-information.component.scss'
})
export class TopupInformationComponent implements OnInit {

  @Input() public tempSearch: TopupPayloadModel | undefined;
  @Input() public customerId: string | null = null;

  public rows: TopupModel[] = [];
  @Input() public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'transactionDate', name: 'Transaction Date', label: 'วันที่เติมเงิน', prop: 'transactionDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'DD/MM/BBBB HH:mm:ss', locale: 'th' } },
    { id: 'walletID', name: 'Wallet ID', label: 'หมายเลขกระเป่าเงิน', prop: 'walletId', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'paymentMethod', name: 'Payment Method', label: 'ช่องทางการชำระ', prop: 'transactionChannelName', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'type', name: 'Type', label: 'ประเภท', prop: 'txnSubTypeName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'hqId', name: 'HqId', label: 'สายทาง', prop: 'hqId', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'plazaId', name: 'PlazaId', label: 'อาคารด่าน', prop: 'plazaId', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'bankName', name: 'bankName', label: 'ชื่อธนาคาร', prop: 'bankName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'chequeDate', name: 'Cheque Date', label: 'วันที่ออกเช็ค', prop: 'chequeDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'chequeNumber', name: 'Cheque Number', label: 'เลขที่เช็ค', prop: 'chequeNumber', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'cardNumber', name: 'Card Number', label: 'หมายเลขบัตรเครดิต', prop: 'creditCardNumber', sortable: false, resizeable: true, width: 250, minWidth: 250, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'amount', name: 'Amount', label: 'จำนวนเงิน', prop: 'amount', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'number', numberFormat: '1.2-2' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'status', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'cancel', name: 'Cancel', label: 'ยกเลิก', prop: 'isCancelled', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'cancel' }
  ];

  public isLoading: boolean = false;

  @Output() public onLoading: EventEmitter<boolean> = new EventEmitter<boolean>(false)

  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private ngbModal: NgbModal
  ) {
  }

  ngOnInit(): void {
    if (this.tempSearch) {
      this.loadTopupInformation(this.tempSearch);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("[ngOnChanges]");
    const tempSearch = changes['tempSearch'];
    if (tempSearch.previousValue) {
      this.loadTopupInformation(tempSearch.currentValue);
    }
  }

  loadTopupInformation(data: TopupPayloadModel) {
    this.isLoading = true;
    this.onLoading.emit(true);
    this.modalDialogService.loading();
    const mockupData = {
      customerId: this.customerId,
      from: data.from,
      to: data.to,
      walletId: data.walletId,
      page: data.page
    };
    this.restApiService
      .postBackOffice('transaction-history/get-topup', mockupData)
      .pipe(
        first(),
        map(res => res as ReponseTopupModel)
      )
      .subscribe({
        next: (res) => {
          console.log(res)
          this.rows = res.transactions;
          this.collectionSize = res.totalTransactions;
          this.isLoading = false;
          this.onLoading.emit(false);
          this.modalDialogService.hideLoading();
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.onLoading.emit(false);
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
          // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body?.errorMessage? `${err.body.errorMessage}` : `${err.error.errorMessage}`);
        }
      });
  }

  onChangePage(event: number) {
    console.log("[onChangePage] event => ", event);
    this.pages = event;
    if(this.tempSearch) {
      this.tempSearch.page = event;
      this.loadTopupInformation(this.tempSearch);
    }
  }

  onAction(event: RowActionEventModel) {
    console.info(event)
  }

  onCancel(event: RowActionEventModel) {
    console.log("[onCancel] event => ", event);
    const row: TopupModel = event.row;
    const modalRef = this.ngbModal.open(ConfirmCancelWithEmployeeIdComponent, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'ยกเลิกการเติมเงิน';
    modalRef.componentInstance.onSubmitted = () => {
      const data = {
        transactionId: row.transactionId,
        amount: row.amount,
      }
      this.modalDialogService.loading();
      return this.restApiService
        .postBackOffice('transaction-balance/void-topup', data)
        .pipe(
          first(),
          map(res => res as any)
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            this.modalDialogService.hideLoading();
            if (res.errorMessage === "Success") {
              this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การยกเลิกการเติมเงินสำเร็จ').then((res: boolean) => {
                if (res && this.tempSearch) this.loadTopupInformation(this.tempSearch);
              });
            } else {
              this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
            }
          },
          error: (err) => {
            this.modalDialogService.hideLoading();
            console.error(err);
            this.modalDialogService.handleError(err);
            // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body.errorMessage);
            
          }
        })
    }
    // this.modalDialogService.confirm(
    //   'ยืนยันการยกเลิกการเติมเงิน',
    //   'กรุณายืนยัน',
    //   'กลับ',
    //   'ยกเลิกการเติมเงิน')
    //   .then((res: boolean) => {
    //     console.log("[confirm] res => ", res);
    //     if (res) {
    //       const data = {
    //         transactionId: row.transactionId,
    //         amount: row.amount,
    //       }
    //       this.modalDialogService.loading();
    //       this.restApiService
    //         .postBackOffice('transaction-balance/void-topup', data)
    //         .pipe(
    //           first(),
    //           map(res => res as any)
    //         )
    //         .subscribe({
    //           next: (res) => {
    //             console.log(res);
    //             this.modalDialogService.hideLoading();
    //             if (res.errorMessage === "Success") {
    //               this.modalDialogService.info('success', '#32993C', 'ทำรายการสำเร็จ', 'การยกเลิกการเติมเงินสำเร็จ').then((res: boolean) => {
    //                 if (res && this.tempSearch) this.loadTopupInformation(this.tempSearch);
    //               });
    //             } else {
    //               this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', res.errorMessage);
    //             }
    //           },
    //           error: (err) => {
    //             console.error(err);
    //             this.modalDialogService.handleError(err);
    //             // this.modalDialogService.info('warning', '#2255CE', 'เกิดข้อผิดพลาด', err.body.errorMessage);
    //             this.modalDialogService.hideLoading();
    //           }
    //         })
    //     }
    //   })
  }

}
