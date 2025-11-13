import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LoginUser } from '../../core/models/interfaces/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, FaIconComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  fieldTextType = false;
  user: LoginUser = { userName: '', password: '' };
  errors = '';
  loading = signal(true);

  constructor(private authService: AuthService, private router: Router) {}

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login(form: NgForm) {
    if (form.valid) {
      debugger;
      this.authService.login(this.user).subscribe({
        next: (res) => {
          // After login redirect based on role
          const role = res.data.role;
          this.router.navigate(['/dashboard']);

          // both dashboards have same UI but could route differently if needed
          // if (role === 'SuperAdmin') {
          //   this.router.navigate(['/dashboard']);
          // } else if (role === 'InstituteAdmin') {
          //   this.router.navigate(['/dashboard']);
          // } else {
          //   this.router.navigate(['/dashboard']);
          // }
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errors = err.error?.message || 'Invalid credentials. Try again.';
          form.resetForm();
        },
        complete: () => this.loading.set(false),
      });
    }
  }
}
