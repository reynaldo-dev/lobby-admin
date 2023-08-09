import { Component, effect } from '@angular/core';
import { EventsService } from '../../services/events.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IEvent } from '../../interfaces/event.interface';
import { MessageService } from 'primeng/api';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { EventsCategoryService } from 'src/app/events-category/services/events-category.service';
import { DropdownChangeEvent } from 'primeng/dropdown';

interface IEventForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  status: FormControl<string | null>;
  isPrivate: FormControl<string | null>;
  dateTime: FormControl<string | null>;
  communityId: FormControl<string | null>;
  eventCategoryId: FormControl<string | null>;
  score: FormControl<number | null>;
  place?: FormControl<string | null>;
  link?: FormControl<string | null>;
}

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
    status: ['', Validators.required],
    isPrivate: ['', Validators.required],
    dateTime: ['', Validators.required],
    communityId: ['', Validators.required],
    eventCategoryId: ['', Validators.required],
    score: ['', Validators.required],
    place: ['', Validators.required],
    link: ['', Validators.required],
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

  public changeCreateEventForm = (event: DropdownChangeEvent) => {
    const { value } = event;
    const category = this.eventCategories.find(
      (category) => category.id === value
    );

    if (category.name === 'Presencial') {
      this.createEventForm.get('link')?.disable();
      this.createEventForm.get('place')?.enable();

      return;
    }

    if (category.name === 'Virtual') {
      this.createEventForm.get('place')?.disable();
      this.createEventForm.get('link')?.enable();
      return;
    }
  };

  createEvent() {
    const isPrivate =
      this.createEventForm.get('isPrivate')?.value?.toString() === 'true'
        ? 'Si'
        : 'No';
    this.createEventForm.patchValue({ isPrivate });

    this.eventsService.createEvent(this.createEventForm.value).subscribe({
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
