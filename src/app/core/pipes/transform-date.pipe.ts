import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import localeTh from 'dayjs/locale/th';
import localeEn from 'dayjs/locale/en';
import buddhistEra from 'dayjs/plugin/buddhistEra';

@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  constructor(){
    dayjs.extend(buddhistEra);
  }

  transform(date: string | Date | undefined | null, format: string | undefined | null, locale?: 'en' | 'th'): Date | string | null {
    dayjs.locale(locale === 'th' ? localeTh : localeEn);
    if (date) {
      if (format) {
        const transform = dayjs(date).format(format);
        return transform;
      }
      return dayjs(date).format();
    }
    return null;
  }

}
