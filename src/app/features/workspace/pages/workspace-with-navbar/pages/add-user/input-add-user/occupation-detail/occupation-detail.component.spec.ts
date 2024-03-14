import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationDetailComponent } from './occupation-detail.component';

describe('OccupationDetailComponent', () => {
  let component: OccupationDetailComponent;
  let fixture: ComponentFixture<OccupationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OccupationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OccupationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
