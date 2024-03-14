import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceWithNavbarComponent } from './workspace-with-navbar.component';

describe('WorkspaceWithNavbarComponent', () => {
  let component: WorkspaceWithNavbarComponent;
  let fixture: ComponentFixture<WorkspaceWithNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceWithNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceWithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
