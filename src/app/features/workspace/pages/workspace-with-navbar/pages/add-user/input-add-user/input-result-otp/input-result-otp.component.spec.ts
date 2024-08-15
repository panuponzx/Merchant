import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputResultOtpComponent } from './input-result-otp.component';

describe('InputResultOtpComponent', () => {
  let component: InputResultOtpComponent;
  let fixture: ComponentFixture<InputResultOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputResultOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputResultOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
