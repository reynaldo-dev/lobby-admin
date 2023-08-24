import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';
import { IEventDetails } from '../interfaces/event-details.interface';
import { IEventAssistanceConfirmation } from '../interfaces/event-assistance-confirmation.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private _event!: IEventDetails;
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

  private _eventAssistanceConfirmation!: IEventAssistanceConfirmation;

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

  get event(): IEventDetails {
    return this._event;
  }

  get eventAssistanceConfirmation(): IEventAssistanceConfirmation {
    return this._eventAssistanceConfirmation;
  }

  getEvents() {
    return this.http
      .get<IEvent[]>(`${environment.apiUrl}/events`, {
        headers: this.headers,
      })
      .pipe(
        tap((events: IEvent[]) => {
          this._events = events;
        })
      );
  }

  getEventById(eventId: string) {
    return this.http
      .get<IEventDetails>(`${environment.apiUrl}/events/${eventId}`, {
        headers: this.headers,
      })
      .pipe(
        tap((event) => {
          this._event = event;
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getEventsAtDate(date: string) {
    return this.http
      .get<IEvent[]>(`${environment.apiUrl}/events/at-date?fromDate=${date}`, {
        headers: this.headers,
      })
      .pipe(
        tap((events: IEvent[]) => {
          this._eventsAtDate = events;
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
        `${environment.apiUrl}/events/active-events`,
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
        `${environment.apiUrl}/events/inactive-events`,
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

  getAssistanceConfirmation(eventId: string) {
    return this.http
      .get<IEventAssistanceConfirmation>(
        `${environment.apiUrl}/assistance-tickets/confirmations/${eventId}`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        tap((data) => {
          this._eventAssistanceConfirmation = data;
        }),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }

  createEvent(event: any) {
    return this.http
      .post(`${environment.apiUrl}/events`, event, {
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
      .patch(`${environment.apiUrl}/events/${id}`, event, {
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
      .delete(`${environment.apiUrl}/events/${eventId}`, {
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
