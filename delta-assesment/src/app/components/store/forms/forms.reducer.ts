import { createReducer, on } from '@ngrx/store';
import * as FormsActions from '../forms/forms.action';
import { FormTemplate } from '../../services/model';


export interface FormsState { forms: FormTemplate[]; }
export const initialFormsState: FormsState = { forms: [] };

export const formsReducer = createReducer(
  initialFormsState,
  on(FormsActions.addForm, (s, { form }) => ({ ...s, forms: [...s.forms, form] })),
  on(FormsActions.updateForm, (s, { form }) => ({ ...s, forms: s.forms.map(f => f.id === form.id ? form : f) })),
  on(FormsActions.deleteForm, (s, { id }) => ({ ...s, forms: s.forms.filter(f => f.id !== id) }))
);
