import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-events-stats',
  templateUrl: './events-stats.component.html',
  styleUrls: ['./events-stats.component.css'],
})
export class EventsStatsComponent {
  @Input() activeEvents!: number | null;
  @Input() inactiveEvents!: number | null;
  @Input() asLink: boolean = false;
}
