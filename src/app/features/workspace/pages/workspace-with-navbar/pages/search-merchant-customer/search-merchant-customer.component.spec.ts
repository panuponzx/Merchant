import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMerchantCustomerComponent } from './search-merchant-customer.component';

describe('SearchMerchantCustomerComponent', () => {
  let component: SearchMerchantCustomerComponent;
  let fixture: ComponentFixture<SearchMerchantCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMerchantCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchMerchantCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
