import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReportType9Component } from './customer-report-type9.component';

describe('CustomerReportType9Component', () => {
  let component: CustomerReportType9Component;
  let fixture: ComponentFixture<CustomerReportType9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerReportType9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerReportType9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
