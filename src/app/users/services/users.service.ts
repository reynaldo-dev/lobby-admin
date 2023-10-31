import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { IUser, UserData } from '../interfaces/user.interface';
import { AllowedRoles } from 'src/app/auth/roles/AllowedRoles';

export interface IRole {
  id: string;
  role: string;
  createdAt: string;
}

interface IRoleResponse {
  total: number;
  data: IRole[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users = new BehaviorSubject<UserData[] | null>(null);
  private headers!: HttpHeaders;
  private readonly baseUrl = `${environment.apiUrl}/user`;
  public roles: IRole[] = [];

  public isModalCreateVisible = new BehaviorSubject<boolean>(false);
  public isModalUpdateVisible = new BehaviorSubject<boolean>(false);
  public isModalUpdateProfileVisible = new BehaviorSubject<boolean>(false);
  public isModalCreateMasiveVisible = new BehaviorSubject<boolean>(false);

  public selectedUser = new BehaviorSubject<UserData | null>(null);

  private _userDetails: UserData | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    this.init();
  }

  private handleError(error: any) {
    return throwError(
      () => new Error(error?.error?.message || 'Algo salio mal')
    );
  }

  private init() {
    this.getUsers().subscribe();
    this.getRoles().subscribe();
  }

  get $isModalCreateMasiveVisible() {
    return this.isModalCreateMasiveVisible.asObservable();
  }

  get users$(): Observable<UserData[] | null> {
    return this._users.asObservable();
  }

  get userDetails(): UserData | null {
    return this._userDetails;
  }

  setSelectedUser(user: UserData): void {
    this.selectedUser.next(user);
  }

  getRoles(): Observable<IRole[]> {
    const rolesUrl = `${environment.apiUrl}/roles`;
    return this.http
      .get<IRoleResponse>(rolesUrl, { headers: this.headers })
      .pipe(
        map((response: IRoleResponse) => {
          this.roles = response.data;
          return this.roles;
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getUsers() {
    return this.http.get<IUser>(this.baseUrl, { headers: this.headers }).pipe(
      tap((response: IUser) => this._users.next(response.data)),
      catchError(this.handleError)
    );
  }

  getUser(id: string) {
    return this.http
      .get<UserData>(`${this.baseUrl}/${id}`, { headers: this.headers })
      .pipe(
        tap((user: UserData) => this.selectedUser.next(user)),
        catchError(this.handleError)
      );
  }

  getUserDetails(id: string): Observable<UserData> {
    return this.http
      .get<UserData>(`${this.baseUrl}/${id}`, { headers: this.headers })
      .pipe(
        tap((user: UserData) => (this._userDetails = user)),
        catchError(this.handleError)
      );
  }

  createUser(user: UserData) {
    return this.http.post(this.baseUrl, user, { headers: this.headers }).pipe(
      switchMap(() => this.getUsers()),
      catchError(this.handleError)
    );
  }

  public createUsersMasive(users: UserData[]) {
    const mappedUsers = users.map((user) => {
      return {
        ...user,
        rolId: this.roles.find((role) => role.role === AllowedRoles.OFFICER)
          ?.id,
      };
    });
    return this.http
      .post(`${this.baseUrl}/masive`, mappedUsers, { headers: this.headers })
      .pipe(
        switchMap(() => this.getUsers()),
        catchError((err) => {
          this.getUsers().subscribe();
          return throwError(() => err.error.message || 'Algo salio mal');
        })
      );
  }

  updateUser(user: UserData, id: string): Observable<UserData | IUser> {
    return this.http
      .patch(`${this.baseUrl}/${id}`, user, { headers: this.headers })
      .pipe(
        tap(() => this.authService.getProfile(id).subscribe()),
        switchMap(() => this.getUsers()),
        catchError(this.handleError)
      );
  }

  public toggleCreateModal(visible: boolean) {
    this.isModalCreateVisible.next(visible);
  }

  toggleUpdateModal(visible: boolean) {
    this.isModalUpdateVisible.next(visible);
  }

  toggleUpdateProfileModal(visible: boolean) {
    this.isModalUpdateProfileVisible.next(visible);
  }

  toggleCreateMasiveModal(visible: boolean) {
    this.isModalCreateMasiveVisible.next(visible);
  }
}
