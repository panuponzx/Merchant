import { Pipe, PipeTransform } from '@angular/core';
import { CustomRouteDataModel, CustomRouteModel } from '../interfaces';

@Pipe({
  name: 'getRoutePath'
})
export class GetRoutePathPipe implements PipeTransform {

  transform(routeConfig: CustomRouteModel, custmerId?: string | undefined): string | undefined | string[] {
    if (routeConfig.data?.request_id && routeConfig.data.default_path &&  custmerId) {
      if (routeConfig.data?.allowed_tabs ) {
        return [routeConfig.data.default_path, routeConfig.data?.allowed_tabs[0], custmerId];
      } else {
        return [routeConfig.data.default_path, custmerId];
      }
    } else {
      return routeConfig.path;
    }
  }

}
