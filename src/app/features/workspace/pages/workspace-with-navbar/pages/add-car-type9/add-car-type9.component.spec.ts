import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarType9Component } from './add-car-type9.component';

describe('AddCarType9Component', () => {
  let component: AddCarType9Component;
  let fixture: ComponentFixture<AddCarType9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCarType9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCarType9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
