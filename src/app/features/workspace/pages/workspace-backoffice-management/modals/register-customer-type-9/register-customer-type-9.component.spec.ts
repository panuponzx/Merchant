import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCustomerType9Component } from './register-customer-type-9.component';

describe('RegisterCustomerType9Component', () => {
  let component: RegisterCustomerType9Component;
  let fixture: ComponentFixture<RegisterCustomerType9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterCustomerType9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCustomerType9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
