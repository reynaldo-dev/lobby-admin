import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginScreenComponent } from './screen/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screen/register-screen/register-screen.component';
import { publicGuard } from './guards/public.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginScreenComponent,
        canActivate: [publicGuard],
      },
      {
        path: 'register',
        component: RegisterScreenComponent,
        canActivate: [publicGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
