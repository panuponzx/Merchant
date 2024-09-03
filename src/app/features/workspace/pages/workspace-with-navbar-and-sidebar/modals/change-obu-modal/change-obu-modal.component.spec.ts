import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeObuModalComponent } from './change-obu-modal.component';

describe('ChangeObuModalComponent', () => {
  let component: ChangeObuModalComponent;
  let fixture: ComponentFixture<ChangeObuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeObuModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeObuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
