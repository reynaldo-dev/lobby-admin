import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private _events: IEvent[] = [];
  private _eventsAtDate: IEvent[] = [];
  private _activeEvents!: number;
  private _inactiveEvents!: number;
  public isModalCreateVisible = false;
  public modalCreateStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isModalUpdateVisible = false;
  public modalUpdateStatus: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private selectedEvent: BehaviorSubject<IEvent> = new BehaviorSubject<IEvent>(
    {} as IEvent
  );
  private headers!: HttpHeaders;

  constructor(private readonly http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  getSelectedEvent(): Observable<IEvent> {
    return this.selectedEvent.asObservable();
  }
  setSelectedEvent(event: IEvent) {
    this.selectedEvent.next(event);
  }

  get events(): IEvent[] {
    return this._events;
  }

  get eventsAtDate(): IEvent[] {
    return this._eventsAtDate;
  }

  get activeEvents(): number {
    return this._activeEvents;
  }

  get inactiveEvents(): number {
    return this._inactiveEvents;
  }

  get isUpdateModalVisible(): Observable<boolean> {
    return this.modalUpdateStatus.asObservable();
  }

  getEvents() {
    return this.http
      .get<IEvent[]>('http://localhost:4000/api/events', {
        headers: this.headers,
      })
      .pipe(
        tap((events: IEvent[]) => {
          this._events = events;
        })
      );
  }

  getEventsAtDate(date: string) {
    return this.http
      .get<IEvent[]>(
        `http://localhost:4000/api/events/at-date?fromDate=${date}`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        tap((events: IEvent[]) => {
          this._eventsAtDate = events;
          console.log('events', events);
        }),
        catchError((err) => {
          console.log('err', err);
          return throwError(() => err.error.message);
        })
      );
  }

  getActiveEventsCount() {
    return this.http
      .get<{ activeEvents: number }>(
        `http://localhost:4000/api/events/active-events`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        tap((data) => {
          this._activeEvents = data.activeEvents;
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getInActiveEventsCount() {
    return this.http
      .get<{ inactiveEvents: number }>(
        `http://localhost:4000/api/events/inactive-events`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        tap((data) => {
          this._inactiveEvents = data.inactiveEvents;
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  createEvent(event: any) {
    return this.http
      .post('http://localhost:4000/api/events', event, {
        headers: this.headers,
      })
      .pipe(
        tap((event) => {
          this.getEvents().subscribe();
          this.getEventsAtDate(new Date().toISOString()).subscribe();
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  updateEvent(event: IEvent, id: string) {
    return this.http
      .patch(`http://localhost:4000/api/events/${id}`, event, {
        headers: this.headers,
      })
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
    return this.http
      .delete(`http://localhost:4000/api/events/${eventId}`, {
        headers: this.headers,
      })
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
    this.modalUpdateStatus.next(this.isModalUpdateVisible);
  }

  clearEvents() {
    this._events = [];
    this._eventsAtDate = [];
  }
}
