import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCurrentAddressComponent } from './input-current-address.component';

describe('InputCurrentAddressComponent', () => {
  let component: InputCurrentAddressComponent;
  let fixture: ComponentFixture<InputCurrentAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputCurrentAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCurrentAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
