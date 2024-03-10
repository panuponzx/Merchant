import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPendingComponent } from './billing-pending.component';

describe('BillingPendingComponent', () => {
  let component: BillingPendingComponent;
  let fixture: ComponentFixture<BillingPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillingPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
