import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsStatsComponent } from './components/events-stats/events-stats.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ProfileScreenComponent } from './screens/profile-screen/profile-screen.component';
import { ProfileSignComponent } from './components/profile-sign/profile-sign.component';

@NgModule({
  declarations: [
    EventsStatsComponent,
    ProfileScreenComponent,
    ProfileSignComponent,
  ],
  exports: [EventsStatsComponent, ProfileScreenComponent, ProfileSignComponent],
  imports: [CommonModule, PrimeNgModule],
})
export class AppCommonModule {}
