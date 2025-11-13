import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { LoginResponse, LoginUser, User } from '../../models/interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private getUserFromStorage(): User | null {
    const raw = localStorage.getItem('auth_user');
    return raw ? (JSON.parse(raw) as User) : null;
  }

  //  Login
  login(credentials: LoginUser): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.API_URL}${API_ENDPOINTS.USER.LOGIN}`, credentials)
      .pipe(
        tap((response) => {
          if (response?.token && response) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('auth_user', JSON.stringify(response.data));
            this.currentUserSubject.next(response.data);
          }
        })
      );
  }

  //  Save token and user in sessionStorage
  // private saveAuthData(response: LoginResponse): void {
  //   const user = response.data[0];
  //   sessionStorage.setItem('token', response.token);
  //   sessionStorage.setItem('user', JSON.stringify(user));
  //   this.currentUserSubject.next(user);
  // }

  //  Get user from sessionStorage

  //  Logout
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const u = this.getCurrentUser();
    return !!u && u.role === role;
  }
}
