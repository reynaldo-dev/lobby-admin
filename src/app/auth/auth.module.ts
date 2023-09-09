import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginScreenComponent } from './screen/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screen/register-screen/register-screen.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GoogleAuthButtonComponent } from './components/google-auth-button/google-auth-button.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginScreenComponent,
    RegisterScreenComponent,
    GoogleAuthButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AuthModule {}
