import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient, private router: Router) {}

  login(cred: any) {
    return this.http
      .post<LoginResponse>(`${environment.API_URL}${API_ENDPOINTS.USER.LOGIN}`, cred)
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
