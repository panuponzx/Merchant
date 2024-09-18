import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerRoadshowCampaignComponent } from './add-customer-roadshow-campaign.component';

describe('AddCustomerRoadshowCampaignComponent', () => {
  let component: AddCustomerRoadshowCampaignComponent;
  let fixture: ComponentFixture<AddCustomerRoadshowCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCustomerRoadshowCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCustomerRoadshowCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
