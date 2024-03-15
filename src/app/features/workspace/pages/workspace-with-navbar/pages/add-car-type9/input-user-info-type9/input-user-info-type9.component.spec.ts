import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUserInfoType9Component } from './input-user-info-type9.component';

describe('InputUserInfoType9Component', () => {
  let component: InputUserInfoType9Component;
  let fixture: ComponentFixture<InputUserInfoType9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputUserInfoType9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputUserInfoType9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
