import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ETaxComponent } from './e-tax.component';

describe('ETaxComponent', () => {
  let component: ETaxComponent;
  let fixture: ComponentFixture<ETaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ETaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ETaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
