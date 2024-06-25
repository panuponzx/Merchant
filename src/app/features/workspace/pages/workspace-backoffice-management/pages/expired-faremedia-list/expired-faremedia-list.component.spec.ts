import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredFaremediaListComponent } from './expired-faremedia-list.component';

describe('ExpiredFaremediaListComponent', () => {
  let component: ExpiredFaremediaListComponent;
  let fixture: ComponentFixture<ExpiredFaremediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpiredFaremediaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpiredFaremediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
