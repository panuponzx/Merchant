import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEtaxAddressComponent } from './input-etax-address.component';

describe('InputEtaxAddressComponent', () => {
  let component: InputEtaxAddressComponent;
  let fixture: ComponentFixture<InputEtaxAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputEtaxAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputEtaxAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
