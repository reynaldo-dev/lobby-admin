import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITradeHistory } from '../interfaces/trade-history.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedeemsHistoryService {
  private _apiUrl = environment.apiUrl;
  private _headers!: HttpHeaders;
  private _redeemsHistory: ITradeHistory[] | null = null;

  constructor(private http: HttpClient) {
    this._headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get redeemsHistory(): ITradeHistory[] | null {
    return this._redeemsHistory;
  }

  get totalRedeems(): number {
    return this.redeemsHistory?.length || 0;
  }

  getRedeemsHistory() {
    return this.http
      .get<ITradeHistory[]>(`${this._apiUrl}/trade-history`, {
        headers: this._headers,
      })
      .pipe(
        tap((redeemsHistory) => {
          this._redeemsHistory = redeemsHistory;
        })
      );
  }
}
