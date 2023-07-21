import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardMainComponent } from './screens/dashboard-main/dashboard-main.component';
import { UsersComponent } from './screens/users/users.component';
import { authGuard } from '../auth/guards/auth.guard';
import { CommunitiesPageComponent } from '../community-module/screens/communities-page/communities-page.component';
import { CommunityComponent } from '../community-module/screens/community/community.component';
import { EventsComponent } from '../events/screens/events/events.component';
import { EventComponent } from '../events/screens/event/event.component';

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
        component: CommunitiesPageComponent,
      },
      {
        path: 'comunidad/:id',
        canActivate: [authGuard],
        component: CommunityComponent,
      },

      {
        path: 'eventos',
        canActivate: [authGuard],
        component: EventsComponent,
      },
      {
        path: 'eventos/:id',
        canActivate: [authGuard],
        component: EventComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
