import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomColumnModel } from '../../../../../../core/interfaces';

@Component({
  selector: 'app-approval-management',
  templateUrl: './approval-management.component.html',
  styleUrl: './approval-management.component.scss'
})
export class ApprovalManagementComponent {

  public approvalList = [
    {
      label: 'การสร้างผู้ใช้',
      id: 1
    },
    {
      label: 'การสร้างกระเป๋า',
      id: 2
    }
  ];

  public approval: number = 1;

  public activeTab: 'waiting-for-approval' | 'approval' | 'reject' | string | null;

  public columns: CustomColumnModel[] = [
    { id: 'createDate', name: 'Create Date', label: 'วันที่ และ เวลา', prop: 'createDate', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'date', date: { format: 'D MMMM BBBB HH:mm:ss', locale: 'th' } },
    { id: 'userName', name: 'User Name', label: 'ชื่อผู้ใช้งาน', prop: 'userName', sortable: false, resizeable: true, width: 200, minWidth: 200, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'status', name: 'Status', label: 'สถานะ', prop: 'status', sortable: false, resizeable: true, width: 130, minWidth: 130, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'nameOfEmployee ', name: 'Name of Employee', label: 'ชื่อพนักงานทำรายการ', prop: 'nameOfEmployee', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-center text-break', type: 'text' },
    { id: 'description', name: 'Description', label: 'รายละเอียด', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { actionName: 'description', iconName: 'list', size: 'l', color: '#2255CE' } }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('tab');
  }

  onChangeNav(event: NgbNavChangeEvent) {
    const url = 'work-space/approval-management/' + event.nextId;
    this.router.navigate([url], { replaceUrl: true });
  }

}
