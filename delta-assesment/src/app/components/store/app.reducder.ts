import { ActionReducerMap } from '@ngrx/store';
import { FormsState, formsReducer } from './forms/forms.reducer';
import { submissionsReducer, SubmissionsState } from './subscriptions/submissions.reducer';
import { authReducer, AuthState } from './auth/auth.reducer';


export interface AppState {
  forms: FormsState;
  submissions: SubmissionsState;
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  forms: formsReducer,
  submissions: submissionsReducer,
  auth: authReducer
};
