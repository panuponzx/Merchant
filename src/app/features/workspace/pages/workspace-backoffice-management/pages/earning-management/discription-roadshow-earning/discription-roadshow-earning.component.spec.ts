import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscriptionRoadshowEarningComponent } from './discription-roadshow-earning.component';

describe('DiscriptionRoadshowEarningComponent', () => {
  let component: DiscriptionRoadshowEarningComponent;
  let fixture: ComponentFixture<DiscriptionRoadshowEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscriptionRoadshowEarningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscriptionRoadshowEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
