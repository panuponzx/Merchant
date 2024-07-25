import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSuspensionModalComponent } from './transaction-suspension-modal.component';

describe('TransactionSuspensionModalComponent', () => {
  let component: TransactionSuspensionModalComponent;
  let fixture: ComponentFixture<TransactionSuspensionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionSuspensionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionSuspensionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
