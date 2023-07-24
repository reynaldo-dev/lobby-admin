import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private _events: IEvent[] = [];
  public isModalCreateVisible = false;
  public modalCreateStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isModalUpdateVisible = false;
  public modalUpdateStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  private selectedEvent: BehaviorSubject<IEvent | null> =
    new BehaviorSubject<IEvent | null>(null);

  constructor(private readonly http: HttpClient) {
    this.getEvents().subscribe();
  }
  getSelectedEvent(): Observable<IEvent | null> {
    return this.selectedEvent.asObservable();
  }
  setSelectedEvent(event: IEvent | null) {
    this.selectedEvent.next(event);
  }

  get events(): IEvent[] {
    return this._events;
  }

  getEvents() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http
      .get<IEvent[]>('http://localhost:4000/api/events', { headers })
      .pipe(
        tap((events: IEvent[]) => {
          this._events = events;
        })
      );
  }

  createEvent(event: IEvent) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http
      .post('http://localhost:4000/api/events', event, { headers })
      .pipe(
        tap((event) => {
          this.getEvents().subscribe();
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  updateEvent(event: IEvent, id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http
      .patch(`http://localhost:4000/api/events/${id}`, event, { headers })
      .pipe(
        tap((event) => {
          this.getEvents().subscribe();
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  deleteEvent(eventId: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http
      .delete(`http://localhost:4000/api/events/${eventId}`, { headers })
      .pipe(
        tap((event) => {
          this.getEvents().subscribe();
        }),
        catchError((err) => {
          console.log(err);
          return throwError(() => err.error.message);
        })
      );
  }

  toggleCreateModal() {
    this.isModalCreateVisible = !this.isModalCreateVisible;
    this.modalCreateStatus.emit(this.isModalCreateVisible);
  }

  toggleUpdateModal() {
    this.isModalUpdateVisible = !this.isModalUpdateVisible;
    this.modalUpdateStatus.emit(this.isModalUpdateVisible);
    console.log(this.isModalUpdateVisible);
  }
}
