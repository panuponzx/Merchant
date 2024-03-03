import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareComponentModule } from './components/share-component.module';
import { PipesModule } from './pipes';
import { DirectivesModule } from './directives';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ShareComponentModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    ShareComponentModule,
    PipesModule,
    DirectivesModule
  ],
  providers: []
})
export class ShareModule { }
