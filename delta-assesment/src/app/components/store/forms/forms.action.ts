import { createAction, props } from '@ngrx/store';
import { FormTemplate } from '../../services/model';


export const addForm = createAction(
  '[Forms] Add',
  props<{ form: FormTemplate }>()
);
export const updateForm = createAction(
  '[Forms] Update',
  props<{ form: FormTemplate }>()
);
export const deleteForm = createAction(
  '[Forms] Delete',
  props<{ id: string }>()
);
