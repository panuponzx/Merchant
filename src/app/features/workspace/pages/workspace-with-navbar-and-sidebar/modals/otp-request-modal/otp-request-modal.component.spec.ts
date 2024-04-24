import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpRequestModalComponent } from './otp-request-modal.component';

describe('OtpRequestModalComponent', () => {
  let component: OtpRequestModalComponent;
  let fixture: ComponentFixture<OtpRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpRequestModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
