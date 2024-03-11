import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputJuristicInfoComponent } from './input-juristic-info.component';

describe('InputJuristicInfoComponent', () => {
  let component: InputJuristicInfoComponent;
  let fixture: ComponentFixture<InputJuristicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputJuristicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputJuristicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
