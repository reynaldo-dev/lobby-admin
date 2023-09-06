import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/common.module';
import { ComponentsModule } from '../components/components.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventUserConfirmationGridComponent } from './components/event-user-confirmation-grid/event-user-confirmation-grid.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventComponent } from './screens/event/event.component';
import { EventsComponent } from './screens/events/events.component';
import { QRCodeModule } from 'angularx-qrcode';

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
    QRCodeModule,
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
