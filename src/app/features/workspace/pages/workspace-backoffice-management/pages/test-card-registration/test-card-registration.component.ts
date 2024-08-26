import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomColumnModel, RowActionEventModel } from 'src/app/core/interfaces';
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

  public maxDate: Date = new Date();
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'อันดับ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'faremediaValue', name: 'faremediaValue', label: 'หมายเลขอุปกรณ์', prop: 'faremediaValue', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'isActive', name: 'isActive', label: 'สถานะ', prop: 'isActive', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-primary', textCondition1: 'Active', classCondition2: ' text-red', textCondition2: 'In Active' } },
    { id: 'reservationStatusd', name: 'reservationStatusd', label: 'สถานะการจอง', prop: 'reservationStatusd', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text-with-boolean', textWithBoolean: { classCondition1: 'text-red', textCondition1: 'จอง', classCondition2: 'text-primary ', textCondition2: 'ว่าง' } },
    { id: 'withdrawOrBorrow', name: 'withdrawOrBorrow', label: 'เบิก / ยืม', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'เบิก/ยืม' } },
    { id: 'returnObu', name: 'returnObu', label: 'คืน OBU', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'คืน' } },
    { id: 'detail', name: 'detail', label: 'รายงานการเบิกยืมคืน', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'รายงาน' } },

  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private restApiService: RestApiService,
    private ngbModal: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        faremediaValue: 'C123456',
        isActive: false,
        reservationStatusd: false,
      }
    ];
  }
  
  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/approval-cancel-device/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onSearch() {
    this.load();
  }

  load() {
    this.modalDialogService.loading();
    this.isLoading = true;
    const data = {
      limit: 5,
      page: 1,
      identificationId: this.form.get('search')?.value
    }
  }
  
  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }

  RegisterFormModal() {
    const initialData = {
      name: 'John Doe',
      email: 'john.doe@example.com'
    };
    this.modalDialogService.RegisterFormModal(initialData).then(
      (result) => {
        if (result) {
          console.log('Form submitted with:', result);
          
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }
}
