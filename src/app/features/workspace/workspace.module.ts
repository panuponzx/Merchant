import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCurrencyDirective } from "ngx-currency";
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from '../../core/share.module';

import { WorkspaceRoutingModule } from './workspace-routing.module';

import {
  WorkspaceWithNavbarComponent,
  SearchUserComponent,
  MenuOptionComponent,
  WorkspaceWithNavbarAndSidebarComponent,
  UserInfoComponent,
  GeneralInfoComponent,
  WalletInfoComponent,
  LoyaltyPointInfoComponent,
  DeviceListComponent

} from './pages';

import { NavbarComponent, SidebarComponent } from './layouts';


@NgModule({
  declarations: [
    SearchUserComponent,
    NavbarComponent,
    SidebarComponent,
    WorkspaceWithNavbarComponent,
    WorkspaceWithNavbarAndSidebarComponent,
    MenuOptionComponent,
    UserInfoComponent,
    GeneralInfoComponent,
    WalletInfoComponent,
    LoyaltyPointInfoComponent,
    DeviceListComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ShareModule,
    NgxCurrencyDirective,
    NgbNavModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    ShareModule,
    GeneralInfoComponent,
    WalletInfoComponent,
    LoyaltyPointInfoComponent,
    DeviceListComponent
  ]
})
export class WorkspaceModule { }
