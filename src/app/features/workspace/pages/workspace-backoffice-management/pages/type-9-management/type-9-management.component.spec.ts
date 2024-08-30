import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Type9ManagementComponent } from './type-9-management.component';

describe('Type9ManagementComponent', () => {
  let component: Type9ManagementComponent;
  let fixture: ComponentFixture<Type9ManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Type9ManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Type9ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
