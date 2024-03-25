import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEarningComponent } from './manage-earning.component';

describe('ManageEarningComponent', () => {
  let component: ManageEarningComponent;
  let fixture: ComponentFixture<ManageEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageEarningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
