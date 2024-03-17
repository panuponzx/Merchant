import { Pipe, PipeTransform } from '@angular/core';
import { CustomerModel } from '../interfaces';
import { IconModel } from '../types';

interface CustomerValueModel {
  customer_type_id: string,
  name: string,
  icon: IconModel,
  colorCode: string
}

@Pipe({
  name: 'customerType'
})
export class CustomerTypePipe implements PipeTransform {

  private customerValue: CustomerValueModel[] = [
    { customer_type_id: '1', name: 'ผู้ใช้งาน', icon: 'customer-type-1', colorCode: '#2255CE' },
    { customer_type_id: '2', name: 'ชาวต่างชาติ', icon: 'customer-type-2', colorCode: '#FFB800' },
    { customer_type_id: '3', name: 'นิติบุคคล', icon: 'customer-type-3', colorCode: '#208BC3' }
  ];

  transform(customer: CustomerModel | undefined, type: 'color-code' | 'name' | 'icon' | 'id'): string | IconModel | null {
    if (customer) {
      // debugger;
      const customerType = this.getCustomerType(customer);
      if (customerType) {
        const customerValue = this.getCustomerValue(customerType);
        if (customerValue) {
          switch(type) {
            case 'color-code': {
              return customerValue.colorCode;
            }
            case 'icon': {
              return customerValue.icon;
            }
            case 'name': {
              return customerValue.name;
            }
            case 'id': {
              return customerValue.customer_type_id;
            }
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    return null;
  }

  getCustomerType(customer: CustomerModel): string | null {
    if (customer.customerTypeId === 1) {
        if (customer.citizenDocId === 1 || customer.citizenDocId === 2) {
          return '1';
        } else if (customer.citizenDocId === 3) {
          return '2';
        } else {
          return '1'
        }
    } else if (customer && customer.customerTypeId === 2) {
        if (customer.citizenDocId === 4) {
          return '3';
        } else {
          return null;
        }
    } else {
      return null;
    }
  }

  getCustomerValue(customerType: string): CustomerValueModel | null {
    const customerValue = this.customerValue.find(x => x.customer_type_id === customerType);
    if (customerValue) {
      return customerValue;
    } else {
      return null;
    }
  }



}
