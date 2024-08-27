import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingModalComponent } from './borrowing-modal.component';

describe('BorrowingModalComponent', () => {
  let component: BorrowingModalComponent;
  let fixture: ComponentFixture<BorrowingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
