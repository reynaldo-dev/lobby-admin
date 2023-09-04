import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TicketsComponent } from './screens/tickets/tickets.component';
import { AssistanceTicketsComponent } from './components/assistance-tickets/assistance-tickets.component';
import { ConsumablesTicketsComponent } from './components/consumables-tickets/consumables-tickets.component';
import { AppCommonModule } from '../common/common.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    TicketsComponent,
    AssistanceTicketsComponent,
    ConsumablesTicketsComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    ComponentsModule,
  ],
  exports: [TicketsComponent],
})
export class TicketsModule {}
