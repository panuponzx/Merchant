import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'walletStatus'
})
export class WalletStatusPipe implements PipeTransform {

  private walletStatus: any[] = [
    { walletStatus: 1, name: 'Active - ใช้งาน' },
    { walletStatus: 2, name: 'Suspend - อายัดชั่วคราว' },
    { walletStatus: 3, name: 'Blacklist - บัญชีดำ' },
    { walletStatus: 4, name: 'Deactivate - ปิดใช้งาน' }
  ];

  transform(value: number): string {
    const foundStatus = this.walletStatus.find((status: any) => status.walletStatus === value);
    return foundStatus ? foundStatus.name : '';
  }

}
