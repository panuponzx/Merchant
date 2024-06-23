import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelObuModalComponent } from './cancel-obu-modal.component';

describe('CancelObuModalComponent', () => {
  let component: CancelObuModalComponent;
  let fixture: ComponentFixture<CancelObuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelObuModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelObuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
