import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSelectionRemarkModalComponent } from './confirm-selection-remark-modal.component';

describe('ConfirmSelectionRemarkModalComponent', () => {
  let component: ConfirmSelectionRemarkModalComponent;
  let fixture: ComponentFixture<ConfirmSelectionRemarkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmSelectionRemarkModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmSelectionRemarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
