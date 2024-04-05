import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalManagementWaitingComponent } from './approval-management-waiting.component';

describe('ApprovalManagementWaitingComponent', () => {
  let component: ApprovalManagementWaitingComponent;
  let fixture: ComponentFixture<ApprovalManagementWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalManagementWaitingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalManagementWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
