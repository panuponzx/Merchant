import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import {
  SearchUserComponent
} from './pages';

import {
  NavbarComponent,
  SidebarComponent
} from './layouts';


@NgModule({
  declarations: [
    SearchUserComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class WorkspaceModule { }
