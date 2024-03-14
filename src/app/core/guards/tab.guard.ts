import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CustomRouteDataModel } from '../interfaces';
import { inject } from '@angular/core';

export const TabGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const data = (route.data as CustomRouteDataModel | undefined);
  if (data && data.allowed_tabs) {
    const allowedTabs: string[] = data.allowed_tabs;
    const tabParam: string = route.params['tab'];
    if (allowedTabs.includes(tabParam)) {
      return true;
    } else {
      router.navigate(['page-not-found'])
      return false;
    }
  } else {
    return true;
  }
};
