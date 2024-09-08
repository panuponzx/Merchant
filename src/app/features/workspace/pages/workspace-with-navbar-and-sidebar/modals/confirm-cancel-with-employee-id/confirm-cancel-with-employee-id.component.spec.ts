import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCancelWithEmployeeIdComponent } from './confirm-cancel-with-employee-id.component';

describe('ConfirmCancelWithEmployeeIdComponent', () => {
  let component: ConfirmCancelWithEmployeeIdComponent;
  let fixture: ComponentFixture<ConfirmCancelWithEmployeeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmCancelWithEmployeeIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmCancelWithEmployeeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
