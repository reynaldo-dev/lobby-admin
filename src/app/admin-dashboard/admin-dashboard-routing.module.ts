import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';
import { AllowedRoles } from '../auth/roles/AllowedRoles';
import { CommunitiesPageComponent } from '../community-module/screens/communities-page/communities-page.component';
import { CommunityComponent } from '../community-module/screens/community/community.component';
import { EventComponent } from '../events/screens/event/event.component';
import { EventsComponent } from '../events/screens/events/events.component';
import { TicketsComponent } from '../tickets/screens/tickets/tickets.component';
import { UsersComponent } from '../users/screens/users/users.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardMainComponent } from './screens/dashboard-main/dashboard-main.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'inicio',
        canActivate: [authGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN, AllowedRoles.SPONSOR],
        },

        component: DashboardMainComponent,
      },
      {
        path: 'usuarios',
        canActivate: [authGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: UsersComponent,
      },
      {
        path: 'comunidades',
        canActivate: [authGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: CommunitiesPageComponent,
      },
      {
        path: 'comunidad/:id',
        canActivate: [authGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: CommunityComponent,
      },

      {
        path: 'eventos',
        canActivate: [authGuard],
        data: {
          expectedRole: [AllowedRoles.SPONSOR, AllowedRoles.ADMIN],
        },
        component: EventsComponent,
      },
      {
        path: 'eventos/:id',
        canActivate: [authGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: EventComponent,
      },
      {
        path: 'cupones',
        canActivate: [authGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: TicketsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
