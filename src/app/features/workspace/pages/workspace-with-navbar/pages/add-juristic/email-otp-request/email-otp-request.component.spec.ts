import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOtpRequestComponent } from './email-otp-request.component';

describe('EmailOtpRequestComponent', () => {
  let component: EmailOtpRequestComponent;
  let fixture: ComponentFixture<EmailOtpRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailOtpRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailOtpRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
