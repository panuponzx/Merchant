import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageInfoComponent } from './passage-info.component';

describe('PassageInfoComponent', () => {
  let component: PassageInfoComponent;
  let fixture: ComponentFixture<PassageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassageInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
