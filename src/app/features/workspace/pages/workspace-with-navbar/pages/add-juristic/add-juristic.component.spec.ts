import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJuristicComponent } from './add-juristic.component';

describe('AddJuristicComponent', () => {
  let component: AddJuristicComponent;
  let fixture: ComponentFixture<AddJuristicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJuristicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJuristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
