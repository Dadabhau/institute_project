import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'https://feestracking.freeprojectapi.com/api/User/login';

  login(cred: any) {
    return this.http
      .post<LoginResponse>(this.apiUrl, cred)
      .pipe(tap((res) => sessionStorage.setItem('token', res.token)));
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
