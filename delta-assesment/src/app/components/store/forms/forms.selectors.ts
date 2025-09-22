import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormsState } from './forms.reducer';

export const selectFormsState = createFeatureSelector<FormsState>('forms');
export const selectAllForms = createSelector(selectFormsState, (s) => s.forms);
export const selectFormById = (id: string) =>
  createSelector(selectAllForms, (forms) => forms.find((f) => f.id === id));
