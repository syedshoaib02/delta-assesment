import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubmissionsState } from './submissions.reducer';

export const selectSubmissionsState = createFeatureSelector<SubmissionsState>('submissions');
export const selectSubmissionsByForm = (formId: string) =>
  createSelector(selectSubmissionsState, s => s.submissions.filter(x => x.formId === formId));
