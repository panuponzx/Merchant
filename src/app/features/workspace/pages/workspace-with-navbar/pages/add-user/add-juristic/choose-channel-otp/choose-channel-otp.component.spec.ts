import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseChannelOtpComponent } from './choose-channel-otp.component';

describe('ChooseChannelOtpComponent', () => {
  let component: ChooseChannelOtpComponent;
  let fixture: ComponentFixture<ChooseChannelOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseChannelOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseChannelOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
