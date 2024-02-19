import { CanActivateFn } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  return true;
};

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services';

export const AuthenticationGuard = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const user = authenticationService.getUserValue();
  if(user) {
    return true;
  } else {
    router.navigate(['account/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
