import { Routes } from '@angular/router';

import { FormListComponent } from './components/form-list/form-list.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormPreviewComponent } from './components/form-preview/form-preview.component';
import { FormFillComponent } from './components/form-fill/form-fill.component';
import { FormSubmissionComponent } from './components/form-submission/form-submission.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './components/services/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forms', component: FormListComponent, canActivate: [AuthGuard] },
  { path: 'forms/build', component: FormBuilderComponent, canActivate: [AuthGuard] },
  { path: 'forms/:id/preview', component: FormPreviewComponent, canActivate: [AuthGuard] },
  { path: 'forms/:id/fill', component: FormFillComponent, canActivate: [AuthGuard] },
  { path: 'forms/:id/submissions', component: FormSubmissionComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
