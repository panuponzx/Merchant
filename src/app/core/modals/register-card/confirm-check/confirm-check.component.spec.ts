import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCheckComponent } from './confirm-check.component';

describe('ConfirmCheckComponent', () => {
  let component: ConfirmCheckComponent;
  let fixture: ComponentFixture<ConfirmCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
