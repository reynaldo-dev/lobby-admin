import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReceivedRecognitionsResponse } from './interfaces/received-recognitions.interface';
import { IGivenRecognitionsResponse } from './interfaces/given-recognitions.interface';

@Injectable({
  providedIn: 'root',
})
export class RecognitionsService {
  private readonly _baseUrl = environment.apiUrl;
  private _givenRecognitions: IGivenRecognitionsResponse[] | null = null;
  private _receivedRecognitions: IReceivedRecognitionsResponse[] | null = null;
  private _headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    this._headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get givenRecognitions(): IGivenRecognitionsResponse[] | null {
    return this._givenRecognitions;
  }

  get receivedRecognitions(): IReceivedRecognitionsResponse[] | null {
    return this._receivedRecognitions;
  }

  getGivenRecognitions(
    userId: string
  ): Observable<IGivenRecognitionsResponse[]> {
    return this.http
      .get<IGivenRecognitionsResponse[]>(
        `${this._baseUrl}/recognitions/given-recognitions/${userId}`,
        {
          headers: this._headers,
        }
      )
      .pipe(
        tap((res: any) => {
          this._givenRecognitions = res;
        })
      );
  }

  getReceivedRecognitions(
    userId: string
  ): Observable<IReceivedRecognitionsResponse[]> {
    return this.http
      .get<IReceivedRecognitionsResponse[]>(
        `${this._baseUrl}/recognitions/received-recognitions/${userId}`,
        {
          headers: this._headers,
        }
      )
      .pipe(
        tap((res: any) => {
          this._receivedRecognitions = res;
        })
      );
  }
}
