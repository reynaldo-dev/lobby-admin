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
        canActivate: [authGuard],
        component: DashboardMainComponent,
      },
      {
        path: 'users',
        canActivate: [authGuard],
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
