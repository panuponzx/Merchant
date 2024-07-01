import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionTransactionComponent } from './exception-transaction.component';

describe('ExceptionTransactionComponent', () => {
  let component: ExceptionTransactionComponent;
  let fixture: ComponentFixture<ExceptionTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExceptionTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExceptionTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
