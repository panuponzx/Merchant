import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletReportType9Component } from './wallet-report-type9.component';

describe('WalletReportType9Component', () => {
  let component: WalletReportType9Component;
  let fixture: ComponentFixture<WalletReportType9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletReportType9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletReportType9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
