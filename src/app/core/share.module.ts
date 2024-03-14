import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareComponentModule } from './components/share-component.module';
import { PipesModule } from './pipes';
import { DirectivesModule } from './directives';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { LoadingModalComponent } from './modals/loading-modal/loading-modal.component';

@NgModule({
  declarations: [
  
    InfoModalComponent,
       LoadingModalComponent,
  ],
  imports: [
    CommonModule,
    ShareComponentModule,
    PipesModule,
    DirectivesModule,
  ],
  exports: [
    ShareComponentModule,
    PipesModule,
    DirectivesModule
  ],
  providers: []
})
export class ShareModule { }
