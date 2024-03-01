import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareComponentModule } from './components/share-component.module';
import { PipesModule } from './pipes'

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ShareComponentModule,
    PipesModule
  ],
  exports: [
    ShareComponentModule,
    PipesModule
  ],
  providers: []
})
export class ShareModule { }
