import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTotalPage'
})
export class GetTotalPagePipe implements PipeTransform {

  transform(collectionSize: number, limitRow: number): number {
    return Math.ceil(collectionSize / limitRow);
  }

}
