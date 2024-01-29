import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareComponentModule } from './components/share-component.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShareComponentModule
  ],
  exports: [
    ShareComponentModule
  ],
  providers: []
})
export class ShareModule { }
