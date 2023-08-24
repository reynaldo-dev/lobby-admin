import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICommunities } from 'src/app/admin-dashboard/interfaces/communities.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private _communities: ICommunities[] | [] = [];

  private _community: ICommunities | any = {};

  constructor(private http: HttpClient) {}

  get communities() {
    return this._communities;
  }

  getCommunities() {
    return this.http.get(`${environment.apiUrl}/communities`).pipe(
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
      .get<ICommunities>(`${environment.apiUrl}/communities/${id}`)
      .pipe(
        switchMap((res) => {
          this._community = res;
          return this.http.get(
            `${environment.apiUrl}/communities/${id}/members/count`
          );
        }),
        map((secondRes: any) => {
          return {
            ...this._community,
            membersCount: secondRes?.totalMembers as number,
          };
        }),

        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  createCommunity(community: any) {
    return this.http.post(`${environment.apiUrl}/communities`, community).pipe(
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
      .patch(`${environment.apiUrl}/communities/${id}`, community)
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
