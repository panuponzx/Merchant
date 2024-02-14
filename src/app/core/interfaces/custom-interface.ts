import { ActivatedRoute, ActivatedRouteSnapshot, Route } from '@angular/router';

export interface CustomRouteModel extends Route {
  children?: CustomRouteModel[],
  data?: {
    is_sidebar?: boolean
  }
}

export declare type CustomRoutesModel = CustomRouteModel[];

export interface CustomActivatedRouteSnapshot extends ActivatedRouteSnapshot {
  routeConfig: CustomRouteModel
}

export interface CustomeActivatedRoute extends ActivatedRoute {
  routeConfig: CustomRouteModel
}
