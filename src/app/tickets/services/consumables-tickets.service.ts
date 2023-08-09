import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Observable, tap, catchError } from 'rxjs';
import {
  IConsumableData,
  IConsumable,
} from '../interfaces/consumable.interface';

@Injectable({
  providedIn: 'root',
})
export class ConsumablesTicketsService {
  private _consumables = new BehaviorSubject<IConsumableData[]>([]);
  private headers!: HttpHeaders;
  private readonly baseUrl = 'http://localhost:4000/api/consumables';
  public selectedConsumable = new BehaviorSubject<IConsumableData | null>(null);

  public isDialogOpen = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    this.init();
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(
      () => new Error(error?.error?.message || 'Something went wrong')
    );
  }

  private init() {
    this.getAllConsumables().subscribe();
  }

  get consumables$(): Observable<IConsumableData[]> {
    return this._consumables.asObservable();
  }

  setSelectedConsumable(consumable: IConsumableData): void {
    this.selectedConsumable.next(consumable);
  }

  getAllConsumables(paginationDto?: {
    from?: number;
    limit?: number;
  }): Observable<IConsumable> {
    return this.http
      .get<IConsumable>(this.baseUrl, {
        params: {
          from: String(paginationDto?.from || 0),
          limit: String(paginationDto?.limit || 10),
        },
        headers: this.headers,
      })
      .pipe(
        tap((response: IConsumable) => this._consumables.next(response.data)),
        catchError(this.handleError)
      );
  }

  getConsumableById(id: string): Observable<IConsumableData> {
    return this.http
      .get<IConsumableData>(`${this.baseUrl}/${id}`, { headers: this.headers })
      .pipe(
        tap((consumable: IConsumableData) =>
          this.selectedConsumable.next(consumable)
        ),
        catchError(this.handleError)
      );
  }

  public toggleDialogDetails(visible: boolean) {
    this.isDialogOpen.next(visible);
  }
}
