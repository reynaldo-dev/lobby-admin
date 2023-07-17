import { HttpClient } from '@angular/common/http';
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

  constructor(private router: Router, private http: HttpClient) {}

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get user(): any {
    return this._user;
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
        }),
        map(() => true),

        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
