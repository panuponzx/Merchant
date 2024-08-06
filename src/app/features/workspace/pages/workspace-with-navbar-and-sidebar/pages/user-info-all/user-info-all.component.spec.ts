import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoAllComponent } from './user-info-all.component';

describe('UserInfoAllComponent', () => {
  let component: UserInfoAllComponent;
  let fixture: ComponentFixture<UserInfoAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInfoAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInfoAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
