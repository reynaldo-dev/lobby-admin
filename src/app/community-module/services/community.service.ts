import { catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICommunities } from 'src/app/admin-dashboard/interfaces/communities.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private _communities: ICommunities[] | [] = [];

  constructor(private http: HttpClient) {
    this.getCommunities().subscribe();
  }

  get communities() {
    return this._communities;
  }

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

  getCommunityById(id: string) {
    return this.http
      .get<ICommunities>(`http://localhost:4000/api/communities/${id}`)
      .pipe(
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

  updateCommunity(id: string, community: any) {
    return this.http
      .patch(`http://localhost:4000/api/communities/${id}`, community)
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
