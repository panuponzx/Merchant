import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectPendingRequestModalComponent } from './reject-pending-request-modal.component';

describe('RejectPendingRequestModalComponent', () => {
  let component: RejectPendingRequestModalComponent;
  let fixture: ComponentFixture<RejectPendingRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectPendingRequestModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectPendingRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
