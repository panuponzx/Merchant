import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaremediaManagementComponent } from './faremedia-management.component';

describe('FaremediaManagementComponent', () => {
  let component: FaremediaManagementComponent;
  let fixture: ComponentFixture<FaremediaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaremediaManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaremediaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
