import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardMainComponent } from './screens/dashboard-main/dashboard-main.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './screens/users/users.component';
import { FormsModule } from '@angular/forms';
import { CommunitiesCarouselComponent } from './components/communities-carousel/communities-carousel.component';
import { AuthModule } from '../auth/auth.module';
import { CommunitiesComponent } from './screens/communities/communities.component';
import { CommunityDetailComponent } from './screens/community-detail/community-detail.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardMainComponent,
    UsersComponent,
    CommunitiesCarouselComponent,
    CommunitiesComponent,
    CommunityDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    AuthModule,
    PrimeNgModule,
    RouterModule,
    FormsModule,
  ],
})
export class AdminDashboardModule {}
