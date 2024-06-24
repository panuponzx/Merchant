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
  DeviceListComponent,
  PassageInfoComponent,
  TopupAndPaymentInformationComponent,
  TopupInformationComponent
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
import { AddWalletModalComponent } from './pages/workspace-with-navbar-and-sidebar/modals/add-wallet-modal/add-wallet-modal.component';
import { EditCarModalComponent } from './pages/workspace-with-navbar-and-sidebar/modals/edit-car-modal/edit-car-modal.component';
import { MenuOptionSuperAdminComponent } from './pages/workspace-with-navbar/pages/menu-option-super-admin/menu-option-super-admin.component';
import { AddCarType9Component } from './pages/workspace-with-navbar/pages/add-car-type9/add-car-type9.component';
import { WorkspaceBackofficeManagementComponent } from './pages/workspace-backoffice-management/workspace-backoffice-management.component';
import { ApprovalManagementComponent } from './pages/workspace-backoffice-management/pages/approval-management/approval-management.component';
import { InputUserInfoType9Component } from './pages/workspace-with-navbar/pages/add-car-type9/input-user-info-type9/input-user-info-type9.component';
import { InputCarInfoType9Component } from './pages/workspace-with-navbar/pages/add-car-type9/input-car-info-type9/input-car-info-type9.component';
import { ApprovalCancelDeviceComponent } from './pages/workspace-backoffice-management/pages/approval-cancel-device/approval-cancel-device.component';
import { CancelDeviceWaitingForApprovalComponent } from './pages/workspace-backoffice-management/pages/approval-cancel-device/tabs/cancel-device-waiting-for-approval/cancel-device-waiting-for-approval.component';
import { CancelDeviceApprovalComponent } from './pages/workspace-backoffice-management/pages/approval-cancel-device/tabs/cancel-device-approval/cancel-device-approval.component';
import { CancelDeviceRejectComponent } from './pages/workspace-backoffice-management/pages/approval-cancel-device/tabs/cancel-device-reject/cancel-device-reject.component';
import { AccountMaintenanceFeeComponent } from './pages/workspace-backoffice-management/pages/account-maintenance-fee/account-maintenance-fee.component';
import { MaintenanceCostsComponent } from './pages/workspace-backoffice-management/pages/account-maintenance-fee/tabs/maintenance-costs/maintenance-costs.component';
import { MaintenanceDeviceCloseComponent } from './pages/workspace-backoffice-management/pages/account-maintenance-fee/tabs/maintenance-device-close/maintenance-device-close.component';
import { ManageRedeemComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign/tabs/manage-redeem/manage-redeem.component';
import { ManageEarningComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign/tabs/manage-earning/manage-earning.component';
import { ExchangeProductsComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign/tabs/manage-redeem/tabs/exchange-products/exchange-products.component';
import { CouponComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign/tabs/manage-redeem/tabs/coupon/coupon.component';
import { TollComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign/tabs/manage-redeem/tabs/toll/toll.component';
import { ApprovalManagementWaitingComponent } from './pages/workspace-backoffice-management/pages/approval-management/tabs/approval-management-waiting/approval-management-waiting.component';
import { ApprovalManagementApprovalComponent } from './pages/workspace-backoffice-management/pages/approval-management/tabs/approval-management-approval/approval-management-approval.component';
import { ApprovalManagementRejectComponent } from './pages/workspace-backoffice-management/pages/approval-management/tabs/approval-management-reject/approval-management-reject.component';
import { AddEditComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign/tabs/manage-earning/add-edit/add-edit.component';
import { AddComponent } from './pages/workspace-backoffice-management/pages/setting-earn-campaign/tabs/manage-redeem/add/add.component';
import { PaymentInformationComponent } from './pages/workspace-with-navbar-and-sidebar/pages/payment-information/payment-information.component';
import { WaitingPaymentComponent } from './pages/workspace-with-navbar-and-sidebar/pages/payment-information/tabs/waiting-payment/waiting-payment.component';
import { PaidPaymentComponent } from './pages/workspace-with-navbar-and-sidebar/pages/payment-information/tabs/paid-payment/paid-payment.component';
import { TransferInformationComponent } from './pages/workspace-with-navbar-and-sidebar/pages/transfer-information/transfer-information.component';
import { TransferInfoComponent } from './pages/workspace-with-navbar-and-sidebar/pages/transfer-information/tabs/transfer-info/transfer-info.component';
import { RejectPendingRequestModalComponent } from './pages/workspace-backoffice-management/pages/approval-management/modals/reject-pending-request-modal/reject-pending-request-modal.component';
import { ETaxComponent } from './pages/workspace-with-navbar-and-sidebar/pages/user-info/tabs/e-tax/e-tax.component';
import { PassageInfoModalComponent } from './pages/workspace-with-navbar-and-sidebar/modals/passage-info-modal/passage-info-modal.component';
import { EmailVerificationModalComponent } from './pages/workspace-with-navbar-and-sidebar/modals/email-verification-modal/email-verification-modal.component';
import { EarningManagementComponent } from './pages/workspace-backoffice-management/pages/earning-management/earning-management.component';
import { RedeemManagementComponent } from './pages/workspace-backoffice-management/pages/redeem-management/redeem-management.component';
import { RedeemExchangeComponent } from './pages/workspace-backoffice-management/pages/redeem-management/tabs/redeem-exchange/redeem-exchange.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { BillInformationComponent } from './pages/workspace-with-navbar-and-sidebar/pages/bill-information/bill-information.component';
import { BillWaitingPaymentComponent } from './pages/workspace-with-navbar-and-sidebar/pages/bill-information/tabs/bill-waiting-payment/bill-waiting-payment.component';
import { BillPaidPaymentComponent } from './pages/workspace-with-navbar-and-sidebar/pages/bill-information/tabs/bill-paid-payment/bill-paid-payment.component';
import { CancelObuModalComponent } from './pages/workspace-with-navbar-and-sidebar/modals/cancel-obu-modal/cancel-obu-modal.component';
import { ActivityFaremediaComponent } from './pages/workspace-backoffice-management/pages/activity-faremedia/activity-faremedia.component';



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
    InputJuristicAttachDocumentComponent,
    PassageInfoComponent,
    TopupAndPaymentInformationComponent,
    TopupInformationComponent,
    AddWalletModalComponent,
    EditCarModalComponent,
    MenuOptionSuperAdminComponent,
    AddCarType9Component,
    WorkspaceBackofficeManagementComponent,
    ApprovalManagementComponent,
    InputUserInfoType9Component,
    InputCarInfoType9Component,
    ApprovalCancelDeviceComponent,
    CancelDeviceWaitingForApprovalComponent,
    CancelDeviceApprovalComponent,
    CancelDeviceRejectComponent,
    AccountMaintenanceFeeComponent,
    MaintenanceCostsComponent,
    MaintenanceDeviceCloseComponent,
    ManageRedeemComponent,
    ManageEarningComponent,
    ExchangeProductsComponent,
    CouponComponent,
    TollComponent,
    ApprovalManagementWaitingComponent,
    ApprovalManagementApprovalComponent,
    ApprovalManagementRejectComponent,
    AddEditComponent,
    AddComponent,
    PaymentInformationComponent,
    WaitingPaymentComponent,
    PaidPaymentComponent,
    TransferInformationComponent,
    TransferInfoComponent,
    RejectPendingRequestModalComponent,
    ETaxComponent,
    PassageInfoModalComponent,
    EmailVerificationModalComponent,
    EarningManagementComponent,
    RedeemManagementComponent,
    RedeemExchangeComponent,
    BillInformationComponent,
    BillWaitingPaymentComponent,
    BillPaidPaymentComponent,
    CancelObuModalComponent,
    ActivityFaremediaComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ShareModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
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
    NgOtpInputModule
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
    DatatableComponent,
    TopupInformationComponent
  ],
  providers: [provideNgxMask()]
})
export class WorkspaceModule { }
