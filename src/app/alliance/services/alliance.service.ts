import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAlliance } from '../interfaces/alliance.interface';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ICreateAlliance } from '../interfaces/create-alliance.interface';

@Injectable({
  providedIn: 'root',
})
export class AllianceService {
  private _alliances: IAlliance[] | null = null;
  private _selectedAlliance: BehaviorSubject<IAlliance | null> =
    new BehaviorSubject<IAlliance | null>(null);
  private _apiUrl = `${environment.apiUrl}/alliance`;
  private headers!: HttpHeaders;

  private _isModalCreateVisible: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _isModalUpdateVisible: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get alliances(): IAlliance[] | null {
    return this._alliances;
  }

  get selectedAlliance$(): Observable<IAlliance | null> {
    return this._selectedAlliance.asObservable();
  }

  get isModalCreateVisible$(): Observable<boolean> {
    return this._isModalCreateVisible.asObservable();
  }

  get isModalUpdateVisible$(): Observable<boolean> {
    return this._isModalUpdateVisible.asObservable();
  }

  setIsModalCreateVisible(value: boolean): void {
    this._isModalCreateVisible.next(value);
  }

  setIsModalUpdateVisible(value: boolean): void {
    this._isModalUpdateVisible.next(value);
  }

  setSelectAlliance(alliance: IAlliance | null): void {
    this._selectedAlliance.next(alliance);
  }

  getAlliances() {
    return this.http.get<IAlliance[]>(this._apiUrl).pipe(
      tap((alliances) => {
        this._alliances = alliances;
      })
    );
  }

  createAlliance(alliance: ICreateAlliance) {
    return this.http
      .post<IAlliance>(this._apiUrl, alliance, { headers: this.headers })
      .pipe(
        tap((alliance) => {
          this.getAlliances().subscribe();
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  updateAlliance(alliance: IAlliance): Observable<IAlliance> {
    const { id, ...rest } = alliance;
    return this.http
      .patch<IAlliance>(`${this._apiUrl}/${id}`, rest, {
        headers: this.headers,
      })
      .pipe(
        tap((alliance) => {
          this.setSelectAlliance(null);
          this.getAlliances().subscribe();
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
