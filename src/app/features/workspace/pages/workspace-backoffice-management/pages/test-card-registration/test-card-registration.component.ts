import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomColumnModel, RowActionEventModel } from 'src/app/core/interfaces';
import { BorrowingModalComponent } from 'src/app/core/modals/borrowing-modal/borrowing-modal.component';
import { RegisterCardComponent } from 'src/app/core/modals/register-card/register-card.component';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-test-card-registration',
  templateUrl: './test-card-registration.component.html',
  styleUrls: ['./test-card-registration.component.scss']
})
export class TestCardRegistrationComponent {
  public approval: number = 1;
  public pages: number = 1;

  public activeTab: 'waiting-for-approval' | 'approval' | 'reject' | string | null = 'waiting-for-approval';

  public submitted: boolean = false;
  public form: FormGroup;
  public isLoading: boolean = false;
  public collectionSize: number = 0;
  public limitRow: number = 10;

  public isHiddenFillter: boolean = false;
  public rows: any = [];
  public tempRows: any = [];
  public isOpenDetail: boolean = false;
  public maxDate: Date = new Date();
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'isActive', name: 'isActive', label: 'สถานะ', prop: 'isActive', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-primary', textCondition1: 'Active', classCondition2: ' text-red', textCondition2: 'In Active' } },
    { id: 'reservationStatusd', name: 'reservationStatusd', label: 'สถานะการจอง', prop: 'reservationStatusd', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-red', textCondition1: 'จอง', classCondition2: 'text-primary ', textCondition2: 'ว่าง' } },
    { id: 'withdrawOrBorrow', name: 'withdrawOrBorrow', label: 'เบิก / ยืม', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'เบิก/ยืม' } },
    { id: 'returnObu', name: 'returnObu', label: 'คืน OBU', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'คืน' } },
    { id: 'detail', name: 'detail', label: 'รายงานการเบิกยืมคืน', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'รายงาน' } },

  ];
  public columnsDetail: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'name', name: 'name', label: 'ชื่อ-นามสกุล', prop: 'name', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'institute', name: 'institute', label: 'หน่วยงาน', prop: 'institute', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'withdrawOrBorrowDate', name: 'withdrawOrBorrowDate', label: 'วันที่ทำการเบิก/ยืม', prop: 'withdrawOrBorrowDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'ExpectedReturnDate', name: 'ExpectedReturnDate', label: 'วันที่ทำการคาดว่าจะคืน', prop: 'ExpectedReturnDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'ReturnDate', name: 'ReturnDate', label: 'วันที่ทำการคืน', prop: 'ReturnDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'remark', name: 'remark', label: 'หมายเหตุ', prop: 'remark', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
  ];
  public detailRows: any = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal
  ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.form = new FormGroup({
      startDate: new FormControl(undefined, [Validators.required]),
      endDate: new FormControl(undefined, [Validators.required]),
      checkpoint: new FormControl(undefined, [Validators.required]),
      search: new FormControl(undefined, [Validators.required])
    });
    this.rows = [
      {
        faremediaValue: 'C123456',
        isActive: true,
        reservationStatusd: true,
      },
      {
        faremediaValue: 'C123457',
        isActive: true,
        reservationStatusd: false,
      },
      {
        faremediaValue: 'C123458',
        isActive: false,
        reservationStatusd: false,
      }
    ];
    this.detailRows = [
      {
        faremediaValue: 'C123456',
        name: 'นาย สมชาย ใจดี',
        institute: 'สำนักงานปลัดกระทรวงคมนาคม',
        withdrawOrBorrowDate: new Date("2021-07-01 10:31:21"),
        ExpectedReturnDate: new Date("2021-07-10 5:12:33"),
        ReturnDate: new Date("2021-07-10 10:31:21"),
        remark: 'ไม่มี'
      },
      {
        faremediaValue: 'C123456',
        name: 'นาย มานะ ใจดี',
        institute: 'สำนักงานปลัดกระทรวงคมนาคม',
        withdrawOrBorrowDate: new Date("2021-08-01 10:31:21"),
        ExpectedReturnDate: new Date("2021-08-10 11:31:21"),
        ReturnDate: new Date("2021-08-10 7:31:21"),
        remark: 'ไม่มี'
      },
      {
        faremediaValue: 'C123456',
        name: 'นาย สมชาย ใจดี',
        institute: 'สำนักงานปลัดกระทรวงคมนาคม',
        withdrawOrBorrowDate: new Date("2021-09-01 10:31:21"),
        ExpectedReturnDate: new Date("2021-09-10 9:31:21"),
        ReturnDate: new Date("2021-09-10 11:31:21"),
        remark: 'ไม่มี'
      }
    ];
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/approval-cancel-device/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onActive(event: RowActionEventModel) {
    var row = event.row;
    console.log('action: ', event.action);
    if (event.action ==="detail"){
      this.isOpenDetail = true;
      this.detailRows = this.detailRows.map((item: any, index: number) => {
        return {
          ...item,
          faremediaValue: /* In the provided TypeScript code, the `row` variable is being used in the
          `onActive` method of the `TestCardRegistrationComponent` class. It is a
          parameter of type `RowActionEventModel` that represents the row data
          associated with the action being performed on a specific row in a table. */
          row.faremediaValue,
        }
      });
    }else if (event.action === "withdrawOrBorrow") {

        const modalRef = this.ngbModal.open(BorrowingModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false,
        });
        modalRef.componentInstance.actionType ="borrow";
        modalRef.componentInstance.title = "การยืม OBU";
        modalRef.result.then(
          (result) => {
            console.log('result: ', result);
            modalRef.close();
            row.reservationStatusd = true;
            // this.rows = this.rows.map((item: any) => {
            //   if (item.faremediaValue === row.faremediaValue) {
            //     return {
            //       ...item,
            //       isActive: true,
            //       reservationStatusd: false,
            //     }
            //   }
            // });
          },
          (reason) => {
          }
        );
    }else if (event.action === "returnObu") {
      const modalRef = this.ngbModal.open(BorrowingModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });
      modalRef.componentInstance.title = "การคืน OBU";
      modalRef.componentInstance.actionType ="1234";
      modalRef.result.then(
        (result) => {
          console.log('result: ', result);
          modalRef.close();
          row.reservationStatusd = false;
        },
        (reason) => {
        }
      );
    }
  }
  RegisterFormModal() {
    const modalRef = this.ngbModal.open(RegisterCardComponent, {
      centered: true,
      backdrop: 'static',
      size: 'm',
      keyboard: false,
    });
    modalRef.result.then(
      (result) => {
        var faremedia = {
          "faremediaValue": result,
          "isActive": true,
          "reservationStatusd": false,
        }
        this.rows = [...this.rows, faremedia];
        console.log('this.rows: ', this.rows);
      },
      (reason) => {
      }
    );
  }
  backToMain(){
    this.isOpenDetail = false;
  }
}
