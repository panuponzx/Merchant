import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { CustomRoutesModel } from '../../core/interfaces';
import {
  SearchUserComponent,
  MenuOptionComponent,
  UserInfoComponent
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
          path: 'menu-option',
          component: MenuOptionComponent,
          data: {
            is_sidebar: false
          }
        },
        {
          path: 'search-user',
          component: SearchUserComponent,
          data: {
            is_sidebar: false
          }
        },
        {
          path: 'user-info/:id',
          component: UserInfoComponent,
          data: {
            is_sidebar: true
          }
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
