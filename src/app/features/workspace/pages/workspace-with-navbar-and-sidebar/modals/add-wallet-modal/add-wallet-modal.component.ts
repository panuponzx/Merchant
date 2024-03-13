import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-wallet-modal',
  templateUrl: './add-wallet-modal.component.html',
  styleUrl: './add-wallet-modal.component.scss'
})
export class AddWalletModalComponent {

  public walletType: number | undefined;
  public walletTypeList = [
    { 
      lable: 'Prepaid (Top-up)',
      id: 1
    },
    { 
      lable: 'Postpaid (Billing)',
      id: 2
    },
    { 
      lable: 'Direct credit card',
      id: 3
    }
  ];

  constructor(public ngbActiveModal: NgbActiveModal) {

  }

  onClose() {
    this.ngbActiveModal.close(true);
  }

}
