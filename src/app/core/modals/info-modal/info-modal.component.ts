import { Component, Input } from '@angular/core';
import { ModalDialogService } from '../../services/modal-dialog/modal-dialog.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {

  constructor(private modalDialogService: ModalDialogService) {
  }
  
  @Input() icon: string = '';
  @Input() color: string = '';
  @Input() title: string = '';
  @Input() message: string = '';
  
  onClose() {
    this.modalDialogService.hideInfo();
  }

}
