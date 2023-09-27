import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGetChallengesResponse } from '../interfaces/get-challenges-response';
import { IChallenge } from '../interfaces/challenge.interface';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ICreateChallenge } from '../interfaces/create-challenge.interface';
import { IGetChallengeByIDResponse } from '../interfaces/get-challenge-by-id.interface';
import { IUpdateChallenge } from '../interfaces/update-challenge.interface';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  private _apiUrl = environment.apiUrl;
  private _headers!: HttpHeaders;
  private _challenges: IChallenge[] | null = null;

  public selectedChallenge: BehaviorSubject<IGetChallengeByIDResponse | null> =
    new BehaviorSubject<IGetChallengeByIDResponse | null>(null);

  public isModalCreateVisible = new BehaviorSubject<boolean>(false);
  public isModalUpdateVisible = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this._headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get challenges(): IChallenge[] | null {
    return this._challenges;
  }

  get isModalCreateVisible$(): Observable<boolean> {
    return this.isModalCreateVisible.asObservable();
  }

  get isModalUpdateVisible$(): Observable<boolean> {
    return this.isModalUpdateVisible.asObservable();
  }

  get selectedChallenge$(): Observable<IGetChallengeByIDResponse | null> {
    return this.selectedChallenge.asObservable();
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

  setIsModalCreateVisible(value: boolean) {
    this.isModalCreateVisible.next(value);
  }

  setIsModalUpdateVisible(value: boolean, challengeId: string = '') {
    this.isModalUpdateVisible.next(value);
    this.getChallenge(challengeId).subscribe();
  }

  setSeletedChallenge(value: IGetChallengeByIDResponse | null) {
    this.selectedChallenge.next(value);
  }

  createChallenge(challenge: ICreateChallenge) {
    return this.httpClient
      .post(`${this._apiUrl}/challenges`, challenge, {
        headers: this._headers,
      })
      .pipe(
        tap((response) => {
          this.getChallenges().subscribe();
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getChallenge(id: string) {
    return this.httpClient
      .get<IGetChallengeByIDResponse>(`${this._apiUrl}/challenges/${id}`, {
        headers: this._headers,
      })
      .pipe(
        tap((response) => {
          this.selectedChallenge.next(response);
        })
      );
  }

  public updateChallenge(challengeId: string, challenge: IUpdateChallenge) {
    return this.httpClient
      .patch(`${this._apiUrl}/challenges/${challengeId}`, challenge, {
        headers: this._headers,
      })
      .pipe(
        tap((response) => {
          this.getChallenges().subscribe();
          this.setSeletedChallenge(null);
          this.setIsModalUpdateVisible(false);
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
