import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomColumnModel, CustomerModel, RowActionEventModel } from '../../../../../../../../core/interfaces';
import { Subject, distinctUntilChanged, of, switchMap } from 'rxjs';
import { RestApiService } from '../../../../../../../../core/services';

@Component({
  selector: 'approval-management-approval',
  templateUrl: './approval-management-approval.component.html',
  styleUrl: './approval-management-approval.component.scss'
})
export class ApprovalManagementApprovalComponent {
  @Input() public tempSearch: any | undefined;
  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public columns: CustomColumnModel[] = [
    { id: 'date', name: 'Date', label: 'วันที่ และ เวลา ที่สร้าง', prop: 'date', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'userName', name: 'User Name', label: 'ชื่อผู้ใช้', prop: 'userName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'status', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'nameEmpTransaction', name: 'Name Emp Transaction', label: 'ชื่อพนักงานทำรายการ', prop: 'nameEmpTransaction', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  public rows: any = [];
  public tempRows: any = [];

  public isLoading: boolean = false;

  public customer: CustomerModel | undefined;
  public form!: FormGroup;
  public isShowDescription: boolean = false;

  public detailInformationTab: string | 'information-company' | 'information-visitor' = 'information-visitor';
  public minDate: Date = new Date();

  public postalCodeChanged = new Subject<string>();
  public postalCodeList: any = [];
  public subDistrictList: any = [];
  public districtList: any = [];
  public provinceList: any = [];

  @Output() hiddenFillterMenu: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private restApiService: RestApiService
  ) {
    this.postalCodeChanged.pipe(distinctUntilChanged(), switchMap((searchText: any) => {
      if (searchText.length === 5) {
        return this.restApiService.get(`zip-code/code/${searchText}`);
      } else {
        return of([]);
      }
    })).subscribe(async (res: any) => {
      console.log("[subscribe] res => ", res);
      this.postalCodeList = await res.zipCodes;
      console.log("[subscribe] res => ", this.postalCodeList);
      if (this.postalCodeList && this.postalCodeList.length === 0 || res && Object.keys(res).length === 0) {
        this.form.get('subDistrict')?.disable();
        this.form.get('subDistrict')?.setValue(undefined);
        this.form.get('district')?.setValue(undefined);
        this.form.get('province')?.setValue(undefined);
      }else {
        this.form.get('subDistrict')?.enable();
      };
    });

    this.form = this.formBuilder.group({
      citizenId: new FormControl({value: undefined, disabled: false}, Validators.required),
      cardExpDate:  new FormControl({value: undefined, disabled: false}, Validators.required),
      gender:  new FormControl({value: 'M', disabled: false}, Validators.required),
      firstName: new FormControl({value: undefined, disabled: false}, Validators.required),
      lastName: new FormControl({value: undefined, disabled: false}, Validators.required),
      birthDate: new FormControl({value: undefined, disabled: false}, Validators.required),
      phone: new FormControl({value: undefined, disabled: false}, Validators.required),
      // firstName: new FormControl({value: undefined, disabled: false}, Validators.required),
      taxId: new FormControl({value: undefined, disabled: false}, Validators.required),
      companyName: new FormControl({value: undefined, disabled: false}, Validators.required),
      branch: new FormControl({value: undefined, disabled: false}, Validators.required),
      branchName: new FormControl({value: undefined, disabled: false}, Validators.required),
      branchNo: new FormControl({value: undefined, disabled: false}, Validators.required),
      companyNumber: new FormControl({value: undefined, disabled: false}, Validators.required),
      // firstName: new FormControl({value: undefined, disabled: false}, Validators.required),
      addressNo: new FormControl({value: undefined, disabled: false}, Validators.required),
      building: new FormControl({value: undefined, disabled: false}, Validators.required),
      floor: new FormControl({value: undefined, disabled: false}, Validators.required),
      soi: new FormControl({value: undefined, disabled: false}, Validators.required),
      street: new FormControl({value: undefined, disabled: false}, Validators.required),
      postalCode: new FormControl({value: undefined, disabled: false}, Validators.required),
      subDistrict: new FormControl({value: undefined, disabled: false}, Validators.required),
      district: new FormControl({value: undefined, disabled: false}, Validators.required),
      province: new FormControl({value: undefined, disabled: false}, Validators.required),
    });
    this.rows = [
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
      {
        date: '21/04/2556 19:10:32',
        userName: 'ชื่อบริษัท',
        status: 'รอการอนุมัติ',
        nameEmpTransaction: 'นายทดสอบ ทดสอบ'
      },
    ];
    this.tempRows = this.rows;
    this.collectionSize = this.rows.length;

    this.customer = {
      id: "c00000006",
      customerTypeId: 1,
      customerTypeName: "Personal",
      title: "นาย",
      firstName: "ทดสอบจำนวนตัวอักษร",
      lastName: "ตัวหนังสือที่ยาวมาก",
      mobilePhone: "0098998098",
      citizenId: "5432178998791",
      channelId: 100,
      gender: "M",
      cardExpDate: "2024-03-30",
      birthdate: "2023-10-09",
      occupation: "พนักงานบริษัท",
      status: 1,
      createDate: "2024-02-27T01:07:16.062+00:00",
      citizenDocId: 1,
      taxId: "1234567890123",
      branchTypeId: 0,
      firstNameEng: '',
      email: ''
    }
  }

  onKeyUpPostalCode(event: any) {
    this.postalCodeChanged.next(event.target.value);
  }

  onChangeSubDistrict(even: any) {
    console.log("[onChangeSubDistrict] even => ", even);
    this.districtList = [even.subdistrict.district];
    this.provinceList = [even.subdistrict.district.province];
    this.form.get('district')?.setValue(this.districtList[0]);
    this.form.get('province')?.setValue(this.provinceList[0]);
  }

  onChangePage(event: number) {
    this.pages = event;
  }

  onAction(event: RowActionEventModel) {
    console.info(event);
    this.isShowDescription = true;
    this.hiddenFillterMenu.emit(true);
  }

  onBack() {
    this.isShowDescription = false;
    this.hiddenFillterMenu.emit(false);
  }

}