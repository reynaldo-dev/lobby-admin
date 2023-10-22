import { Component, Input } from '@angular/core';
import { getFormattedDate } from 'src/app/helpers/get-formatted-date/getFormattedDate';
import { IEventCardPayload } from '../../interfaces/event-card-payload';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
  @Input() event: IEventCardPayload = {} as IEventCardPayload;
  @Input() communityColor: string = '';

  getFormattedDate(date: string): string {
    return getFormattedDate(date);
  }
}
