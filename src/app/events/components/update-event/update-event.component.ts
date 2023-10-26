import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { IEvent } from '../../interfaces/event.interface';
import { EventsService } from '../../services/events.service';
import { EventsCategoryService } from 'src/app/events-category/services/events-category.service';
import { EventFormatService } from 'src/app/event-format/event-format.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
  providers: [MessageService],
})
export class UpdateEventComponent implements OnInit {
  public selectedEvent!: IEvent;
  public isModalUpdateOpen = false;
  public updateEventForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    isPrivate: ['', Validators.required],
    place: [''],
    link: [''],

    communityId: ['', Validators.required],
    eventCategoryId: ['', Validators.required],
    credits: [1, Validators.required],
  });
  public selectedEventId: string | undefined;
  public isLoading: boolean = false;

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private communityService: CommunityService,
    private messageService: MessageService,
    private eventsCategoryService: EventsCategoryService,
    private eventFormatService: EventFormatService
  ) {
    this.eventsService.isUpdateModalVisible.subscribe((modalStatus) => {
      this.isModalUpdateOpen = modalStatus;
    });

    this.eventsService.getSelectedEvent().subscribe((event) => {
      this.selectedEvent = event;
      this.selectedEventId = event?.id;

      if (event.link) {
        this.updateEventForm.get('place')?.setValidators([]);
        this.updateEventForm.get('link')?.setValidators([Validators.required]);
      }
      if (event.place) {
        this.updateEventForm.get('link')?.setValidators([]);
        this.updateEventForm.get('place')?.setValidators([Validators.required]);
      }

      this.updateEventForm.patchValue({
        title: event?.title,
        description: event?.description,
        isPrivate: event?.isPrivate,
        place: event?.place,
        link: event?.link,
        communityId: event?.communityId,
        credits: event?.credits,
        eventCategoryId: event?.eventCategoryId,
      });
    });
  }

  ngOnInit(): void {}

  get communities() {
    return this.communityService.communities;
  }

  get eventCategories() {
    return this.eventsCategoryService.eventCategories;
  }

  get eventFormats() {
    return this.eventFormatService.eventFormats;
  }

  closeModalUpdate() {
    this.eventsService.toggleUpdateModal();
  }

  updateEvent() {
    this.isLoading = true;
    const isPrivate =
      this.updateEventForm.get('isPrivate')?.value?.toString() === 'true'
        ? 'Si'
        : 'No';
    this.updateEventForm.patchValue({ isPrivate });

    if (this.updateEventForm.valid) {
      this.eventsService
        .updateEvent(
          this.updateEventForm.value as IEvent,
          this.selectedEventId as string
        )
        .subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Evento actualizado',
            });
            this.updateEventForm.reset();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: err });
          },
        });
      this.isLoading = false;
      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Por favor, complete todos los campos',
    });
    this.isLoading = false;
  }
}
