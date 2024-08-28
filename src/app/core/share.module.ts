import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareComponentModule } from './components/share-component.module';
import { PipesModule } from './pipes';
import { DirectivesModule } from './directives';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { LoadingModalComponent } from './modals/loading-modal/loading-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { SuspendModalComponent } from '../features/workspace/pages/workspace-with-navbar-and-sidebar/modals/suspend-modal/suspend-modal.component';

@NgModule({
  declarations: [
  
    InfoModalComponent,
       LoadingModalComponent,
       ConfirmModalComponent,
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
