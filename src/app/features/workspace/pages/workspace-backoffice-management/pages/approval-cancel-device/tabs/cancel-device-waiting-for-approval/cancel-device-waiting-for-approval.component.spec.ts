import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDeviceWaitingForApprovalComponent } from './cancel-device-waiting-for-approval.component';

describe('CancelDeviceWaitingForApprovalComponent', () => {
  let component: CancelDeviceWaitingForApprovalComponent;
  let fixture: ComponentFixture<CancelDeviceWaitingForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelDeviceWaitingForApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelDeviceWaitingForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
