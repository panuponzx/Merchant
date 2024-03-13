import { Component } from '@angular/core';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrl: './add-wallet.component.scss'
})
export class AddWalletComponent {

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
  ]
}
