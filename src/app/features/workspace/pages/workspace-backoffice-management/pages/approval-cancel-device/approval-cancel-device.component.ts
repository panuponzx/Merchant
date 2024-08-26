import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { BorrowingModalComponent } from 'src/app/core/modals/borrowing-modal/borrowing-modal.component';

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

  public isHiddenFillter: boolean = false;

  public maxDate: Date = new Date();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal
    ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
    this.form = new FormGroup({
      startDate: new FormControl(undefined, [ Validators.required ]),
      endDate: new FormControl(undefined, [ Validators.required ]),
      checkpoint: new FormControl(undefined, [ Validators.required ])
    });
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/approval-cancel-device/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onSearch() {
    console.log("[onSearch]");
  }

  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }
  
}
