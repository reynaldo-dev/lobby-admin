import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { CarouselModule } from 'primeng/carousel';

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
    DividerModule,
    CardModule,
    TooltipModule,
    ChipModule,
    DataViewModule,
    CarouselModule,
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    InputSwitchModule,
    PasswordModule,
    ToastModule,
    MessagesModule,
    SidebarModule,
    DividerModule,
    CardModule,
    TooltipModule,
    ChipModule,
    DataViewModule,
    CarouselModule,
  ],
})
export class PrimeNgModule {}
