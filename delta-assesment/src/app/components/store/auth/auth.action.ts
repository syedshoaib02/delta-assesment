import { createAction, props } from '@ngrx/store';
export const login = createAction(
  '[Auth] Login',
  props<{ role: 'Admin' | 'User' }>()
);
export const logout = createAction('[Auth] Logout');
