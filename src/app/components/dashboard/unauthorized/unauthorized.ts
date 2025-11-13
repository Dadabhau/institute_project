import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  template: `<p>
    Your are not authorized person. Please go to login <a routerLink="/login">Go to Login</a>
  </p>`,
  styles: '',
  imports: [RouterLink],
})
export class Unauthorized {
  private routes = inject(Router);
}
