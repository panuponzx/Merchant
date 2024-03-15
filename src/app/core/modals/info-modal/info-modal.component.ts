import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {

  @Input() title: string = '';
  @Input() message: string = '';
  
}
