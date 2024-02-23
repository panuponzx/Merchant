import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetRoutePathPipe } from './get-route-path.pipe';
import { GetActiveRoutePipe } from './get-active-route.pipe';

@NgModule({
  declarations: [
    GetRoutePathPipe,
    GetActiveRoutePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetRoutePathPipe,
    GetActiveRoutePipe
  ],
  providers: [
    GetRoutePathPipe,
    GetActiveRoutePipe
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
