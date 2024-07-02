import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IdCardDirective } from './id-card.directive';
import { AutofocusDirective } from './autofocus.directive';


@NgModule({
  declarations: [
    IdCardDirective,
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    IdCardDirective,
    AutofocusDirective
  ]
})
export class DirectivesModule {}

