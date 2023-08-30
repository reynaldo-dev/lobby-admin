import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsStatsComponent } from './components/events-stats/events-stats.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ProfileScreenComponent } from './screens/profile-screen/profile-screen.component';
import { ProfileSignComponent } from './components/profile-sign/profile-sign.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UsersModule } from '../users/users.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventsStatsComponent,
    ProfileScreenComponent,
    ProfileSignComponent,
    UpdateProfileComponent,
  ],
  exports: [EventsStatsComponent, ProfileScreenComponent, ProfileSignComponent],
  imports: [CommonModule, PrimeNgModule, UsersModule, ReactiveFormsModule],
})
export class AppCommonModule {}
