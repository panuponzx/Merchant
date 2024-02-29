import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './core/share.module';

import { RequestInterceptor, ErrorInterceptor } from './core/interceptors';

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
    WorkspaceModule,
    ShareModule,
    NgbModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
