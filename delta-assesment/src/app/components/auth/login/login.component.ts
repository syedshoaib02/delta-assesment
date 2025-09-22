import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule, Router } from '@angular/router';
import { login } from '../../store/auth/auth.action';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  role: 'User'|'Admin' = 'User';
  roles = ['User','Admin'];

  constructor(private store: Store, private router: Router) {}

  submit() {
    this.store.dispatch(login({ role: this.role }));
    localStorage.setItem('dfb:role', this.role); 
    this.router.navigate(['/forms']);
  }
}
