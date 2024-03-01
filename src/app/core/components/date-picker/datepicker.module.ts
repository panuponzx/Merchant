import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { thBeLocale } from 'ngx-bootstrap/locale';
defineLocale('th', thBeLocale);

import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { DatePickerReadonlyDirective } from './date-picker-readonly.directive';

@NgModule({
  declarations: [
    DatePickerComponent,
    DatePickerRangeComponent,
    DatePickerReadonlyDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    DatePickerComponent,
    DatePickerRangeComponent,
  ]
})
export class DatePickerComponentModule {

  static forRoot() {
     return {
         ngModule: DatePickerComponentModule,
         providers: [],
     };
  }

}
