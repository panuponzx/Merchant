import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemExchangeComponent } from './redeem-exchange.component';

describe('RedeemExchangeComponent', () => {
  let component: RedeemExchangeComponent;
  let fixture: ComponentFixture<RedeemExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedeemExchangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedeemExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
