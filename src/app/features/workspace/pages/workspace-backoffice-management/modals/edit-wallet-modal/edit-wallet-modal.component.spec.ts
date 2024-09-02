import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWalletModalComponent } from './edit-wallet-modal.component';

describe('EditWalletModalComponent', () => {
  let component: EditWalletModalComponent;
  let fixture: ComponentFixture<EditWalletModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditWalletModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditWalletModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
