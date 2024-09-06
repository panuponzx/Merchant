import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IActionOptionResponse } from 'src/app/core/interfaces';
import { RestApiService } from 'src/app/core/services';
import { ModalDialogService } from 'src/app/core/services/modal-dialog/modal-dialog.service';
import { getOptionsText } from 'src/app/features/utils/textUtils';

@Component({
  selector: 'wallet-type-9-management',
  templateUrl: './wallet-type-9-management.component.html',
  styleUrl: './wallet-type-9-management.component.scss'
})
export class WalletType9ManagementComponent {
  form: FormGroup;
  public activeTab: 'customer' | 'wallet' | 'faremedia' | string | null = 'customer';
  public isHiddenFillter: boolean = false;
  public today: Date = new Date();
  public yesterday: Date = new Date(this.today);
  public maxDateEnd: Date = new Date(this.yesterday);
  public refreshTrigger: number = 0;
  public customerId: string = '';
  public walletId: string = '';
  public faremediaValue: string = '';
  public startDate: string = '';
  public endDate: string = '';
  public options: string[] = [];
  public showOptions: string[] = [];
  public actions: string[] = [];
  public isActionCheckboxOpen: boolean = false;
  constructor(
    private restApiService: RestApiService,
    private modalDialogService: ModalDialogService,
  ) {
    this.form = new FormGroup({
      searchSelect: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      endDate: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      startDate: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
      option: new FormControl([], [Validators.required]),
    });
  }
  ngOnInit() {
    this.activeTab = 'customer';
    this.loadActionOption();
    this.yesterday.setDate(this.today.getDate() - 1);
  }

  onChangeNav(event: NgbNavChangeEvent) {
    // const url = 'work-space/type-9-management/report-type-9-management/' + event.nextId;
    // console.log(url);
    this.activeTab = event.nextId;
    this.form.get("searchSelect")?.setValue(undefined);
    var optionForTab = [] as string[];
    if (this.activeTab === 'customer') {
      optionForTab = this.options
    } else if (this.activeTab === 'wallet') {
      optionForTab = this.options.filter((opt: string) => !opt.includes('CUSTOMER'));
    } else if (this.activeTab === 'faremedia') {
      optionForTab = this.options.filter((opt: string) => !opt.includes('WALLET') && !opt.includes('CUSTOMER'));
    }
    this.showOptions = optionForTab;
    this.form.get('option')?.setValue(optionForTab);
  }
  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }
  onEndDateChange(event : any){
    this.maxDateEnd = event;
  }
  handelSummit() {
    if (this.form.invalid) {
      return;
    }
    this.startDate = this.setDate(this.form.get('startDate')?.value);
    this.endDate = this.setDate(this.form.get('endDate')?.value);
    if (this.activeTab === 'customer') {
      this.customerId = this.form.get('searchSelect')?.value;
    } else if (this.activeTab === 'wallet') {
      this.walletId = this.form.get('searchSelect')?.value;
    } else if (this.activeTab === 'faremedia') {
      this.faremediaValue = this.form.get('searchSelect')?.value;
    }
    this.actions = this.form.get('option')?.value;
    this.refreshTrigger++;
  }
  setDate(date: Date) {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
  actionBox() {
    this.isActionCheckboxOpen = !this.isActionCheckboxOpen;
  }
  clearCriterion(){
    this.form.get("option")?.setValue([]);
  }
  selectAllCriterion(){
    this.form.get("option")?.setValue(this.showOptions);
  }
  closeCriterion(){
    this.isActionCheckboxOpen = false;
  }
  onCheckboxChange(event: any) {
    const selectedOption = event.target.value;
    const checked = event.target.checked;
    const currentValue = this.form.get('option')?.value || [];

    if (checked) {
      if (!currentValue.includes(selectedOption)) {
        this.form.get('option')?.setValue([...currentValue, selectedOption]);
      }
    } else {
      this.form.get('option')?.setValue(currentValue.filter((opt: string) => opt !== selectedOption));
    }
  }
  loadActionOption() {
    this._loadActionOption().subscribe({
      next: (res) => {
        this.options = res.data;
        this.showOptions = this.options;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  getOptionsText(value:string) {
    return getOptionsText(value)
    
  }

  _loadActionOption() {
    return this.restApiService.getBackOffice("customer-type-9/get-actions") as Observable<IActionOptionResponse>;
  }
  loadCsv() {
    if (this.activeTab === 'customer' && this.form.valid) {
      this._loadCsvCustomer("customer",this.customerId);
    } else if (this.activeTab === 'wallet' && this.form.valid) {
      this._loadCsvCustomer("wallet",this.walletId);
    } else if (this.activeTab === 'faremedia' && this.form.valid) {
      this._loadCsvCustomer("faremedia",this.faremediaValue);
    }
  }

  _loadCsvCustomer(tag :string,search:string) {
    let payload = {
      startDate: this.startDate,
      endDate: this.endDate,
      search: search,
      actions: this.actions,
      page: 0,
      limit: 10000
    };
    this.modalDialogService.loading();
    this.restApiService.postBackOfficeFile("customer-type-9/export-"+tag+"-log", payload)
      .subscribe({
        next: (res: any) => {
          this.modalDialogService.hideLoading();
          let a = document.createElement('a');
          a.download = "outstanding-reort.csv";
          a.href = window.URL.createObjectURL(res);
          a.click();
        },
        error: (err) => {
          console.error(err);
          this.modalDialogService.hideLoading();
          this.modalDialogService.handleError(err);
        }
      });
  }
}
