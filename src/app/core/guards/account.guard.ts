import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services';

export const AccountGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const user = authenticationService.getUserValue();
  if (user) {
    router.navigate(['work-space/menu-option']);
    return false;
  } else {
    return true;
  }
};


