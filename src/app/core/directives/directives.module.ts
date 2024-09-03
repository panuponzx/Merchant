import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IdCardDirective } from './id-card.directive';
import { AutofocusDirective } from './autofocus.directive';
import { RestrictInputDirective } from './restrict-input.directive';
import { UppercaseDirective } from './uppercase.directive';


@NgModule({
  declarations: [
    IdCardDirective,
    AutofocusDirective,
    RestrictInputDirective,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    IdCardDirective,
    AutofocusDirective,
    RestrictInputDirective,
    UppercaseDirective
  ]
})
export class DirectivesModule {}

