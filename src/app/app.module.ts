import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './core/share.module';

import { RequestInterceptor, ErrorInterceptor } from './core/interceptors';
import { NgxsModule } from '@ngxs/store';
import {
  AccountComponent,
  AccountModule,
  WorkspaceComponent,
  WorkspaceModule,
  PageNotFoundComponent
} from './features';
import { NgOtpInputModule } from 'ng-otp-input';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
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
    NgOtpInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
