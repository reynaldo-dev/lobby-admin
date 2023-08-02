import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IEvent } from '../../interfaces/event.interface';
import { MessageService } from 'primeng/api';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { EventsCategoryService } from 'src/app/events-category/services/events-category.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [MessageService],
})
export class CreateEventComponent {
  public isModalCreateVisible = false;
  public createEventForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['Activo'],
    isPrivate: ['No'],
    place: ['Santa Ana', Validators.required],
    dateTime: ['', Validators.required],
    communityId: ['', Validators.required],
    eventCategoryId: ['', Validators.required],
    score: [0, Validators.required],
  });

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private communityService: CommunityService,
    private eventsCategoryService: EventsCategoryService
  ) {
    this.eventsService.modalCreateStatus.subscribe((modalStatus) => {
      this.isModalCreateVisible = modalStatus;
    });
  }

  get communities() {
    return this.communityService.communities;
  }

  get eventCategories() {
    return this.eventsCategoryService.eventCategories;
  }

  createEvent() {
    const isPrivate =
      this.createEventForm.get('isPrivate')?.value?.toString() === 'true'
        ? 'Si'
        : 'No';
    this.createEventForm.patchValue({ isPrivate });

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
