import { Injectable } from '@angular/core';
import { ICommunities } from '../interfaces/communities.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _communities: ICommunities[] | [] = [];

  get communities() {
    return this._communities;
  }

  constructor(private http: HttpClient) {}

  getCommunities() {
    return this.http.get('http://localhost:4000/api/communities').pipe(
      tap((res) => {
        this._communities = res as ICommunities[];
      }),
      catchError((err) => {
        console.log(err);
        return throwError(() => err.error.message);
      })
    );
  }
}
