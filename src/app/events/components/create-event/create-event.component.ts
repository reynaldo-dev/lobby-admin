import { Component, OnInit, effect } from '@angular/core';
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
export class CreateEventComponent implements OnInit {
  public isVirtual = false;
  public isModalCreateVisible = false;
  public createEventForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    isPrivate: [''],
    dateTime: ['', Validators.required],
    communityId: ['', Validators.required],
    eventCategoryId: ['', Validators.required],
    score: ['', Validators.required],
    place: [''],
    link: [''],
  });

  public isLoading: boolean = false;

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
  ngOnInit(): void {
    this.eventsCategoryService.getEventCategories().subscribe();
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
      this.createEventForm.get('link')?.reset();
      this.createEventForm.get('link')?.clearValidators();
      this.createEventForm.get('link')?.updateValueAndValidity();
      this.createEventForm.get('place')?.setValidators(Validators.required);
      this.createEventForm.get('place')?.updateValueAndValidity();
      this.isVirtual = false;
      return;
    }

    if (category.name === 'Virtual') {
      this.createEventForm.get('place')?.reset();
      this.createEventForm.get('place')?.clearValidators();
      this.createEventForm.get('place')?.updateValueAndValidity();
      this.createEventForm.get('link')?.setValidators(Validators.required);
      this.createEventForm.get('link')?.updateValueAndValidity();
      this.isVirtual = true;
      return;
    }
  };

  createEvent() {
    this.isLoading = true;
    const isPrivate =
      this.createEventForm.get('isPrivate')?.value?.toString() === 'true'
        ? 'Si'
        : 'No';
    this.createEventForm.patchValue({ isPrivate });
    if (this.createEventForm.valid) {
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
      this.isLoading = false;
      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Formulario invalido, verifica que ningun campo quede vacío',
    });
    this.isLoading = false;
  }

  closeModalCreate() {
    this.eventsService.toggleCreateModal();
  }
}
