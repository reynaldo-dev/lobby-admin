import { Component, Input } from '@angular/core';
import { getFormattedDate } from 'src/app/helpers/departments/get-formatted-date/getFormattedDate';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
  @Input() event: any;
  @Input() communityColor: string = '';

  getFormattedDate(date: string): string {
    return getFormattedDate(date);
  }
}
