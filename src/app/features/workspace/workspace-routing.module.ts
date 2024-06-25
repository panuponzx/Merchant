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
import { PaymentInformationComponent } from './pages/workspace-with-navbar-and-sidebar/pages/payment-information/payment-information.component';
import { TransferInformationComponent } from './pages/workspace-with-navbar-and-sidebar/pages/transfer-information/transfer-information.component';
import { EarningManagementComponent } from './pages/workspace-backoffice-management/pages/earning-management/earning-management.component';
import { RedeemManagementComponent } from './pages/workspace-backoffice-management/pages/redeem-management/redeem-management.component';
import { BillInformationComponent } from './pages/workspace-with-navbar-and-sidebar/pages/bill-information/bill-information.component';
import { WriteOffDebtComponent } from './pages/workspace-backoffice-management/pages/write-off-debt/write-off-debt/write-off-debt.component';
import { OutstandingBillComponent } from './pages/workspace-backoffice-management/pages/outstanding-bill/outstanding-bill.component';

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
              allowed_tabs: ['general-info', 'wallet-info', 'loyalty-point-info', 'device-list','e-tax']
            },
            canActivate: [TabGuard]
          },
          {
            id: 'passageInfoRoute',
            path: 'passage-info/:id',
            component: PassageInfoComponent,
            data: {
              is_sidebar: true,
              label: 'ข้อมูลการใช้ทาง',
              request_id: true,
              default_path: 'passage-info'
            }
          },
          {
            id: 'topupInformationRoute',
            path: 'topup-information/:id',
            component: TopupAndPaymentInformationComponent,
            data: {
              is_sidebar: true,
              label: 'ข้อมูลการเติมเงิน',
              request_id: true,
              default_path: 'topup-information'
            }
          },
          {
            id: 'paymentInformationRoute',
            path: 'payment-information/:tab/:id',
            component: PaymentInformationComponent,
            data: {
              is_sidebar: true,
              label: 'ข้อมูลชำระเงิน',
              request_id: true,
              default_path: 'payment-information',
              allowed_tabs: ['waiting-payment', 'paid-payment']
            },
            canActivate: [TabGuard]
          },
          {
            id: 'billInformationRoute',
            path: 'bill-information/:tab/:id',
            component: BillInformationComponent,
            data: {
              is_sidebar: true,
              label: 'ข้อมูลใบแจ้งหนี้',
              request_id: true,
              default_path: 'bill-information',
              allowed_tabs: ['waiting-payment', 'paid-payment']
            },
            canActivate: [TabGuard]
          },
          {
            id: 'transfer-information',
            path: 'transfer-information/:id',
            component: TransferInformationComponent,
            data: {
              is_sidebar: true,
              label: 'ข้อมูลการโอนเงิน',
              request_id: true,
              default_path: 'transfer-information'
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
            canActivate: [TabGuard]
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
            canActivate: [TabGuard]
          },
          {
            id: 'EarningManagementComponent',
            path: 'manage-earning',
            component: EarningManagementComponent,
            data: {
              is_sidebar: true,
              label: 'ระบบการให้คะแนน',
              default_path: 'manage-earning',
            },
            canActivate: [TabGuard]
          },
          {
            id: 'RedeemManagementComponent',
            path: 'manage-redeem/:tab',
            component: RedeemManagementComponent,
            data: {
              is_sidebar: true,
              label: 'ระบบการแลกคะแนน',
              default_path: 'manage-redeem',
              allowed_tabs: ['exchange', 'coupon', 'toll']
            },
            canActivate: [ TabGuard ]
          },
          {
            id: 'add-edit',
            path: 'add-edit',
            component: AddEditComponent,
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
            component: AddComponent,
            data: {
              is_sidebar: false,
              label: 'เพิ่มเงือนไขการให้คะแนนพิเศษ',
              // request_id: true,
              default_path: 'add',
              // allowed_tabs: ['Exchange-products', 'coupon', 'toll']
            },
            // canActivate: [ TabGuard ]
          },
          {
            id: 'writeOffDebtRoute',
            path: 'write-off-debt/:tab',
            component: WriteOffDebtComponent,
            data: {
              is_sidebar: true,
              label: 'ระบบตัดหนี้สูญ',
              // request_id: true,
              default_path: 'write-off-debt',
              // allowed_tabs: ['write-oof-debt']
            },
            canActivate: [TabGuard]
          },
          {
            id: 'outStandingBillRoute',
            path: 'outstanding-bill',
            component: OutstandingBillComponent,
            data: {
              is_sidebar: true,
              label: 'ประวัติยอดบิลค้างชำระ',
              // request_id: true,
              default_path: 'outstanding-bill',
              // allowed_tabs: ['write-oof-debt']
            },
            canActivate: [TabGuard]
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
