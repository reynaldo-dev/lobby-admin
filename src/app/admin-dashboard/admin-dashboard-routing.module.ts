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
import { roleGuard } from '../auth/guards/role-guard.guard';
import { ProfileScreenComponent } from '../common/screens/profile-screen/profile-screen.component';
import { AlliancesComponent } from '../alliance/screen/alliances/alliances.component';
import { AllianceComponent } from '../alliance/screen/alliance/alliance.component';
import { RedeemablesScreenComponent } from '../redeemables/screens/redeemables-screen/redeemables-screen.component';
import { UserComponent } from '../users/screens/user/user.component';
import { ChallengesScreenComponent } from '../challenges/screens/challenges-screen/challenges-screen.component';
import { RedeemsHistoryComponent } from '../redeemables/screens/redeems-history/redeems-history.component';

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
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: UsersComponent,
      },
      {
        path: 'usuarios/:id',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: UserComponent,
      },
      {
        path: 'comunidades',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: CommunitiesPageComponent,
      },
      {
        path: 'comunidad/:id',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: CommunityComponent,
      },

      {
        path: 'eventos',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.SPONSOR, AllowedRoles.ADMIN],
        },
        component: EventsComponent,
      },
      {
        path: 'eventos/:id',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN, AllowedRoles.SPONSOR],
        },
        component: EventComponent,
      },
      {
        path: 'retos',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.SPONSOR, AllowedRoles.ADMIN],
        },
        component: ChallengesScreenComponent,
      },
      {
        path: 'cupones',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: TicketsComponent,
      },

      {
        path: 'alianzas',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: AlliancesComponent,
      },

      {
        path: 'alianzas/:id',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: AllianceComponent,
      },
      {
        path: 'canjeables',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: RedeemablesScreenComponent,
      },

      {
        path: 'perfil',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN, AllowedRoles.SPONSOR],
        },
        component: ProfileScreenComponent,
      },
      {
        path: 'canjes',
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: [AllowedRoles.ADMIN],
        },
        component: RedeemsHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
