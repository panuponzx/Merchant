import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingEarnCampaignComponent } from './setting-earn-campaign.component';

describe('SettingEarnCampaignComponent', () => {
  let component: SettingEarnCampaignComponent;
  let fixture: ComponentFixture<SettingEarnCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingEarnCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingEarnCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
