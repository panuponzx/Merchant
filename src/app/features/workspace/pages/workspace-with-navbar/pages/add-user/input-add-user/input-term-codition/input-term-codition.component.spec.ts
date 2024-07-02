import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTermCoditionComponent } from './input-term-codition.component';

describe('InputTermCoditionComponent', () => {
  let component: InputTermCoditionComponent;
  let fixture: ComponentFixture<InputTermCoditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTermCoditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputTermCoditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
