import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    InputSwitchModule,
    PasswordModule,
  ],
  exports: [InputTextModule, ButtonModule, InputSwitchModule, PasswordModule],
})
export class PrimeNgModule {}
