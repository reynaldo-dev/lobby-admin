import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IEvent } from '../../interfaces/event.interface';
import { MessageService } from 'primeng/api';
import { CommunityService } from 'src/app/community-module/services/community.service';

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
    status: ['Activo'],
    isPrivate: ['No'],
    place: ['Santa Ana', Validators.required],
    dateTime: ['', Validators.required],
    communityId: [''],
  });

  get communities() {
    return this.communityService.communities;
  }

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private communityService: CommunityService
  ) {
    this.eventsService.modalCreateStatus.subscribe((modalStatus) => {
      this.isModalCreateVisible = modalStatus;
    });
  }

  createEvent() {
    const isPrivate =
      this.createEventForm.get('isPrivate')?.value?.toString() === 'true'
        ? 'Si'
        : 'No';
    this.createEventForm.patchValue({ isPrivate });

    this.createEventForm.patchValue({
      dateTime: new Date(
        this.createEventForm.get('dateTime')?.value as string
      ).toLocaleString(),
    });

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
