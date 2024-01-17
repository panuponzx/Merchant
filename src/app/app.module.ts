import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  AccountComponent,
  AccountModule,
  WorkspaceComponent,
  WorkspaceModule,
  PageNotFoundComponent
} from './features';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    WorkspaceComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    WorkspaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
