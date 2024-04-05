import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalManagementApprovalComponent } from './approval-management-approval.component';

describe('ApprovalManagementApprovalComponent', () => {
  let component: ApprovalManagementApprovalComponent;
  let fixture: ComponentFixture<ApprovalManagementApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalManagementApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalManagementApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
