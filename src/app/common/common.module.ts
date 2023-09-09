import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsStatsComponent } from './components/events-stats/events-stats.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ProfileScreenComponent } from './screens/profile-screen/profile-screen.component';
import { ProfileSignComponent } from './components/profile-sign/profile-sign.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UsersModule } from '../users/users.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UnauthorizedScreenComponent } from './screens/unauthorized-screen/unauthorized-screen.component';

@NgModule({
  declarations: [
    EventsStatsComponent,
    ProfileScreenComponent,
    ProfileSignComponent,
    UpdateProfileComponent,
    UnauthorizedScreenComponent,
  ],
  exports: [
    EventsStatsComponent,
    ProfileScreenComponent,
    ProfileSignComponent,
    UpdateProfileComponent,
    UnauthorizedScreenComponent,
  ],
  imports: [CommonModule, PrimeNgModule, ReactiveFormsModule, UsersModule],
})
export class AppCommonModule {}
