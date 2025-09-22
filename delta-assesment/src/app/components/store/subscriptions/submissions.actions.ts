import { createAction, props } from '@ngrx/store';
import { FormSubmission } from '../../services/model';


export const addSubmission = createAction('[Submissions] Add', props<{ submission: FormSubmission }>());
