import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalManagementRejectComponent } from './approval-management-reject.component';

describe('ApprovalManagementRejectComponent', () => {
  let component: ApprovalManagementRejectComponent;
  let fixture: ComponentFixture<ApprovalManagementRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalManagementRejectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalManagementRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
