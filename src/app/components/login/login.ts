import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../../core/services/auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, FaIconComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  fieldTextType: boolean = false;
  user = {
    userName: '',
    password: '',
  };
  errors: any = '';

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(private auth: Auth, private router: Router) {}

  login(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!', this.user);

      this.auth.login(this.user).subscribe({
        next: (res) => {
          debugger;
          console.log('Login successful', res);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errors = err.error.message || 'An error occurred during login.';
          form.reset();
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
