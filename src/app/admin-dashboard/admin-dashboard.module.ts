import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '@angular/common';
import { CommunitiesCarouselComponent } from './components/communities-carousel/communities-carousel.component';
import { CommunityModule } from '../community-module/community-module.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardMainComponent } from './screens/dashboard-main/dashboard-main.component';
import { EventsModule } from '../events/events.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UsersComponent } from './screens/users/users.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardMainComponent,
    UsersComponent,
    CommunitiesCarouselComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    CommunityModule,
    AuthModule,
    PrimeNgModule,
    RouterModule,
    FormsModule,
    EventsModule,
  ],
})
export class AdminDashboardModule {}
