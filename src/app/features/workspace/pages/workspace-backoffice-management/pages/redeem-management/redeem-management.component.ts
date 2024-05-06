import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { RowActionEventModel, CustomerModel } from '../../../../../../core/interfaces';

@Component({
  selector: 'app-redeem-management',
  templateUrl: './redeem-management.component.html',
  styleUrl: './redeem-management.component.scss'
})
export class RedeemManagementComponent {

  public approval: number = 1;

  public activeTab: 'exchange' | 'coupon' | 'toll' | string | null = 'exchange';
  @ViewChild('inputFile', { static: false }) private inputFileEl: | ElementRef | any;


  public isAdd: boolean = false;
  public submitted: boolean = false;
  public form: FormGroup;

  public tempSearch: string | undefined;

  public isLoading = false;



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.form = this.formBuilder.group({
      type: new FormControl(undefined, Validators.required),
      itemName: new FormControl(undefined, Validators.required),
      startDate: new FormControl(undefined, Validators.required),
      endDate: new FormControl(undefined, Validators.required),
      totalPoint: new FormControl(undefined, Validators.required),
      description: new FormControl(undefined, Validators.required),
      condition: new FormControl(undefined, Validators.required),
    });
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/manage-redeem/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onAdd(): void {
    this.isAdd = true;
  }

  fileTypeValidation(event: any) {
    let files = event.target.files[0];
    this.form.get('attachDocument')?.setValue(files);
    console.log("[fileTypeValidation] files => ", files);
    console.log("[fileTypeValidation] attachDocument => ", this.form.get('attachDocument')?.value);
    this.inputFileEl.nativeElement.value = null;
  }

  onAction(event: RowActionEventModel) {
    if (event.action === 'description' && event.row) {
      // const row = event.row as CustomerModel;
      // this.router.navigate(['work-space/user-info/general-info/' + row.id]);
    }
  }

  onSubmit() {
    console.log("[onSubmit] form => ", this.form.value);
  }

  onBack() {
    this.submitted = false;
    this.isAdd = false;
    this.tempSearch = undefined;
    this.form.reset();
  }

}
