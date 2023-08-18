import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-events-stats',
  templateUrl: './events-stats.component.html',
  styleUrls: ['./events-stats.component.css'],
})
export class EventsStatsComponent {
  @Input() activeEvents!: number;
  @Input() inactiveEvents!: number;
  @Input() asLink: boolean = false;
}
