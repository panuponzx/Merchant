import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteOffBadDebtComponent } from './write-off-bad-debt.component';

describe('WriteOffBadDebtComponent', () => {
  let component: WriteOffBadDebtComponent;
  let fixture: ComponentFixture<WriteOffBadDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WriteOffBadDebtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WriteOffBadDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
