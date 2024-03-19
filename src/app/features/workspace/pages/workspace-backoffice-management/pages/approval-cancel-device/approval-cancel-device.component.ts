import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approval-cancel-device',
  templateUrl: './approval-cancel-device.component.html',
  styleUrl: './approval-cancel-device.component.scss'
})
export class ApprovalCancelDeviceComponent {

  public approval: number = 1;

  public activeTab: 'waiting-for-approval' | 'approval' | 'reject' | string | null = 'waiting-for-approval';

  public submitted: boolean = false;
  public form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.form = new FormGroup({
      startDate: new FormControl(undefined, [ Validators.required ]),
      endDate: new FormControl(undefined, [ Validators.required ]),
      // walletId: new FormControl(this.allWallet.walletId, [ Validators.required ])
    });
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/approval-cancel-device/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onSearch() {
    console.log("[onSearch]");
  }
  
}
