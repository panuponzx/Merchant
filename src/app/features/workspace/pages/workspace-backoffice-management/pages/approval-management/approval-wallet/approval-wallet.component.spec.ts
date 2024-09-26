import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalWalletComponent } from './approval-wallet.component';

describe('ApprovalWalletComponent', () => {
  let component: ApprovalWalletComponent;
  let fixture: ComponentFixture<ApprovalWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalWalletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
