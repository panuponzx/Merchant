import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from "ngx-currency";
import { NgbNavModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxCopyPasteDirective } from "ngx-copypaste";

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
  DeviceListComponent,
  PassageInfoComponent
} from './pages';

import { NavbarComponent, SidebarComponent } from './layouts';

import { DatatableComponent } from './components';

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
    AddressComponent,
    DatatableComponent,
    PassageInfoComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ShareModule,
    NgxCurrencyDirective,
    NgxCopyPasteDirective,
    NgbNavModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxDatatableModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    ShareModule,
    GeneralInfoComponent,
    WalletInfoComponent,
    LoyaltyPointInfoComponent,
    DeviceListComponent,
    AddressComponent,
    DatatableComponent
  ]
})
export class WorkspaceModule { }
