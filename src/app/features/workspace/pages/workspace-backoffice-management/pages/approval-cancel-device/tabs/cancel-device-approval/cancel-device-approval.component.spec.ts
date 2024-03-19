import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDeviceApprovalComponent } from './cancel-device-approval.component';

describe('CancelDeviceApprovalComponent', () => {
  let component: CancelDeviceApprovalComponent;
  let fixture: ComponentFixture<CancelDeviceApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelDeviceApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelDeviceApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
