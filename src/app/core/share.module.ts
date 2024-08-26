import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareComponentModule } from './components/share-component.module';
import { PipesModule } from './pipes';
import { DirectivesModule } from './directives';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { LoadingModalComponent } from './modals/loading-modal/loading-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { RegisterCardComponent } from './modals/register-card/register-card.component'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  
    InfoModalComponent,
       LoadingModalComponent,
       ConfirmModalComponent,
       RegisterCardComponent,
  ],
  imports: [
    CommonModule,
    ShareComponentModule,
    PipesModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  exports: [
    ShareComponentModule,
    PipesModule,
    DirectivesModule
  ],
  providers: []
})
export class ShareModule { }
