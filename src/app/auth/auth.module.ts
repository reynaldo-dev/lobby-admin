import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginScreenComponent } from './screen/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screen/register-screen/register-screen.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginScreenComponent,
    RegisterScreenComponent
  ],
  imports: [CommonModule, AuthRoutingModule, PrimeNgModule],
})
export class AuthModule {}
