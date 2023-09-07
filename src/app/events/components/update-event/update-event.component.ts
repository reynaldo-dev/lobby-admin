import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { IEvent } from '../../interfaces/event.interface';
import { EventsService } from '../../services/events.service';
import { EventsCategoryService } from 'src/app/events-category/services/events-category.service';

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
    // dateTime: ['', Validators.required],
    communityId: ['', Validators.required],
    score: [1, Validators.required],
  });
  public selectedEventId: string | undefined;

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private communityService: CommunityService,
    private messageService: MessageService,
    private eventsCategoryService: EventsCategoryService
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
        score: event?.score,
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

  closeModalUpdate() {
    this.eventsService.toggleUpdateModal();
  }

  updateEvent() {
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
      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Por favor, complete todos los campos',
    });
  }

  formatDate(date: string) {
    const [datePart, timePart] = date.split(', ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute] = timePart.split(':');
    const formatDate = new Date(`${month}/${day}/${year} ${hour}:${minute}`);
    return formatDate;
  }
}
