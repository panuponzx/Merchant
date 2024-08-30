import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportType9Component } from './report-type-9.component';

describe('ReportType9Component', () => {
  let component: ReportType9Component;
  let fixture: ComponentFixture<ReportType9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportType9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportType9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
