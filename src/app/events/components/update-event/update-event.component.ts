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
  public isModalUpdateOpen = false;
  public updateEventForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    isPrivate: ['', Validators.required],
    place: ['', Validators.required],
    // dateTime: ['', Validators.required],
    communityId: ['', Validators.required],
    eventCategoryId: ['', Validators.required],
    score: [0, Validators.required],
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
      this.selectedEventId = event?.id;
      this.updateEventForm.patchValue({
        title: event?.title,
        description: event?.description,
        status: event?.status,
        isPrivate: event?.isPrivate,
        place: event?.place,
        // dateTime: new Date(event?.dateTime).toDateString(),
        communityId: event?.communityId,
        eventCategoryId: event?.eventCategoryId,
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
  }

  formatDate(date: string) {
    const [datePart, timePart] = date.split(', ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute] = timePart.split(':');
    const formatDate = new Date(`${month}/${day}/${year} ${hour}:${minute}`);
    return formatDate;
  }
}
