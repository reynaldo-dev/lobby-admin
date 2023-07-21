import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
})
export class UpdateEventComponent {
  public isModalUpdateOpen = false;
  constructor(private eventsService: EventsService) {
    this.eventsService.modalUpdateStatus.subscribe((modalStatus) => {
      this.isModalUpdateOpen = modalStatus;
    });
  }

  closeModalCreate() {
    this.eventsService.toggleUpdateModal();
  }
}
