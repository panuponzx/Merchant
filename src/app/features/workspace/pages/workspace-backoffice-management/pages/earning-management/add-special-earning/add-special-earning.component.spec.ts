import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialEarningComponent } from './add-special-earning.component';

describe('AddSpecialEarningComponent', () => {
  let component: AddSpecialEarningComponent;
  let fixture: ComponentFixture<AddSpecialEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSpecialEarningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSpecialEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
