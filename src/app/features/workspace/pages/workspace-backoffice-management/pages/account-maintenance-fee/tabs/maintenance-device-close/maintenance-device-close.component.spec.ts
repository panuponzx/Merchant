import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceDeviceCloseComponent } from './maintenance-device-close.component';

describe('MaintenanceDeviceCloseComponent', () => {
  let component: MaintenanceDeviceCloseComponent;
  let fixture: ComponentFixture<MaintenanceDeviceCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintenanceDeviceCloseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenanceDeviceCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
