import { Component, Input } from '@angular/core';
import { ITradeHistory } from 'src/app/redeemables/interfaces/trade-history.interface';

@Component({
  selector: 'app-events-stats',
  templateUrl: './events-stats.component.html',
  styleUrls: ['./events-stats.component.css'],
})
export class EventsStatsComponent {
  @Input() activeEvents!: number | null;
  @Input() inactiveEvents!: number | null;
  @Input() asLink: boolean = false;
  @Input() totalRedeems!: number;
}
