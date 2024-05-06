import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {
  public form: FormGroup;

  public CalculatedVariables = [
    {
      label: 'คูณ',
      id: '*'
    },
    {
      label: 'บวก',
      id: '+'
    }
  ];

  public CarType = [
    { name: "เลือกทั้งหมด" },
    { name: "ประเภท 1 (รถ 4 ล้อ)" },
    { name: "ประเภท 2 (รถ 6 ล้อ)" },
    { name: "ประเภท 3 (รถ 8 ล้อ)" },
    { name: "ประเภท 4 (รถ 10 ล้อ)" }
  ];

  public UserType = [
    { name: 'บุคคลธรรมดา'},
    { name: 'ชาวต่างชาติ'},
    { name: 'นิติบุคคล / องค์กร'},
    
  ];

  public route = [
    { name: 'เลือกทั้งหมด'},
    { name: 'ชื่อสายทางที่ 1'},
    { name: 'ชื่อสายทางที่ 2'},
    { name: 'ชื่อสายทางที่ 3'},
    { name: 'ชื่อสายทางที่ 4'},
    { name: 'ชื่อสายทางที่ 5'},
    { name: 'ชื่อสายทางที่ 6'},
    { name: 'ชื่อสายทางที่ 7'},
    
  ];

  public expressBuilding = [
    { name: 'เลือกทั้งหมด'},
    { name: 'ชื่อสายทางที่ 1'},
    { name: 'ชื่อสายทางที่ 2'},
    { name: 'ชื่อสายทางที่ 3'},
    { name: 'ชื่อสายทางที่ 4'},
    { name: 'ชื่อสายทางที่ 5'},
    { name: 'ชื่อสายทางที่ 6'},
    { name: 'ชื่อสายทางที่ 7'},
  ]
selectCarType: any;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      startdate: [null, Validators.required],
      enddate: [null, Validators.required],
      isEtaxActive: [null],
      lastName: [''],
      firstName: [''],
      publicAndSave: [''],
    });
  }

  ngOnInit(): void {
  }
}
