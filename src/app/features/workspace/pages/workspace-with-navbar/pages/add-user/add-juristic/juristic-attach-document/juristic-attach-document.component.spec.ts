import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuristicAttachDocumentComponent } from './juristic-attach-document.component';

describe('JuristicAttachDocumentComponent', () => {
  let component: JuristicAttachDocumentComponent;
  let fixture: ComponentFixture<JuristicAttachDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuristicAttachDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuristicAttachDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
