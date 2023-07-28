import { EventEmitter, Injectable } from '@angular/core';
import { IUser, UserData } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

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
  private _users = new BehaviorSubject<UserData[]>([]);
  private headers!: HttpHeaders;
  private readonly baseUrl = 'http://localhost:4000/api/user';
  public roles: IRole[] = [];

  public isModalCreateVisible = new BehaviorSubject<boolean>(false);
  public isModalUpdateVisible = new BehaviorSubject<boolean>(false);
  public selectedUser = new BehaviorSubject<UserData | null>(null);

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    this.init();
    this.getRoles().subscribe();
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(
      () => new Error(error?.error?.message || 'Something went wrong')
    );
  }

  private init() {
    this.getUsers().subscribe();
  }

  get users$(): Observable<UserData[]> {
    return this._users.asObservable();
  }

  setSelectedUser(user: UserData): void {
    this.selectedUser.next(user);
  }

  getRoles(): Observable<IRole[]> {
    const rolesUrl = 'http://localhost:4000/api/roles';
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

  createUser(user: UserData) {
    return this.http.post(this.baseUrl, user, { headers: this.headers }).pipe(
      switchMap(() => this.getUsers()),
      catchError(this.handleError)
    );
  }

  updateUser(user: UserData, id: string) {
    return this.http
      .patch(`${this.baseUrl}/${id}`, user, { headers: this.headers })
      .pipe(
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
}
