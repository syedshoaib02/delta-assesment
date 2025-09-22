import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FormTemplate } from '../services/model';
import { AuthService } from '../services/auth.service';
import { selectAllForms } from '../store/forms/forms.selectors';
import { deleteForm } from '../store/forms/forms.action';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './form-list.component.html',
})
export class FormListComponent {
  forms$: Observable<FormTemplate[]>;
  constructor(
    private store: Store,
    private auth: AuthService,
    private router: Router
  ) {
    this.forms$ = this.store.select(selectAllForms);
  }
  isAdmin() {
    return localStorage.getItem('dfb:role') === 'Admin';
  }
  goBuild() {
    this.router.navigate(['/forms/build']);
  }
  preview(id: string) {
    this.router.navigate(['/forms', id, 'preview']);
  }
  fill(id: string) {
    this.router.navigate(['/forms', id, 'fill']);
  }
  submissions(id: string) {
    this.router.navigate(['/forms', id, 'submissions']);
  }
  edit(id: string) {
    this.router.navigate(['/forms/build'], { queryParams: { edit: id } });
  }
  remove(id: string) {
    if (confirm('Delete?')) this.store.dispatch(deleteForm({ id }));
  }
}
