import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtaxAddressComponent } from './etax-address.component';

describe('EtaxAddressComponent', () => {
  let component: EtaxAddressComponent;
  let fixture: ComponentFixture<EtaxAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtaxAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtaxAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
