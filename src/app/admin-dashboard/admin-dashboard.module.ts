import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { CommunityModule } from '../community-module/community-module.module';
import { EventsModule } from '../events/events.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { UsersModule } from '../users/users.module';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { CommunitiesCarouselComponent } from './components/communities-carousel/communities-carousel.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardMainComponent } from './screens/dashboard-main/dashboard-main.component';
import { TicketsModule } from '../tickets/tickets.module';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardMainComponent,
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
    UsersModule,
    TicketsModule,
  ],
})
export class AdminDashboardModule {}
