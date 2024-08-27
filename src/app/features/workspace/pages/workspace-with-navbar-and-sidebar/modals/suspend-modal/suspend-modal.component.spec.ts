import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendModalComponent } from './suspend-modal.component';

describe('SuspendModalComponent', () => {
  let component: SuspendModalComponent;
  let fixture: ComponentFixture<SuspendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuspendModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuspendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
