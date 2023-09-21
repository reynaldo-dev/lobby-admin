import {
  BehaviorSubject,
  catchError,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICommunities } from 'src/app/admin-dashboard/interfaces/communities.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICommunityMembers } from '../interfaces/community-members-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  public isOpenModalCreateCommunity: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private headers!: HttpHeaders;

  private _communities: ICommunities[] | [] = [];

  private isCommunityMembersModalVisible!: BehaviorSubject<boolean>;

  private _communityMembers!: ICommunityMembers;

  private _community: ICommunities | any = {};

  constructor(private http: HttpClient) {
    this.isCommunityMembersModalVisible = new BehaviorSubject<boolean>(false);
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get communities() {
    return this._communities;
  }

  get communityMembers() {
    return this._communityMembers;
  }
  get communityMembersModalVisible() {
    return this.isCommunityMembersModalVisible.asObservable();
  }

  get $isOpenModalCreateCommunity() {
    return this.isOpenModalCreateCommunity.asObservable();
  }

  setIsCommunityMembersModalVisibleValue(value: boolean) {
    this.isCommunityMembersModalVisible.next(value);
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

  getCommunityMembers(id: string) {
    return this.http
      .get<ICommunityMembers>(`${environment.apiUrl}/communities/${id}/members`)
      .pipe(
        tap((res) => {
          this._communityMembers = res;
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  createCommunity(community: any) {
    return this.http
      .post(`${environment.apiUrl}/communities`, community, {
        headers: this.headers,
      })
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

  toggleModalCreateCommunity(isOpen: boolean) {
    this.isOpenModalCreateCommunity.next(isOpen);
  }
}
