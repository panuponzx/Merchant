import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Pipe({ name: 'buddhistDate' })
export class BuddhistDate implements PipeTransform {
  // adding a default value in case you don't want to pass the format then 'yyyy-MM-dd' will be used
  transform(date: Date | string | undefined, toFormat: string = 'yyyy-MM-dd', 
    locale: string = 'en-US'): string {
    if (date === undefined || toFormat === null) {
      return '';
    }
    // console.log(moment(date, format).locale('th'));
    
    // date = moment(date, format).utc(true).add(543, 'years');
    console.log();
    
    date = moment(new Date(date)).utc(true).add(543, 'years').toDate();

    let datePipe = new DatePipe(locale).transform(date, toFormat);
    
    return datePipe? datePipe : '';
    // return moment(date, format).utc(true).add(543, 'years').format(toFormat);
  }
}