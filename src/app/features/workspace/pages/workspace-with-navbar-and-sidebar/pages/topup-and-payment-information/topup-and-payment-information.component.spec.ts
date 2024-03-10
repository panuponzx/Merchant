import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupAndPaymentInformationComponent } from './topup-and-payment-information.component';

describe('TopupAndPaymentInformationComponent', () => {
  let component: TopupAndPaymentInformationComponent;
  let fixture: ComponentFixture<TopupAndPaymentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopupAndPaymentInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopupAndPaymentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
