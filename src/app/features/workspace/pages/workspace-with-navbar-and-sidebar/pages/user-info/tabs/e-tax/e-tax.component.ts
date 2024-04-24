import { Component, Input } from '@angular/core';

@Component({
  selector: 'e-tax',
  templateUrl: './e-tax.component.html',
  styleUrl: './e-tax.component.scss'
})
export class ETaxComponent {



  @Input() public customerId: string | null = null;
  @Input() public customerTypeId: string | null = null;


  public status: number = 1;
  public Usagestatus = [
    {
      label: 'ปิดการใช้งาน',
      id: 1
    },
    {
      label: 'เปิดการใช้งาน',
      id: 2
    }
  ];


  public level: number = 1;
  public Settinglevel = [
    {
      label: 'การตั้งค่าขั้นพื้นฐาน',
      id: 1
    },
    {
      label: 'การตั้งค่าขั้นสูง',
      id: 2
    }
  ];

}
