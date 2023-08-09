import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { EventsCategoryService } from 'src/app/events-category/services/events-category.service';
import { IEvent } from 'src/app/events/interfaces/event.interface';
import { EventsService } from 'src/app/events/services/events.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
  providers: [MessageService],
})
export class DashboardMainComponent implements OnInit {
  public searchValue: string | undefined;
  public nameValue: string | undefined;
  public descriptionValue: string | undefined;
  public items: MenuItem[] | [] = [];
  public visible: boolean = false;
  public color: string = '#ffffff';

  constructor(
    private messageService: MessageService,
    private communityService: CommunityService,
    private authService: AuthService,
    private eventsService: EventsService
  ) {
    this.eventsService.modalCreateStatus.subscribe();
  }

  get user() {
    return this.authService.user;
  }

  get events(): IEvent[] {
    return this.eventsService.events;
  }

  get eventsAtDate(): IEvent[] {
    return this.eventsService.eventsAtDate;
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Comunidad',
        icon: 'pi pi-users',
        command: () => {
          this.toggleDialog();
        },
      },
      {
        label: 'Evento',
        icon: 'pi pi-calendar-plus',
        command: () => {
          this.createEvent();
        },
      },
    ];
    this.communityService.getCommunities().subscribe();
  }

  createEvent() {
    this.eventsService.toggleCreateModal();
  }

  saveCommunity() {
    const payload = {
      name: this.nameValue,
      description: this.descriptionValue,
      color: this.color,
    };

    this.communityService.createCommunity(payload).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Comunidad agregada correctamente',
        });
        this.clearText();
        this.toggleDialog();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
        });
      },
    });
  }

  clearText() {
    this.nameValue = '';
    this.descriptionValue = '';
    this.color = '#ffffff';
  }

  toggleDialog() {
    this.visible = !this.visible;
  }

  onKey() {}
}
