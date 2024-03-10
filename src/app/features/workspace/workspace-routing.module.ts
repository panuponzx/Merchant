import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { CustomRoutesModel } from '../../core/interfaces';
import { TabGuard } from '../../core/guards';

import {
  WorkspaceWithNavbarComponent,
  SearchUserComponent,
  MenuOptionComponent,
  WorkspaceWithNavbarAndSidebarComponent,
  UserInfoComponent,
  PassageInfoComponent,
  TopupAndPaymentInformationComponent
} from './pages';

export const routesConfig: CustomRoutesModel = [
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
              id: 'menuOptionRoute',
              path: 'menu-option',
              component: MenuOptionComponent,
            },
            {
              id: 'searchUserRoute',
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
              id: 'userInfoRoute',
              path: 'user-info/:tab/:id',
              component: UserInfoComponent,
              data: {
                is_sidebar: true,
                label: 'ข้อมูลผู้ใช้',
                request_id: true,
                default_path: 'user-info',
                allowed_tabs: ['general-info', 'wallet-info', 'loyalty-point-info', 'device-list']
              },
              canActivate: [ TabGuard ]
            },
            {
              id: 'passageInfoRoute',
              path: 'passage-info/:id',
              component: PassageInfoComponent,
              data: {
                is_sidebar: true,
                label: 'ข้อมูลการผ่านทาง',
                request_id: true,
                default_path: 'passage-info'
              }
            },
            {
              id: 'topupAndPaymentInformationRoute',
              path: 'topup-and-payment-information/:id',
              component: TopupAndPaymentInformationComponent,
              data: {
                is_sidebar: true,
                label: 'ข้อมูลการเติมเงิน / ชำระเงิน',
                request_id: true,
                default_path: 'topup-and-payment-information'
              }
            },
          ],
          data: {
            is_sidebar: true
          }
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesConfig)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
