import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaremediaReportType9Component } from './faremedia-report-type9.component';

describe('FaremediaReportType9Component', () => {
  let component: FaremediaReportType9Component;
  let fixture: ComponentFixture<FaremediaReportType9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaremediaReportType9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaremediaReportType9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
