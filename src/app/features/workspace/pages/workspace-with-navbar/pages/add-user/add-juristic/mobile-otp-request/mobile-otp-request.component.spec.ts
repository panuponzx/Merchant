import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOtpRequestComponent } from './mobile-otp-request.component';

describe('MobileOtpRequestComponent', () => {
  let component: MobileOtpRequestComponent;
  let fixture: ComponentFixture<MobileOtpRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileOtpRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileOtpRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
