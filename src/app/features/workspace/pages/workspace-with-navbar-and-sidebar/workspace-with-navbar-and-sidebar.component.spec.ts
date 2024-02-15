import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceWithNavbarAndSidebarComponent } from './workspace-with-navbar-and-sidebar.component';

describe('WorkspaceWithNavbarAndSidebarComponent', () => {
  let component: WorkspaceWithNavbarAndSidebarComponent;
  let fixture: ComponentFixture<WorkspaceWithNavbarAndSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceWithNavbarAndSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceWithNavbarAndSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
