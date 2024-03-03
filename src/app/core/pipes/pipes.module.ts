import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetRoutePathPipe } from './get-route-path.pipe';
import { GetActiveRoutePipe } from './get-active-route.pipe';
import { CustomerTypePipe } from './customer-type.pipe';
import { IconPipe } from './icon.pipe';
import { FormarrayToFormgroupPipe } from './formarray-to-formgroup.pipe';
import { FormcontrolToFormgroupPipe } from './formcontrol-to-formgroup.pipe';

@NgModule({
  declarations: [
    GetRoutePathPipe,
    GetActiveRoutePipe,
    CustomerTypePipe,
    IconPipe,
    FormarrayToFormgroupPipe,
    FormcontrolToFormgroupPipe
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
    FormcontrolToFormgroupPipe
  ],
  providers: [
    GetRoutePathPipe,
    GetActiveRoutePipe,
    CustomerTypePipe,
    IconPipe,
    FormarrayToFormgroupPipe,
    FormcontrolToFormgroupPipe
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
