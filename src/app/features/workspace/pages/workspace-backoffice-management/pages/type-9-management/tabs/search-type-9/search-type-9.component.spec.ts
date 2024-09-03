import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchType9Component } from './search-type-9.component';

describe('SearchType9Component', () => {
  let component: SearchType9Component;
  let fixture: ComponentFixture<SearchType9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchType9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchType9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
