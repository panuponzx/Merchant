import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMaintenanceFeeComponent } from './account-maintenance-fee.component';

describe('AccountMaintenanceFeeComponent', () => {
  let component: AccountMaintenanceFeeComponent;
  let fixture: ComponentFixture<AccountMaintenanceFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountMaintenanceFeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountMaintenanceFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
