import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from '../store/auth/auth.action';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'dfb:role';

  constructor(private store: Store) {}

  login(role: 'Admin'|'User') {
    localStorage.setItem(this.key, role);
    this.store.dispatch(login({ role }));
  }

  logout() {
    localStorage.removeItem(this.key);
    this.store.dispatch(logout());
  }

  getPersistedRole(): 'Admin'|'User'|null {
    return (localStorage.getItem(this.key) as 'Admin'|'User'|null);
  }
    isAdmin(): boolean {
    return this.getPersistedRole() === 'Admin';
  }
}
