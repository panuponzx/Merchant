import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuristicInfoComponent } from './juristic-info.component';

describe('JuristicInfoComponent', () => {
  let component: JuristicInfoComponent;
  let fixture: ComponentFixture<JuristicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuristicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuristicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
