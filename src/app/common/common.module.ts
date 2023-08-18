import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsStatsComponent } from './components/events-stats/events-stats.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [EventsStatsComponent],
  exports: [EventsStatsComponent],
  imports: [CommonModule, PrimeNgModule],
})
export class AppCommonModule {}
