import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsCategoryService {
  private headers!: HttpHeaders;
  private _eventCategories: any[] = [];
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get eventCategories() {
    return this._eventCategories;
  }

  //http

  getEventCategories() {
    return this.http
      .get(`${environment.apiUrl}/event-category`, {
        headers: this.headers,
      })
      .pipe(tap((categories) => (this._eventCategories = categories as any[])));
  }
}
