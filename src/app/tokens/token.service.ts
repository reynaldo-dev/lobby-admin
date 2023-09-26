import { Injectable } from '@angular/core';
import { IToken } from './interfaces/token.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGetTokensResponse } from './interfaces/getTokens-response';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _tokens: IToken[] | null = null;
  private _apiUrl = environment.apiUrl;
  private headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get tokens(): IToken[] | null {
    return this._tokens;
  }

  getTokens(
    from: number = 0,
    limit: number = 10
  ): Observable<IGetTokensResponse> {
    return this.http
      .get<IGetTokensResponse>(`${this._apiUrl}/tokens`, {
        headers: this.headers,
        params: { from, limit },
      })
      .pipe(
        tap((response: IGetTokensResponse) => {
          this._tokens = response.tokens;
        })
      );
  }
}
