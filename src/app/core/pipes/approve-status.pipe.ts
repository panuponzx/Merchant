import { Pipe, PipeTransform } from '@angular/core';
import { PendingRequestStatus } from 'src/app/core/types/onboarding-status';

@Pipe({
  name: 'approveStatus'
})
export class ApproveStatusPipe implements PipeTransform {
  transform(status: PendingRequestStatus): string {
    switch (status) {
      case 'WAITING': {
        return 'รอการอนุมัติ'
      }
      case 'APPROVED': {
        return 'อนุมัติ'
      }
      case 'REJECTED': {
        return 'ปฏิเสธ'
      }
      default: {
        return '-';
      }
    }
  }

}
