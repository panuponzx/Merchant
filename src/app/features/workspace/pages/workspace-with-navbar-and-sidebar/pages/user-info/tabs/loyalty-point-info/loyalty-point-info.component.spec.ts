import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyPointInfoComponent } from './loyalty-point-info.component';

describe('LoyaltyPointInfoComponent', () => {
  let component: LoyaltyPointInfoComponent;
  let fixture: ComponentFixture<LoyaltyPointInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoyaltyPointInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoyaltyPointInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
