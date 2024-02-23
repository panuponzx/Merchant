import { Pipe, PipeTransform } from '@angular/core';
import { CustomRouteDataModel, CustomRouteModel } from '../interfaces';

@Pipe({
  name: 'getRoutePath'
})
export class GetRoutePathPipe implements PipeTransform {

  transform(routeConfig: CustomRouteModel, custmerId: string | undefined): string | undefined | string[] {
    if (routeConfig.data?.allowed_tabs && routeConfig.data.default_path && custmerId) {
      return [routeConfig.data.default_path, routeConfig.data?.allowed_tabs[0], custmerId];
    } else {
      return routeConfig.path;
    }
  }

}
