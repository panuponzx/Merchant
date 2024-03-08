import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { CustomRouteModel } from '../interfaces';

@Pipe({
  name: 'getActiveRoute'
})
export class GetActiveRoutePipe implements PipeTransform {

  constructor(
    private router: Router
  ) {
  }

  transform(routeConfig: CustomRouteModel): boolean {
    const url = this.router.url;
    if (routeConfig.data?.default_path) {
      const path = routeConfig.data.default_path;
      return url.includes(path);
    } else {
      if (url === routeConfig.path) {
        return true;
      } else {
        return false;
      }
    }
  }

}
