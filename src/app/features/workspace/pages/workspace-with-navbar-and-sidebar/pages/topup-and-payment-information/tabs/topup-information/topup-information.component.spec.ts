import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupInformationComponent } from './topup-information.component';

describe('TopupInformationComponent', () => {
  let component: TopupInformationComponent;
  let fixture: ComponentFixture<TopupInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopupInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopupInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
