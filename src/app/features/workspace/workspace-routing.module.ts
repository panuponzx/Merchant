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
import { AddUserComponent } from './pages/workspace-with-navbar/pages/add-user/add-user.component';
import { InputAddUserComponent } from './pages/workspace-with-navbar/pages/add-user/input-add-user/input-add-user.component';
import { MenuOptionSuperAdminComponent } from './pages/workspace-with-navbar/pages/menu-option-super-admin/menu-option-super-admin.component';
import { AddCarType9Component } from './pages/workspace-with-navbar/pages/add-car-type9/add-car-type9.component';
import { WorkspaceBackofficeManagementComponent } from './pages/workspace-backoffice-management/workspace-backoffice-management.component';
import { ApprovalManagementComponent } from './pages/workspace-backoffice-management/pages/approval-management/approval-management.component';
import { ApprovalCancelDeviceComponent } from './pages/workspace-backoffice-management/pages/approval-cancel-device/approval-cancel-device.component';
import { AccountMaintenanceFeeComponent } from './pages/workspace-backoffice-management/pages/account-maintenance-fee/account-maintenance-fee.component';
import { ManageEarningComponent, ManageRedeemComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign';
import { AddEditComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign/tabs/manage-earning/add-edit/add-edit.component';
import { AddComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign/tabs/manage-redeem/add/add.component';

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
            id: 'menuOptionSuperAdminRoute',
            path: 'menu-option-super-admin',
            component: MenuOptionSuperAdminComponent,
          },
          {
            id: 'searchUserRoute',
            path: 'search-user',
            component: SearchUserComponent
          },
          {
            id: 'addUserRoute',
            path: 'add-user',
            component: AddUserComponent,
          },
          {
            id: 'personalInfo',
            path: 'add-user/:customerType',
            component: InputAddUserComponent,
          },
          {
            id: 'addCarType9Route',
            path: 'add-car-type9',
            component: AddCarType9Component,
          },
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
      },
      {
        path: '',
        component: WorkspaceBackofficeManagementComponent,
        children: [
          {
            id: 'approvalCancelDeviceRoute',
            path: 'approval-cancel-device/:tab',
            component: ApprovalCancelDeviceComponent,
            data: {
              is_sidebar: true,
              label: 'การอนุมัติยกเลิกอุปกรณ์',
              // request_id: true,
              default_path: 'approval-cancel-device',
              allowed_tabs: ['waiting-for-approval', 'approval', 'reject']
            },
            canActivate: [ TabGuard ]
          },
          {
            id: 'accountMaintenanceFeeRoute',
            path: 'account-maintenance-fee/:tab',
            component: AccountMaintenanceFeeComponent,
            data: {
              is_sidebar: true,
              label: 'ระบบแจ้งค่ารักษาอุปกรณ์',
              // request_id: true,
              default_path: 'account-maintenance-fee',
              allowed_tabs: ['maintenance-costs', 'maintenance-device-close']
            },
            canActivate: [ TabGuard ]
          },
          {
            id: 'approvalManagementRoute',
            path: 'approval-management/:tab',
            component: ApprovalManagementComponent,
            data: {
              is_sidebar: true,
              label: 'การอนุมัติ',
              // request_id: true,
              default_path: 'approval-management',
              allowed_tabs: ['waiting-for-approval', 'approval', 'reject']
            },
            canActivate: [ TabGuard ]
          },
          {
            id: 'ManageEarningComponent',
            path: 'manage-earning',
            component:ManageEarningComponent ,
            data: {
              is_sidebar: true,
              label: 'ระบบการให้คะแนน',
              // request_id: true,
              default_path: 'manage-earning',
              // allowed_tabs: ['general-info', 'wallet-info', 'loyalty-point-info', 'device-list']
            },
            canActivate: [ TabGuard ]
          },
          {
            id: 'ManageRedeemComponent',
            path: 'manage-redeem/:tabs',
            component:ManageRedeemComponent ,
            data: {
              is_sidebar: true,
              label: 'ระบบการแลกคะแนน',
              // request_id: true,
              default_path: 'manage-redeem',
              allowed_tabs: ['Exchange-products', 'coupon', 'toll']
            },
            // canActivate: [ TabGuard ]
          },
          {
            id: 'add-edit',
            path: 'add-edit',
            component:AddEditComponent,
            data: {
              is_sidebar: false,
              label: 'เพิ่มเงือนไขการให้คะแนนพิเศษ',
              // request_id: true,
              default_path: 'add-edit',
              // allowed_tabs: ['Exchange-products', 'coupon', 'toll']
            },
            // canActivate: [ TabGuard ]
          },
          {
            id: 'add',
            path: 'add',
            component:AddComponent,
            data: {
              is_sidebar: false,
              label: 'เพิ่มเงือนไขการให้คะแนนพิเศษ',
              // request_id: true,
              default_path: 'add',
              // allowed_tabs: ['Exchange-products', 'coupon', 'toll']
            },
            // canActivate: [ TabGuard ]
          }
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
