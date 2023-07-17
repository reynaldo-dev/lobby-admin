import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated: boolean = false;
  private _user: any;
  private _authState: any;

  constructor(private router: Router, private http: HttpClient) {}

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get user(): any {
    return this._user;
  }

  get authState(): any {
    return this._authState;
  }

  login(email: string | null, password: string | null): Observable<boolean> {
    const payload = { email, password };

    return this.http
      .post<LoginResponse>('http://localhost:4000/api/auth', payload)
      .pipe(
        tap((res) => {
          this._isAuthenticated = true;
          this._user = res.user;
          localStorage.setItem('access_token', res.access_token);
          this._authState = { isAuthenticated: true, user: res.user };
          this.router.navigate(['dashboard/inicio']);
        }),
        map(() => true),

        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  whoAmI() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http
      .get('http://localhost:4000/api/auth/whoami', { headers })
      .pipe(
        tap((res: any) => {
          this._isAuthenticated = true;
          this._user = res.user;
          localStorage.setItem('access_token', res.access_token);
          this._authState = { isAuthenticated: true, user: res.user };
        }),
        map(() => true)
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this._isAuthenticated = false;
    this._user = null;
    this._authState = { isAuthenticated: false, user: null };
    this.router.navigate(['auth/login']);
  }
}
