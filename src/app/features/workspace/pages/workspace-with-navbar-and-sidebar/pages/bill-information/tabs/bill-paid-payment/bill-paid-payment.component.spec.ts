import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPaidPaymentComponent } from './bill-paid-payment.component';

describe('BillPaidPaymentComponent', () => {
  let component: BillPaidPaymentComponent;
  let fixture: ComponentFixture<BillPaidPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillPaidPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillPaidPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
