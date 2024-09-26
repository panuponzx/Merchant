import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBasicEarningComponent } from './add-basic-earning.component';

describe('AddBasicEarningComponent', () => {
  let component: AddBasicEarningComponent;
  let fixture: ComponentFixture<AddBasicEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBasicEarningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBasicEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
