import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { IProfileResponse } from 'src/app/common/interfaces/profile-response.interface';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authState: any;
  private _profile!: IProfileResponse;
  private _isAuthenticated: boolean = false;
  private _user: any;
  private lastRoute = localStorage.getItem('url') || '/dashboard/inicio';

  constructor(private router: Router, private http: HttpClient) {
    this.whoAmI().subscribe();
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get profile(): IProfileResponse {
    return this._profile;
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
      .post<LoginResponse>(`${environment.apiUrl}/auth`, payload)
      .pipe(
        tap((res) => {
          this._isAuthenticated = true;
          this._user = res.user;
          localStorage.setItem('access_token', res.access_token);
          this._authState = { isAuthenticated: true, user: res.user };
          window.location.reload();
        }),
        tap(() => {
          this.router.navigateByUrl(this.lastRoute);
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

    return this.http.get(`${environment.apiUrl}/auth/whoami`, { headers }).pipe(
      tap((res: any) => {
        this._isAuthenticated = true;
        this._user = res.user;
        localStorage.setItem('access_token', res.access_token);
        this._authState = { isAuthenticated: true, user: res.user };
      }),
      tap(() => {
        this.router.navigateByUrl(this.lastRoute);
      }),
      map(() => true)
    );
  }

  getProfile(id: string): Observable<IProfileResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http
      .get<IProfileResponse>(`${environment.apiUrl}/user/profile/${id}`, {
        headers,
      })
      .pipe(
        tap((res) => {
          this._profile = res;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('url');

    this._isAuthenticated = false;
    this._user = null;
    this._authState = { isAuthenticated: false, user: null };

    this.router.navigate(['auth/login']);
  }
}
