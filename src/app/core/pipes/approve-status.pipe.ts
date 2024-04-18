import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'approveStatus'
})
export class ApproveStatusPipe implements PipeTransform {

  transform(status: number): string {
    switch (status) {
      case 0: {
        return 'รอการอนุมัติ'
      }
      case 1: {
        return 'อนุมัติ'
      }
      case 2: {
        return 'ปฏิเสธ'
      }
      default: {
        return '-';
      }
    }
  }

}
