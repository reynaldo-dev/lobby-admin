import { Injectable } from '@angular/core';
import { IAllianceCategory } from '../interfaces/alliance-category.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllianceCategoryService {
  private _allianceCategories: IAllianceCategory[] | null = null;
  private _headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    this._headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  get allianceCategories(): IAllianceCategory[] | null {
    return this._allianceCategories;
  }

  getAllianceCategories(withAlliances: boolean = false) {
    return this.http
      .get<IAllianceCategory[]>(
        `${environment.apiUrl}/alliance-category?withAlliances=${withAlliances}`,
        { headers: this._headers }
      )
      .pipe(
        tap((allianceCategories) => {
          this._allianceCategories = allianceCategories;
        })
      );
  }
}
