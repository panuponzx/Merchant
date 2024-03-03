import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  AddressComponent,
  WalletInfoComponent,
  LoyaltyPointInfoComponent,
  DeviceListComponent
} from './pages';

import { NavbarComponent, SidebarComponent } from './layouts';
import { NgSelectModule } from '@ng-select/ng-select';

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
    DeviceListComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ShareModule,
    NgxCurrencyDirective,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    ShareModule,
    GeneralInfoComponent,
    WalletInfoComponent,
    LoyaltyPointInfoComponent,
    DeviceListComponent,
    AddressComponent
  ]
})
export class WorkspaceModule { }
