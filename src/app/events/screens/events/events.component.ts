import { Component } from '@angular/core';
import { IEvent } from '../../interfaces/event.interface';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  public loading: boolean = false;
  public statuses: string[] = ['open', 'closed', 'canceled'];
  public value = 0;
  public filter = '';

  constructor(private eventsService: EventsService) {
    this.eventsService.modalCreateStatus.subscribe();
    this.eventsService.modalUpdateStatus.subscribe();
  }

  get events(): IEvent[] {
    return this.eventsService.events;
  }

  createEvent() {
    this.eventsService.toggleCreateModal();
  }
  updateEvent(event: IEvent) {
    this.eventsService.toggleUpdateModal();
  }

  deleteEvent(event: IEvent) {
    // this.eventsService.deleteEvent(event.id).subscribe();
    throw new Error('Method not implemented.');
  }
}
