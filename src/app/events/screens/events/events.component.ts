import { Component } from '@angular/core';
import { IEvent } from '../../interfaces/event.interface';
import { EventsService } from '../../services/events.service';
import { CommunityService } from 'src/app/community-module/services/community.service';

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
  public filterEventState = '';
  public filterEventIsPrivate = '';
  public filterEventCommunity = '';

  public filterStateOption = [
    {
      name: 'Activo',
      value: 'Activo',
    },
    {
      name: 'Inactivo',
      value: 'Inactivo',
    },
  ];

  public filterIsPrivateOption = [
    {
      name: 'Si',
      value: 'Si',
    },
    {
      name: 'No',
      value: 'No',
    },
  ];

  get communities() {
    return this.communityService.communities;
  }

  constructor(
    private eventsService: EventsService,
    private communityService: CommunityService
  ) {
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
