import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRedeemComponent } from './manage-redeem.component';

describe('ManageRedeemComponent', () => {
  let component: ManageRedeemComponent;
  let fixture: ComponentFixture<ManageRedeemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRedeemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
