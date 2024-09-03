import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletType9ManagementComponent } from './wallet-type-9-management.component';

describe('WalletType9ManagementComponent', () => {
  let component: WalletType9ManagementComponent;
  let fixture: ComponentFixture<WalletType9ManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletType9ManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletType9ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
