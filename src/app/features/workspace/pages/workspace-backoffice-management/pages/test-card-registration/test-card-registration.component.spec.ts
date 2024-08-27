import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCardRegistrationComponent } from './test-card-registration.component';

describe('TestCardRegistrationComponent', () => {
  let component: TestCardRegistrationComponent;
  let fixture: ComponentFixture<TestCardRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestCardRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCardRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
