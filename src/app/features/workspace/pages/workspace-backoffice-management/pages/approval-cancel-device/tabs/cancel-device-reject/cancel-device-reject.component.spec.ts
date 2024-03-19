import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDeviceRejectComponent } from './cancel-device-reject.component';

describe('CancelDeviceRejectComponent', () => {
  let component: CancelDeviceRejectComponent;
  let fixture: ComponentFixture<CancelDeviceRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelDeviceRejectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelDeviceRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
