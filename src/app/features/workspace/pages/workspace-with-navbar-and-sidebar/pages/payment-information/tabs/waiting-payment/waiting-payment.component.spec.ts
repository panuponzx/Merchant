import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPaymentComponent } from './waiting-payment.component';

describe('WaitingPaymentComponent', () => {
  let component: WaitingPaymentComponent;
  let fixture: ComponentFixture<WaitingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaitingPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaitingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
