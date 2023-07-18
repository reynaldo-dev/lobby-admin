import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardMainComponent } from './screens/dashboard-main/dashboard-main.component';
import { UsersComponent } from './screens/users/users.component';
import { authGuard } from '../auth/guards/auth.guard';
import { CommunitiesComponent } from './screens/communities/communities.component';
import { CommunityDetailComponent } from './screens/community-detail/community-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'inicio',
        canActivate: [authGuard],
        component: DashboardMainComponent,
      },
      {
        path: 'usuarios',
        canActivate: [authGuard],
        component: UsersComponent,
      },
      {
        path: 'comunidades',
        canActivate: [authGuard],
        component: CommunitiesComponent,
      },
      {
        path: 'comunidad/:id',
        canActivate: [authGuard],
        component: CommunityDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
