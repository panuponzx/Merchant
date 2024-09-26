import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoadshowEarningComponent } from './add-roadshow-earning.component';

describe('AddRoadshowEarningComponent', () => {
  let component: AddRoadshowEarningComponent;
  let fixture: ComponentFixture<AddRoadshowEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoadshowEarningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRoadshowEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
