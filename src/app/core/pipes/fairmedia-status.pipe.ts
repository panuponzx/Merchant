import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fairmediaStatus'
})
export class FairmediaStatusPipe implements PipeTransform {

  transform(status: number): string {
    switch (status) {
      case 100: {
        return 'บัตรใหม่'
      }
      case 200: {
        return 'บัตรพร้อมใช้งาน'
      }
      case 300: {
        return 'บัตรไม่พร้อมใช้งาน'
      }
      case 301: {
        return 'ค่าธรรมเนียมรักษาบัญชีฯ'
      }
      case 302: {
        return 'อายัดชั่วคราวโดยผู้ใช้งาน'
      }
      case 303: {
        return 'อายัดชั่วคราวโดยเจ้าหน้าที่'
      }
      case 401: {
        return 'บัตรหาย'
      }
      case 402: {
        return 'บัตรหาย'
      }
      case 403: {
        return 'คืนบัตร'
      }
      case 404: {
        return 'อายัดถาวร'
      }
      default: {
        return '-';
      }
    }
  }

}
