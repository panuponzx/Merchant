import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeProductsComponent } from './exchange-products.component';

describe('ExchangeProductsComponent', () => {
  let component: ExchangeProductsComponent;
  let fixture: ComponentFixture<ExchangeProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExchangeProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
