import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCancelPassageInfoComponent } from './confirm-cancel-passage-info.component';

describe('ConfirmCancelPassageInfoComponent', () => {
  let component: ConfirmCancelPassageInfoComponent;
  let fixture: ComponentFixture<ConfirmCancelPassageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmCancelPassageInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmCancelPassageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
