import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) return true;

  // redirect to login
  return router.createUrlTree(['/auth/login']);
};

// usage for role-protected routes (helper factory)
export function roleGuard(requiredRole: string): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth.isLoggedIn()) return router.createUrlTree(['/auth/login']);
    if (auth.hasRole(requiredRole)) return true;
    // optionally redirect to a "not-authorized" page or dashboard
    return router.createUrlTree(['/not-authorized']);
  };
}
