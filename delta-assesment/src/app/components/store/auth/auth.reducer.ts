import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../auth/auth.action';

export interface AuthState { role: 'Admin'|'User'|null; }

const persisted = localStorage.getItem('dfb:role') as 'Admin'|'User'|null;

export const initialAuthState: AuthState = { role: persisted || null };

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (_, { role }) => ({ role })),
  on(AuthActions.logout, () => ({ role: null }))
);
