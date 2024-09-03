import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomColumnModel, ICustomerType9Model, IResponseCustomerType9Model, RowActionEventModel } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'customer-type-9-management',
  templateUrl: './customer-type-9-management.component.html',
  styleUrl: './customer-type-9-management.component.scss'
})
export class CustomerType9ManagementComponent {
  formSearch: FormGroup;
  @Input() refreshTrigger: number = 0;
  @Input() customerName: string = '';
  @Output() hiddenSearchMenu: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  public isLoading: boolean = true;
  public limitRow: number = 10;
  public step: number = 0;
  public pages: number = 1;
  public columns: CustomColumnModel[] = [
    { id: 'no', name: 'no', label: 'รายการ', prop: '', sortable: false, resizeable: true, width: 90, minWidth: 90, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'no' },
    { id: 'id', name: 'id', label: 'id', prop: 'CustomerId', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'name', name: 'name', label: 'ชื่อหน่วยงาน', prop: 'name', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'remark', name: 'remark', label: 'หมายเหตุ', prop: 'remark', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'create_date', name: 'create_date', label: 'ลงทะเบียนเมื่อ', prop: 'create_date', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB', locale: 'th' } },
    { id: 'detail', name: 'detail', label: 'การจัดการ', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'button', button: { label: 'จัดการ', class: 'btn-link' } },
  ];
  public rows: ICustomerType9Model[] = [];
  public collectionSize: number = this.rows.length;
  public selectedCustomerId: string = '';
  public searchType: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
    private activeRoute : ActivatedRoute
  ) {
    this.formSearch = new FormGroup({
      search: new FormControl({ value: undefined, disabled: false }, [Validators.required])
    });
    this.selectedCustomerId = this.activatedRoute.snapshot.paramMap.get('id')?.toString() || '';
  }
  ngOnChanges(changes: SimpleChanges) {
    this.activeRoute.queryParams.subscribe(params => {
      this.searchType = params['searchType']; 
    });
    if (changes['refreshTrigger'] && !changes['refreshTrigger'].firstChange) {
      this.loadCustomerType9();
    }
  }

  ngOnInit() {
    if (!this.selectedCustomerId) {
      this.loadCustomerType9();
    } else {
      this.hiddenSearchMenu.emit(true);
    }

  }
  onActive(event: RowActionEventModel) {
    this.selectedCustomerId = event.row.id;

    this.router.navigate(['/work-space/type-9-management/wallet-type-9-management', this.selectedCustomerId], { relativeTo: this.activatedRoute });
    console.log("onActive", this.selectedCustomerId);
    this.hiddenSearchMenu.emit(true);
  }
  handleOnBack(value: boolean) {
    this.hiddenSearchMenu.emit(value);
    this.selectedCustomerId = '';
    this.router.navigate(['/work-space/type-9-management/wallet-type-9-management'], { relativeTo: this.activatedRoute });
    this.loadCustomerType9();
  }
  onChangePage(page: number) {
    this.pages = page;
  }
  loadCustomerType9() {
    this.isLoading = true;
    if (this.customerName !== '') {
      this.modalDialogService.loading();
    }
    this._loadCustomerType9().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        this.rows = response.data.elements;
        this.collectionSize = response.data.totalElements;
        this.pages = response.data.page;
        this.limitRow = response.data.pageSize;
      },
      error: (error) => {
        this.isLoading = false;
        this.modalDialogService.hideLoading();
        this.modalDialogService.handleError(error);
      },
    });
  }
  _loadCustomerType9() {
    let payload = {
      page: this.pages,
      limit: this.limitRow,
      search: this.customerName !== '' ? this.customerName : null
    };
    return this.restApiService.postBackOffice("customer-type-9/get-customers", payload) as Observable<IResponseCustomerType9Model>;
  }
}
