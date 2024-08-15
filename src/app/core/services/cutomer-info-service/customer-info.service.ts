// customer-info.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomerInfoModel } from '../../interfaces/curomerInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {
  private customerInfoSubject = new BehaviorSubject<CustomerInfoModel | null>(null);
  customerInfo$ = this.customerInfoSubject.asObservable();

  setCustomerInfo(info: CustomerInfoModel) {
    this.customerInfoSubject.next(info);
  }

  getCustomerInfo(): CustomerInfoModel | null {
    return this.customerInfoSubject.value;
  }
}
