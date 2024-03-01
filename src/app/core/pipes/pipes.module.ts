import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetRoutePathPipe } from './get-route-path.pipe';
import { GetActiveRoutePipe } from './get-active-route.pipe';
import { CustomerTypePipe } from './customer-type.pipe';
import { IconPipe } from './icon.pipe';

@NgModule({
  declarations: [
    GetRoutePathPipe,
    GetActiveRoutePipe,
    CustomerTypePipe,
    IconPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetRoutePathPipe,
    GetActiveRoutePipe,
    CustomerTypePipe,
    IconPipe
  ],
  providers: [
    GetRoutePathPipe,
    GetActiveRoutePipe,
    CustomerTypePipe,
    IconPipe
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
