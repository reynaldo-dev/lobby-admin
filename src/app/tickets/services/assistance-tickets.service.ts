import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Observable, tap, catchError } from 'rxjs';
import {
  IAssistanceData,
  IAssistance,
} from '../interfaces/assistance.interface';

@Injectable({
  providedIn: 'root',
})
export class AssistanceTicketsService {
  private _tickets = new BehaviorSubject<IAssistanceData[]>([]);
  private headers!: HttpHeaders;
  private readonly baseUrl = 'http://localhost:4000/api/assistance-tickets';
  public selectedTicket = new BehaviorSubject<IAssistanceData | null>(null);

  public isDialogOpen = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(
      () => new Error(error?.error?.message || 'Something went wrong')
    );
  }

  private init() {
    this.getAllTickets().subscribe();
  }

  get tickets$(): Observable<IAssistanceData[]> {
    return this._tickets.asObservable();
  }

  setSelectedTicket(ticket: IAssistanceData): void {
    this.selectedTicket.next(ticket);
  }

  getAllTickets(paginationDto?: {
    from?: number;
    limit?: number;
  }): Observable<IAssistance> {
    return this.http
      .get<IAssistance>(this.baseUrl, {
        params: {
          from: String(paginationDto?.from || 0),
          limit: String(paginationDto?.limit || 10),
        },
        headers: this.headers,
      })
      .pipe(
        tap((response: IAssistance) => this._tickets.next(response.data)),
        catchError(this.handleError)
      );
  }

  getTicketById(id: string): Observable<IAssistanceData> {
    return this.http
      .get<IAssistanceData>(`${this.baseUrl}/${id}`, { headers: this.headers })
      .pipe(
        tap((ticket: IAssistanceData) => this.selectedTicket.next(ticket)),
        catchError(this.handleError)
      );
  }

  public toggleDialogDetails(visible: boolean) {
    this.isDialogOpen.next(visible);
  }
}
