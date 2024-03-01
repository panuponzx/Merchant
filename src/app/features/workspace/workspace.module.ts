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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetaTableComponent } from './components';


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
   DetaTableComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ShareModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
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
