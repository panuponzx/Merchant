import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCarInfoType9Component } from './input-car-info-type9.component';

describe('InputCarInfoType9Component', () => {
  let component: InputCarInfoType9Component;
  let fixture: ComponentFixture<InputCarInfoType9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputCarInfoType9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCarInfoType9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
