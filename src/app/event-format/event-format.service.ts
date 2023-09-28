import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEventFormat } from './interfaces/event-format.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventFormatService {
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  });
  private _eventFormats: IEventFormat[] | null = null;

  constructor(private http: HttpClient) {}

  get eventFormats(): IEventFormat[] | null {
    return this._eventFormats;
  }

  getEventFormats() {
    return this.http
      .get<IEventFormat[]>(this.apiUrl + '/event-format', {
        headers: this.headers,
      })
      .pipe(
        tap((eventFormats) => {
          this._eventFormats = eventFormats;
        })
      );
  }
}
