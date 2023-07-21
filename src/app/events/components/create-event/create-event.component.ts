import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IEvent } from '../../interfaces/event.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [MessageService],
})
export class CreateEventComponent {
  public isModalCreateVisible = false;
  public createEventForm = this.fb.group({
    title: ['Evento numero 4', Validators.required],
    description: ['Descripcion del evento 4', Validators.required],
    status: ['active', Validators.required],
    isPrivate: ['false'],
    place: ['Santa Ana', Validators.required],
    date: ['2023-12-08', Validators.required],
    time: ['12:00', Validators.required],
    communityId: ['6854714e-e50c-402a-8fc0-b3d5c9c72985', Validators.required],
  });

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.eventsService.modalCreateStatus.subscribe((modalStatus) => {
      this.isModalCreateVisible = modalStatus;
    });
  }

  createEvent() {
    this.eventsService
      .createEvent(this.createEventForm.value as IEvent)
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Evento creado',
          });
          this.createEventForm.reset();
        },

        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err });
        },
      });
  }

  closeModalCreate() {
    this.eventsService.toggleCreateModal();
  }
}
