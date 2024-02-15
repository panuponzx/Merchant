import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import {
  WorkspaceWithNavbarComponent,
  SearchUserComponent,
  MenuOptionComponent,
  WorkspaceWithNavbarAndSidebarComponent,
  UserInfoComponent
} from './pages';

import {
  NavbarComponent,
  SidebarComponent,
} from './layouts';

@NgModule({
  declarations: [
    SearchUserComponent,
    NavbarComponent,
    SidebarComponent,
    WorkspaceWithNavbarComponent,
    WorkspaceWithNavbarAndSidebarComponent,
    MenuOptionComponent,
    UserInfoComponent
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
