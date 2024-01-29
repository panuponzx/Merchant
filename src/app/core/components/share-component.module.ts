import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SvgComponent } from './svg/svg.component';

@NgModule({
  declarations: [
    SvgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SvgComponent
  ]
})
export class ShareComponentModule { }
