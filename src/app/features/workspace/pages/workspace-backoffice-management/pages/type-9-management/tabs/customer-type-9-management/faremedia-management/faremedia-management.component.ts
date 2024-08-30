import { Component, Input } from '@angular/core';

@Component({
  selector: 'faremedia-management-component',
  templateUrl: './faremedia-management.component.html',
  styleUrl: './faremedia-management.component.scss'
})
export class FaremediaManagementComponent {
  @Input() public customerId: string = "";
}
