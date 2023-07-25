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
    this.getEvents().subscribe();
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

  get isUpdateModalVisible(): Observable<boolean> {
    return this.modalUpdateStatus.asObservable();
  }

  createEvent(event: IEvent) {
    return this.http
      .post('http://localhost:4000/api/events', event, {
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
}
