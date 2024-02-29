import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
  searchClicked: boolean = false;
  searchValue: string = '';

  public rows: any[] = [];

  
  constructor(private formBuilder: FormBuilder) {}
  
  onSearch() {
    if (this.searchValue) {
      // Api Load Customer
      this.searchClicked = !this.searchClicked;
      this.rows = [
        { ชื่อ: 'John', นามสกุล: 'Doe', หมายเลขบัตรประชาชน: '1234567890', ประเภท: 'A', วันเกิด: '1990-01-01', เบอร์ติดต่อ: '123-456-7890' },
        { ชื่อ: 'Jane', นามสกุล: 'Smith', หมายเลขบัตรประชาชน: '0987654321', ประเภท: 'B', วันเกิด: '1988-05-15', เบอร์ติดต่อ: '987-654-3210' },
        { ชื่อ: 'Bob', นามสกุล: 'Johnson', หมายเลขบัตรประชาชน: '2468135790', ประเภท: 'C', วันเกิด: '1975-12-25', เบอร์ติดต่อ: '246-813-5790' },
        // เพิ่มข้อมูลเพิ่มเติมตามต้องการ
      ];
    }

    
  }

  togglenotsearch() {
    this.searchClicked = false;
    this.rows = [];
  }

  
}
