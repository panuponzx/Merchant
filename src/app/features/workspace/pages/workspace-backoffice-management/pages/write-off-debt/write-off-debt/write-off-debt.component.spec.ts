import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteOffDebtComponent } from './write-off-debt.component';

describe('WriteOffDebtComponent', () => {
  let component: WriteOffDebtComponent;
  let fixture: ComponentFixture<WriteOffDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WriteOffDebtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WriteOffDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
