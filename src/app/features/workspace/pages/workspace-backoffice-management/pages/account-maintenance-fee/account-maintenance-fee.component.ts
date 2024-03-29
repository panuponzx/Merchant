import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-maintenance-fee',
  templateUrl: './account-maintenance-fee.component.html',
  styleUrl: './account-maintenance-fee.component.scss'
})
export class AccountMaintenanceFeeComponent {

  public approval: number = 1;

  public activeTab: 'maintenance-costs' | 'maintenance-device-close' | string | null = 'maintenance-costs';

  public submitted: boolean = false;
  public form: FormGroup;

  public isHiddenFillter: boolean = false;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.form = new FormGroup({
      date: new FormControl(undefined, [ Validators.required ]),
      // checkpoint: new FormControl(undefined, [ Validators.required ]),
      search: new FormControl(undefined, [ Validators.required ]),
    });
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/account-maintenance-fee/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onSearch() {
    console.log("[onSearch]");
  }

  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }
  
}
