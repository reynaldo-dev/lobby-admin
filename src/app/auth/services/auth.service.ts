import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/events/services/events.service';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { UsersService } from 'src/app/users/services/users.service';
import { EventsCategoryService } from 'src/app/events-category/services/events-category.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authState: any;
  private _isAuthenticated: boolean = false;
  private _user: any;
  private lastRoute = localStorage.getItem('url') || '/dashboard/inicio';

  constructor(
    private router: Router,
    private http: HttpClient,
    private readonly eventService: EventsService,
    private readonly communityService: CommunityService,
    private readonly userService: UsersService,
    private readonly eventCategoryService: EventsCategoryService
  ) {
    this.whoAmI().subscribe();
  }

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

    return this.http
      .get('http://localhost:4000/api/auth/whoami', { headers })
      .pipe(
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

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('url');

    this._isAuthenticated = false;
    this._user = null;
    this._authState = { isAuthenticated: false, user: null };

    this.router.navigate(['auth/login']);
  }
}
