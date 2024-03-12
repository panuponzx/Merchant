import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputJuristicAttachDocumentComponent } from './input-juristic-attach-document.component';

describe('InputJuristicAttachDocumentComponent', () => {
  let component: InputJuristicAttachDocumentComponent;
  let fixture: ComponentFixture<InputJuristicAttachDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputJuristicAttachDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputJuristicAttachDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
