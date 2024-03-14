import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SvgComponent } from './svg/svg.component';
import { DatePickerComponentModule } from './date-picker/datepicker.module';

@NgModule({
  declarations: [
    SvgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerComponentModule
  ],
  exports: [
    SvgComponent,
    DatePickerComponentModule
  ]
})
export class ShareComponentModule { }
