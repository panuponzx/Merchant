import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFaremediaComponent } from './activity-faremedia.component';

describe('ActivityFaremediaComponent', () => {
  let component: ActivityFaremediaComponent;
  let fixture: ComponentFixture<ActivityFaremediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityFaremediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityFaremediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
