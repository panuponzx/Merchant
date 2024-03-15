import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceBackofficeManagementComponent } from './workspace-backoffice-management.component';

describe('WorkspaceBackofficeManagementComponent', () => {
  let component: WorkspaceBackofficeManagementComponent;
  let fixture: ComponentFixture<WorkspaceBackofficeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceBackofficeManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceBackofficeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
