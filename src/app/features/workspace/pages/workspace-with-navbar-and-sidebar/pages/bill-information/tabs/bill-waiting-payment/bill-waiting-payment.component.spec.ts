import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWaitingPaymentComponent } from './bill-waiting-payment.component';

describe('BillWaitingPaymentComponent', () => {
  let component: BillWaitingPaymentComponent;
  let fixture: ComponentFixture<BillWaitingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillWaitingPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillWaitingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
