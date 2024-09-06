import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-type-9-management',
  templateUrl: './type-9-management.component.html',
  styleUrl: './type-9-management.component.scss'
})
export class Type9ManagementComponent {

  public approval: number = 1;

  public activeTab: 'wallet-type-9-management' | 'report-type-9-management' |  string | null = 'wallet-type-9-management';

  public submitted: boolean = false;
  public isHiddenFillter: boolean = false;

  public maxDate: Date = new Date();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal
  ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/type-9-management/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

  onSearch() {
    console.log("[onSearch]");
  }

  handleHiddenFillterMenu(value: boolean) {
    this.isHiddenFillter = value;
  }
  onBack(){
    this.router.navigate(['work-space/menu-option-super-admin']);
  }

}
