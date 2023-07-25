import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { IEvent } from '../../interfaces/event.interface';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
  providers: [MessageService],
})
export class UpdateEventComponent {
  public isModalUpdateOpen = false;
  public updateEventForm: any;
  public selectedEventId: string | undefined;

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private communityService: CommunityService,
    private messageService: MessageService
  ) {
    this.eventsService.isUpdateModalVisible.subscribe((modalStatus) => {
      this.isModalUpdateOpen = modalStatus;
    });

    this.eventsService.getSelectedEvent().subscribe((event) => {
      this.selectedEventId = event?.id;
      this.updateEventForm = this.fb.group({
        title: [event?.title, Validators.required],
        description: [event?.description, Validators.required],
        status: [event?.status, Validators.required],
        isPrivate: [
          event?.isPrivate === 'Si' ? true : false,
          Validators.required,
        ],
        place: [event?.place, Validators.required],
        dateTime: [new Date()],
        communityId: [event?.communityId, Validators.required],
      });
    });
  }

  get communities() {
    return this.communityService.communities;
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

    this.updateEventForm.patchValue({
      dateTime: new Date(
        this.updateEventForm.get('dateTime')?.value as string
      ).toLocaleString(),
    });
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
}
