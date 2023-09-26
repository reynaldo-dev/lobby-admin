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
import { AppCommonModule } from '../common/common.module';
import { AllianceModule } from '../alliance/alliance.module';
import { ComponentsModule } from '../components/components.module';
import { RedeemablesModule } from '../redeemables/redeemables.module';
import { ChallengesModule } from '../challenges/challenges.module';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardMainComponent,
    CommunitiesCarouselComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    AdminDashboardRoutingModule,
    AllianceModule,
    CommunityModule,
    AuthModule,
    PrimeNgModule,
    RouterModule,
    FormsModule,
    EventsModule,
    UsersModule,
    TicketsModule,
    ComponentsModule,
    RedeemablesModule,
    ChallengesModule,
  ],
})
export class AdminDashboardModule {}
