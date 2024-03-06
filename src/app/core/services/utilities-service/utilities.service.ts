import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() {
  }

  encryptData(value: any, key: string): string | undefined {
    if(value) {
      const encrypted = AES.encrypt(
        JSON.stringify(value),
        key
      );
      return encrypted.toString();
    }
    return undefined;
  }

  decryptData(value: any, key: string): any | undefined {
    if(value) {
      const encrypted = AES.decrypt(
        value,
        key
      );
      return encrypted.toString(enc.Utf8)
    }
    return undefined;
  }

  formatIdCard(value: string): string {
    const regex = /^(\d{1,1})(\d{0,4})(\d{0,5})(\d{0,2})(\d{0,1})$/;
    const matches = value.match(regex);
    if (matches) {
      return matches.slice(1).filter(match => !!match).join(' ');
    } else {
      return value;
    }
  }

  isValidThaiCitizenId(id: string): boolean {
    if (id.length !== 13) return false;
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(id.charAt(i)) * (13 - i);
    }
    let checkDigit = (11 - (sum % 11)) % 10;
    return parseInt(id.charAt(12)) === checkDigit;
  }

}
