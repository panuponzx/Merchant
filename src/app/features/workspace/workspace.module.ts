import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from "ngx-currency";
import { NgbNavModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxCopyPasteDirective } from "ngx-copypaste";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

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

import { DatatableComponent } from './components';
import { AddUserComponent } from './pages/workspace-with-navbar/pages/add-user/add-user.component';
import { InputAddUserComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/input-add-user.component';
import { InputUserInfoComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/input-user-info/input-user-info.component';
import { InputIdcardAddressComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/input-idcard-address/input-idcard-address.component';
import { InputCurrentAddressComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/input-current-address/input-current-address.component';
import { OccupationDetailComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/occupation-detail/occupation-detail.component';
import { OtpRequestComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/otp-request/otp-request.component';
import { OtpConfirmComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/otp-confirm/otp-confirm.component';
import { InputJuristicInfoComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/input-juristic-info/input-juristic-info.component';
import { InputJuristicAttachDocumentComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/input-juristic-attach-document/input-juristic-attach-document.component';

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
    AddUserComponent,
    InputAddUserComponent,
    InputUserInfoComponent,
    InputIdcardAddressComponent,
    InputCurrentAddressComponent,
    OccupationDetailComponent,
    OtpRequestComponent,
    OtpConfirmComponent,
    InputJuristicInfoComponent,
    InputJuristicAttachDocumentComponent
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
    NgxDatatableModule,
    NgxMaskDirective,
    NgxMaskPipe,
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
  ],
  providers: [provideNgxMask()]
})
export class WorkspaceModule { }
