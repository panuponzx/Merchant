import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIdentityTypeComponent } from './input-identity-type.component';

describe('InputIdentityTypeComponent', () => {
  let component: InputIdentityTypeComponent;
  let fixture: ComponentFixture<InputIdentityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputIdentityTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputIdentityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
