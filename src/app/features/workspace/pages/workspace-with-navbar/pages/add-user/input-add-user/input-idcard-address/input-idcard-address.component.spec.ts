import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIdcardAddressComponent } from './input-idcard-address.component';

describe('InputIdcardAddressComponent', () => {
  let component: InputIdcardAddressComponent;
  let fixture: ComponentFixture<InputIdcardAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputIdcardAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputIdcardAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
