import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSuspensionManagementComponent } from './transaction-suspension-management.component';

describe('TransactionSuspensionManagementComponent', () => {
  let component: TransactionSuspensionManagementComponent;
  let fixture: ComponentFixture<TransactionSuspensionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionSuspensionManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionSuspensionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
