import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemManagementComponent } from './redeem-management.component';

describe('RedeemManagementComponent', () => {
  let component: RedeemManagementComponent;
  let fixture: ComponentFixture<RedeemManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedeemManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedeemManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
