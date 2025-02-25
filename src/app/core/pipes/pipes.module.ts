import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetRoutePathPipe } from './get-route-path.pipe';
import { GetActiveRoutePipe } from './get-active-route.pipe';
import { CustomerTypePipe } from './customer-type.pipe';
import { IconPipe } from './icon.pipe';
import { FormarrayToFormgroupPipe } from './formarray-to-formgroup.pipe';
import { FormcontrolToFormgroupPipe } from './formcontrol-to-formgroup.pipe';
import { GetTotalPagePipe } from './get-total-page.pipe';
import { TransformDatePipe } from './transform-date.pipe';
import { WalletStatusPipe } from './wallet-status.pipe';
import { ApproveStatusPipe } from './approve-status.pipe';
import { FairmediaStatusPipe } from './fairmedia-status.pipe';
import { BuddhistDate } from './buddhist-date.pipe';

@NgModule({
  declarations: [
    GetRoutePathPipe,
    GetActiveRoutePipe,
    CustomerTypePipe,
    IconPipe,
    FormarrayToFormgroupPipe,
    FormcontrolToFormgroupPipe,
    GetTotalPagePipe,
    TransformDatePipe,
    WalletStatusPipe,
    ApproveStatusPipe,
    FairmediaStatusPipe,
    BuddhistDate
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetRoutePathPipe,
    GetActiveRoutePipe,
    CustomerTypePipe,
    IconPipe,
    FormarrayToFormgroupPipe,
    FormcontrolToFormgroupPipe,
    GetTotalPagePipe,
    TransformDatePipe,
    WalletStatusPipe,
    ApproveStatusPipe,
    FairmediaStatusPipe,
    BuddhistDate
  ],
  providers: [
    GetRoutePathPipe,
    GetActiveRoutePipe,
    CustomerTypePipe,
    IconPipe,
    FormarrayToFormgroupPipe,
    FormcontrolToFormgroupPipe,
    GetTotalPagePipe,
    TransformDatePipe,
    WalletStatusPipe,
    ApproveStatusPipe,
    FairmediaStatusPipe,
    BuddhistDate
  ]
})
export class PipesModule {
  static forRoot() {
    return {
        ngModule: PipesModule,
        providers: []
    };
 }
}
