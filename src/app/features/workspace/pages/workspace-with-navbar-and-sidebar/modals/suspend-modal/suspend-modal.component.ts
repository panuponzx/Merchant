import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarInfoModel, CustomerModel } from 'src/app/core/interfaces';

@Component({
  selector: 'app-suspend-modal',
  templateUrl: './suspend-modal.component.html',
  styleUrl: './suspend-modal.component.scss'
})
export class SuspendModalComponent {
  fourthForm: FormGroup;
  @Input() public customer: CustomerModel | undefined;
  @Input() public carInfo: CarInfoModel | any = {} as CarInfoModel;
  public step: number = 1;
  currentDate: any;
  currentNumber: number;

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private ngbModal: NgbModal
  ) {
    this.currentNumber = this.generateCurrentNumber();
    this.currentDate = new Date().toISOString().split('T')[0];
    this.fourthForm = this.formBuilder.group({
      isCash: new FormControl(false),
    });
  }

  request: any = {};

  reasonOptions = [
    { value: 'บัตรที่สูญหายหรือถูกทำลาย', label: 'บัตรที่สูญหายหรือถูกทำลาย' },
    { value: 'บัตรหมดอายุ', label: 'บัตรหมดอายุ' },
    { value: 'บัตรถูกขโมย', label: 'บัตรถูกขโมย' }
  ];

  requestTypeOptions = [
    { value: 'อายัด', label: 'อายัด' },
    { value: 'เปลี่ยนบัตร', label: 'เปลี่ยนบัตร' },
    { value: 'ยกเลิกบัตร', label: 'ยกเลิกบัตร' }
  ];

  inputFields = [
    { id: 'fullName', label: 'ชื่อ-สกุล', model: 'fullName' },
    { id: 'position', label: 'ตำแหน่ง', model: 'position' },
    { id: 'relationship', label: 'ความสัมพันธ์', model: 'relationship' },
    { id: 'idNumber', label: 'เลขบัตรประชาชน', model: 'idNumber' }
  ];

  generateCurrentNumber(): number {
    return Math.floor(Math.random() * 1000);
  }

  onClose() {
    this.ngbActiveModal.close();
  }

  onSubmit() {
    console.log('Form submitted', this.request);
  }
}