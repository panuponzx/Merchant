import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayInformationComponent } from './pay-information.component';

describe('PayInformationComponent', () => {
  let component: PayInformationComponent;
  let fixture: ComponentFixture<PayInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
