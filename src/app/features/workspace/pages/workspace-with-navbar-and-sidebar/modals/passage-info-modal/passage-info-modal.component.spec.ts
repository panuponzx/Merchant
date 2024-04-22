import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageInfoModalComponent } from './passage-info-modal.component';

describe('PassageInfoModalComponent', () => {
  let component: PassageInfoModalComponent;
  let fixture: ComponentFixture<PassageInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassageInfoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassageInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
