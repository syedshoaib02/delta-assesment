import { createReducer, on } from '@ngrx/store';
import * as SubActions from './submissions.actions';
import { FormSubmission } from '../../services/model';


export interface SubmissionsState { submissions: FormSubmission[]; }
export const initialSubmissionsState: SubmissionsState = { submissions: [] };

export const submissionsReducer = createReducer(
  initialSubmissionsState,
  on(SubActions.addSubmission, (s, { submission }) => ({ ...s, submissions: [...s.submissions, submission] }))
);
