import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardMainComponent } from './screens/dashboard-main/dashboard-main.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './screens/users/users.component';

@NgModule({
  declarations: [DashboardLayoutComponent, DashboardMainComponent, UsersComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    PrimeNgModule,
    RouterModule,
  ],
})
export class AdminDashboardModule {}
