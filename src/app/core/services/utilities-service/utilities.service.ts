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

}
