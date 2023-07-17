import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { publicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [publicGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
