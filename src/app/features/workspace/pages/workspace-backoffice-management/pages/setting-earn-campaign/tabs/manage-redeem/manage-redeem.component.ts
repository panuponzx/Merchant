import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { CustomColumnModel,CustomerModel,ReponseSearchCustomerModel,RowActionEventModel } from '../../../../../../../../core/interfaces';
import { RestApiService } from '../../../../../../../../core/services';
import { style, animate, transition, trigger, stagger, query } from '@angular/animations';
import { id } from '@swimlane/ngx-datatable';
import { TabGuard } from '../../../../../../../../core/guards';

@Component({
  selector: 'app-manage-redeem',
  templateUrl: './manage-redeem.component.html',
  styleUrl: './manage-redeem.component.scss'
})
export class ManageRedeemComponent {

  public approval: number = 1;

  public activeTab: 'Exchange-products' | 'coupon' | 'toll' | string | null = 'Exchange-products';


isHiddenFillter: any;

  constructor(
    
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/manage-redeem/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }



  
  

  public submitted: boolean = false;
  public form: FormGroup = new FormGroup({
    customerTypeId: new FormControl('domestic', [ Validators.required ]),
    citizenId: new FormControl(undefined, [ Validators.required ])
  });

  public tempSearch: string | undefined;

  public isLoading = false;
  



  onAction(event: RowActionEventModel) {
    if (event.action === 'description' && event.row) {
      const row = event.row as CustomerModel;
      this.router.navigate(['work-space/user-info/general-info/' + row.id]);
    }
  }

  onBack() {
    this.submitted = false;
    this.tempSearch = undefined;
    this.form.reset();
    this.form.controls['customerTypeId'].setValue('domestic');
  }

  


}
