import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    InputSwitchModule,
    PasswordModule,
    ToastModule,
    MessagesModule,
    SidebarModule,
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    InputSwitchModule,
    PasswordModule,
    ToastModule,
    MessagesModule,
    SidebarModule,
  ],
})
export class PrimeNgModule {}
