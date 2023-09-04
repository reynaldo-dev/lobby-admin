import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { EventsCategoryService } from 'src/app/events-category/services/events-category.service';
import { ICreateConsumable } from '../../interfaces/create-consumable.interface';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [MessageService],
})
export class CreateEventComponent implements OnInit {
  public activeIndexTab: number = 0;
  public isDisabledEventTab: boolean = false;
  public isDisabledConsumableTab: boolean = true;
  public createdEventId!: string;
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

  public consumableForm = this.fb.group({
    consumables: this.fb.array([this.fb.control('', [Validators.required])]),
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
  ngOnInit(): void {
    this.eventsCategoryService.getEventCategories().subscribe();
  }

  get communities() {
    return this.communityService.communities;
  }

  get eventCategories() {
    return this.eventsCategoryService.eventCategories;
  }

  get consumablesControls() {
    return this.consumableForm.get('consumables') as FormArray;
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
        next: (res: any) => {
          this.createdEventId = res.data.id;
          this.isDisabledEventTab = true;
          this.isDisabledConsumableTab = false;
          this.activeIndexTab = 1;
          this.createEventForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Evento creado',
          });
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

  createConsumables() {
    this.isLoading = true;
    const payload: ICreateConsumable = {
      eventId: this.createdEventId,
      consumables: this.consumableForm.value.consumables as string[],
    };

    if (this.consumableForm.valid) {
      this.eventsService.createConsumablesForEvent(payload).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Consumibles creados',
          });
        },

        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err });
        },
      });
      this.consumableForm.reset();
    }
    this.isLoading = false;

    this.messageService.add({
      severity: 'error',
      summary: 'Formulario invalido, verifica que ningun campo quede vacío',
    });
  }

  closeModalCreate() {
    this.eventsService.toggleCreateModal();
  }

  removeConsumable(i: number) {
    this.consumablesControls.removeAt(i);
  }
  addConsumable() {
    this.consumablesControls.push(this.fb.control('', [Validators.required]));
  }
}
