import { ActivatedRoute, ActivatedRouteSnapshot, Route } from '@angular/router';

export interface CustomRouteModel extends Route {
  id?: string,
  children?: CustomRouteModel[],
  data?: CustomRouteDataModel
}

export declare type CustomRoutesModel = CustomRouteModel[];

export interface CustomActivatedRouteSnapshotModel extends ActivatedRouteSnapshot {
  routeConfig: CustomRouteModel
}

export interface CustomeActivatedRouteModel extends ActivatedRoute {
  routeConfig: CustomRouteModel
}

export interface CustomRouteDataModel {
  permission?: string,
  label?: string,
  is_sidebar?: boolean,
  default_path?: string,
  allowed_tabs?: string[],
  request_id?: boolean
}
