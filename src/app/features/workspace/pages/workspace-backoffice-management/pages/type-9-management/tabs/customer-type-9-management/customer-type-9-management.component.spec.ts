import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerType9ManagementComponent } from './customer-type-9-management.component';

describe('CustomerType9ManagementComponent', () => {
  let component: CustomerType9ManagementComponent;
  let fixture: ComponentFixture<CustomerType9ManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerType9ManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerType9ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
