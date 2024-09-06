import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ShareComponentModule } from './components/share-component.module';
import { DirectivesModule } from './directives';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { LoadingModalComponent } from './modals/loading-modal/loading-modal.component';
import { BorrowingModalComponent } from './modals/borrowing-modal/borrowing-modal.component';
import { RegisterCardComponent } from './modals/register-card/register-card.component';
import { PipesModule } from './pipes';
import { ConfirmCheckComponent } from './modals/register-card/confirm-check/confirm-check.component';

@NgModule({
  declarations: [

    InfoModalComponent,
    LoadingModalComponent,
    ConfirmModalComponent,
    BorrowingModalComponent,
    RegisterCardComponent,
    ConfirmCheckComponent,
  ],
  imports: [
    CommonModule,
    ShareComponentModule,
    PipesModule,
    DirectivesModule,
    ReactiveFormsModule,

  ],
  exports: [
    ShareComponentModule,
    PipesModule,
    DirectivesModule,
  ],
  providers: []
})
export class ShareModule { }
