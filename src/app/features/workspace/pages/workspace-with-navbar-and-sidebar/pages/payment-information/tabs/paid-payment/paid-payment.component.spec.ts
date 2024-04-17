import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidPaymentComponent } from './paid-payment.component';

describe('PaidPaymentComponent', () => {
  let component: PaidPaymentComponent;
  let fixture: ComponentFixture<PaidPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaidPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
