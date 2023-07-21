import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  localStorage.setItem('url', state.url);

  if (authService.authState?.isAuthenticated) {
    return true;
  }

  router.navigate(['auth/login']);

  return false;
};
