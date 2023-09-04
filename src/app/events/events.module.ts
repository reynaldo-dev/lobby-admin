import { CommonModule } from '@angular/common';
import { EventComponent } from './screens/event/event.component';
import { EventsComponent } from './screens/events/events.component';
import { EventsRoutingModule } from './events-routing.module';
import { NgModule } from '@angular/core';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCardComponent } from './components/event-card/event-card.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { AdminDashboardModule } from '../admin-dashboard/admin-dashboard.module';
import { AppCommonModule } from '../common/common.module';
import { EventUserConfirmationGridComponent } from './components/event-user-confirmation-grid/event-user-confirmation-grid.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    EventsComponent,
    EventComponent,
    EventCardComponent,
    CreateEventComponent,
    UpdateEventComponent,
    EventUserConfirmationGridComponent,
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    EventsRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  exports: [
    EventsComponent,
    EventComponent,
    EventCardComponent,
    CreateEventComponent,
    UpdateEventComponent,
    EventCardComponent,
  ],
})
export class EventsModule {}
