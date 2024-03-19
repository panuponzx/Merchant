import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCancelDeviceComponent } from './approval-cancel-device.component';

describe('ApprovalCancelDeviceComponent', () => {
  let component: ApprovalCancelDeviceComponent;
  let fixture: ComponentFixture<ApprovalCancelDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalCancelDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalCancelDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
