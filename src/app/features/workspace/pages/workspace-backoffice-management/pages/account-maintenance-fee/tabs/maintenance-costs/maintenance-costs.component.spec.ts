import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceCostsComponent } from './maintenance-costs.component';

describe('MaintenanceCostsComponent', () => {
  let component: MaintenanceCostsComponent;
  let fixture: ComponentFixture<MaintenanceCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintenanceCostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenanceCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
