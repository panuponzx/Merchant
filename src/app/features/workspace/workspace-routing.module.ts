import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { CustomRoutesModel } from '../../core/interfaces';
import {
  WorkspaceWithNavbarComponent,
  SearchUserComponent,
  MenuOptionComponent,
  WorkspaceWithNavbarAndSidebarComponent,
  UserInfoComponent,
} from './pages';


const routes: CustomRoutesModel = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
        {
          path: '',
          redirectTo: 'menu-option',
          pathMatch: 'full',
        },
        {
          path: '',
          component: WorkspaceWithNavbarComponent,
          children: [
            {
              path: 'menu-option',
              component: MenuOptionComponent,
            },
            {
              path: 'search-user',
              component: SearchUserComponent
            }
          ]
        },
        {
          path: '',
          component: WorkspaceWithNavbarAndSidebarComponent,
          children: [
            {
              path: 'user-info/:id',
              component: UserInfoComponent
            }
          ]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
