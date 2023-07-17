import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardMainComponent } from './screens/dashboard-main/dashboard-main.component';
import { UsersComponent } from './screens/users/users.component';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'inicio',
        component: DashboardMainComponent,
        canActivate: [authGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
