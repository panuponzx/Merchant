import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomColumnModel, RowActionEventModel } from '../../../../../../core/interfaces';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
onChangePage($event: number) {
throw new Error('Method not implemented.');
}
onAction($event: RowActionEventModel) {
throw new Error('Method not implemented.');
}

  searchClicked: boolean = false;
  searchValue: string = '';

  public activeTab: 'active' | 'unactive' | undefined;

  public limitRow: number = 10;
  public pages: number = 1;
  public collectionSize: number = 0;
  public activeUsedColumns: CustomColumnModel[] = [
    { id: 'firstName', name: 'FirstName', label: 'ชื่อ', prop: 'firstName', sortable: false, resizeable: true, width: 120, minWidth: 120, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'fullName', name: 'FullName', label: 'นามสกุล', prop: 'fullName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'citizenId', name: 'CitizenId', label: 'หมายเลขบัตรประชาชน', prop: 'citizenId', sortable: false, resizeable: true, width: 180, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'customerTypeName', name: 'CustomerTypeName', label: 'ประเภท', prop: 'customerTypeName', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'birthdate', name: 'Birthdate', label: 'วันเกิด', prop: 'birthdate', sortable: false, resizeable: true, width: 150, minWidth: 150, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'mobilePhone', name: 'mobilePhone', label: 'เบอร์ติดต่อ', prop: 'mobilePhone', sortable: false, resizeable: true, width: 170, minWidth: 170, headerClass: 'text-break text-center', cellClass: 'text-break text-center', type: 'text' },
    { id: 'edit', name: 'Edit', label: 'แก้ไข', prop: '', sortable: false, resizeable: true, width: 100, minWidth: 100, headerClass: 'text-break text-center', cellClass: 'text-center', type: 'action', actionIcon: { iconName: 'list', size: 'l', color: '#2255CE' } }
  ];
  public allRows = [
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },
   { firstName: "กัญญาพร", fullName: "ทดสอบ", citizenId: "1 1234 12345 12 1", customerTypeName: "บุคคลทั่วไป", birthdate: "1 มกราคม 2522", mobilePhone: "088 xxx 8732" },

  ];
  public rows: any[] = []

isLoading = false;


  constructor(private formBuilder: FormBuilder) { }

  onSearch() {
    if (!this.searchClicked) {
      this.searchClicked = true
    }
    const keyword = `${this.searchValue}`.toUpperCase()
    this.rows = this.allRows.filter(x => `${x.firstName} `.toUpperCase().includes(keyword))
  }

  togglenotsearch() {
    this.searchClicked = false;
    this.rows = [];
  }

}
