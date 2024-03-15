import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOptionSuperAdminComponent } from './menu-option-super-admin.component';

describe('MenuOptionSuperAdminComponent', () => {
  let component: MenuOptionSuperAdminComponent;
  let fixture: ComponentFixture<MenuOptionSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuOptionSuperAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuOptionSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
