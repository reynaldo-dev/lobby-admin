import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetRankingResponse } from '../interfaces/get-ranking-response.interface';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private headers!: HttpHeaders;

  private _ranking: IGetRankingResponse[] | null = null;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get ranking(): IGetRankingResponse[] | null {
    return this._ranking;
  }

  public getCurrentGlobalRanking() {
    return this.http
      .get<IGetRankingResponse[]>(`${this.apiUrl}/leagues/ranking`, {
        headers: this.headers,
      })
      .pipe(
        tap((ranking) => {
          this._ranking = ranking;
        })
      );
  }
}
