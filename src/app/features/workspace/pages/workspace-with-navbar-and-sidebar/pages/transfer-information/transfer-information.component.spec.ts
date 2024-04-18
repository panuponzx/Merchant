import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferInformationComponent } from './transfer-information.component';

describe('TransferInformationComponent', () => {
  let component: TransferInformationComponent;
  let fixture: ComponentFixture<TransferInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
