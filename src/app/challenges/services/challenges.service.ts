import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGetChallengesResponse } from '../interfaces/get-challenges-response';
import { IChallenge } from '../interfaces/challenge.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  private _apiUrl = environment.apiUrl;
  private _headers!: HttpHeaders;
  private _challenges: IChallenge[] | null = null;
  constructor(private httpClient: HttpClient) {
    this._headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get challenges(): IChallenge[] | null {
    return this._challenges;
  }

  getChallenges(from: number = 0, limit: number = 10) {
    return this.httpClient
      .get<IGetChallengesResponse>(`${this._apiUrl}/challenges`, {
        headers: this._headers,
        params: {
          from,
          limit,
        },
      })
      .pipe(
        tap((response) => {
          this._challenges = response.data;
        })
      );
  }
}
