import { ActivatedRoute, ActivatedRouteSnapshot, Route } from '@angular/router';

export interface CustomRouteModel extends Route {
  children?: CustomRouteModel[],
}

export declare type CustomRoutesModel = CustomRouteModel[];

export interface CustomActivatedRouteSnapshotModel extends ActivatedRouteSnapshot {
  routeConfig: CustomRouteModel
}

export interface CustomeActivatedRouteModel extends ActivatedRoute {
  routeConfig: CustomRouteModel
}
