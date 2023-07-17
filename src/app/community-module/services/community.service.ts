import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ICommunities } from 'src/app/admin-dashboard/interfaces/communities.interface';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
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
        return throwError(() => err.error.message);
      })
    );
  }

  createCommunity(community: any) {
    return this.http
      .post('http://localhost:4000/api/communities', community)
      .pipe(
        tap((res) => {
          this.getCommunities().subscribe();
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
