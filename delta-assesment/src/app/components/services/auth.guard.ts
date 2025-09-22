import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';
import { selectUserRole } from '../store/auth/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.store.select(selectUserRole).pipe(map(role => {
      if (!role) { this.router.navigate(['/login']); return false; }
      const path = route.routeConfig?.path || '';
      if ((path === 'forms/build' || path.endsWith('submissions')) && role !== 'Admin') {
        alert('Admin only'); this.router.navigate(['/forms']); return false;
      }
      return true;
    }));
  }
}
