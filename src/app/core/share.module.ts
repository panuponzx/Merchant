import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ShareComponentModule } from './components/share-component.module';
import { DirectivesModule } from './directives';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { LoadingModalComponent } from './modals/loading-modal/loading-modal.component';
import { PipesModule } from './pipes';
import { BorrowingModalComponent } from './modals/borrowing-modal/borrowing-modal.component';

@NgModule({
  declarations: [
  
    InfoModalComponent,
       LoadingModalComponent,
       ConfirmModalComponent,
       BorrowingModalComponent
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
