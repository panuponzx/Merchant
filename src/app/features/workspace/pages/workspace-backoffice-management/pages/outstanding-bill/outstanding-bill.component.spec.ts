import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingBillComponent } from './outstanding-bill.component';

describe('OutstandingBillComponent', () => {
  let component: OutstandingBillComponent;
  let fixture: ComponentFixture<OutstandingBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutstandingBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutstandingBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
