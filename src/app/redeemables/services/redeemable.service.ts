import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGetRedeemablesResponse } from '../interfaces/redeemables-response.interface';
import { ICreateRedeemablePayload } from '../interfaces/create-redeemable-payload.interface';
import { IUpdateRedeemablePayload } from '../interfaces/update-redeemable-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class RedeemableService {
  private _apiUrl = environment.apiUrl;
  private _redeemables: IGetRedeemablesResponse[] | null = null;
  private _headers: HttpHeaders;

  public selectedRedeemableId: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  public selectedRedeemable: IGetRedeemablesResponse | null = null;

  public openCreateRedeemableModal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public openUpdateRedeemableModal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get redeemables(): IGetRedeemablesResponse[] | null {
    return this._redeemables;
  }

  get $isOpenCreateRedeemableModal(): Observable<boolean> {
    return this.openCreateRedeemableModal.asObservable();
  }

  get $isOpenUpdateRedeemableModal(): Observable<boolean> {
    return this.openUpdateRedeemableModal.asObservable();
  }

  get $selectedRedeemableId(): Observable<string | null> {
    return this.selectedRedeemableId.asObservable();
  }

  setIsOpenCreateRedeemableModal(value: boolean) {
    this.openCreateRedeemableModal.next(value);
  }

  setIsOpenUpdateRedeemableModal(value: boolean, redeemableId: string | null) {
    this.selectedRedeemableId.next(redeemableId);
    this.openUpdateRedeemableModal.next(value);
  }

  getRedeemables(): Observable<IGetRedeemablesResponse[]> {
    return this.http
      .get<IGetRedeemablesResponse[]>(`${this._apiUrl}/redeemable`, {
        headers: this._headers,
      })
      .pipe(
        tap((redeemables: any) => {
          this._redeemables = redeemables;
        })
      );
  }

  createRedeemable(redeemable: ICreateRedeemablePayload) {
    return this.http
      .post(`${this._apiUrl}/redeemable`, redeemable, {
        headers: this._headers,
      })
      .pipe(
        tap((redeemable: any) => {
          this.getRedeemables().subscribe();
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getRedeemable(redeemableId: string): Observable<IGetRedeemablesResponse> {
    return this.http
      .get<IGetRedeemablesResponse>(
        `${this._apiUrl}/redeemable/${redeemableId}`,
        {
          headers: this._headers,
        }
      )
      .pipe(
        tap((redeemable) => {
          this.selectedRedeemable = redeemable;
        })
      );
  }

  updateRedeemable(redeemableId: string, redeemable: IUpdateRedeemablePayload) {
    return this.http
      .patch(`${this._apiUrl}/redeemable/${redeemableId}`, redeemable, {
        headers: this._headers,
      })
      .pipe(
        tap((redeemable: any) => {
          this.getRedeemables().subscribe();
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
