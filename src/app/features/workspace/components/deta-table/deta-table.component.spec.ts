import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaTableComponent } from './deta-table.component';

describe('DetaTableComponent', () => {
  let component: DetaTableComponent;
  let fixture: ComponentFixture<DetaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
