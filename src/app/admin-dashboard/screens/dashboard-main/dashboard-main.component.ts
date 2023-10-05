import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AllowedRoles } from 'src/app/auth/roles/AllowedRoles';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommunityService } from 'src/app/community-module/services/community.service';
import { IEvent } from 'src/app/events/interfaces/event.interface';
import { EventsService } from 'src/app/events/services/events.service';
import { IGetRankingResponse } from 'src/app/leagues/interfaces/get-ranking-response.interface';
import { RankingService } from 'src/app/leagues/services/ranking.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent implements OnInit {
  public allowedRoles = AllowedRoles;

  public items: MenuItem[] | [] = [];

  public visible: boolean = false;

  constructor(
    private communityService: CommunityService,
    private authService: AuthService,
    private eventsService: EventsService,
    private rankingService: RankingService
  ) {
    this.eventsService.modalCreateStatus.subscribe();
  }

  get user() {
    return this.authService.user;
  }

  get events(): IEvent[] | null {
    return this.eventsService.events;
  }

  get eventsAtDate(): IEvent[] | null {
    return this.eventsService.eventsAtDate;
  }

  get activeEventsCount(): number | null {
    return this.eventsService.activeEvents;
  }

  get inactiveEventsCount(): number | null {
    return this.eventsService.inactiveEvents;
  }

  get userRole(): string {
    return this.authService.authState.user.role;
  }

  get ranking(): IGetRankingResponse[] | null {
    return this.rankingService.ranking;
  }

  ngOnInit(): void {
    this.eventsService.getInActiveEventsCount().subscribe();
    this.eventsService.getActiveEventsCount().subscribe();
    this.eventsService.getEvents().subscribe();
    this.eventsService.getEventsAtDate(new Date().toISOString()).subscribe();
    this.rankingService.getCurrentGlobalRanking().subscribe();

    if (this.authService.authState.user.role === AllowedRoles.SPONSOR) {
      this.items = [
        {
          label: 'Evento',
          icon: 'pi pi-calendar-plus',
          command: () => {
            this.createEvent();
          },
        },
      ];
    }

    if (this.authService.authState.user.role === AllowedRoles.ADMIN) {
      this.communityService.getCommunities().subscribe();
      this.items = [
        {
          label: 'Comunidad',
          icon: 'pi pi-users',
          command: () => {
            this.toggleDialog(true);
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
    }
  }

  createEvent() {
    this.eventsService.toggleCreateModal();
  }

  toggleDialog(value: boolean) {
    this.communityService.toggleModalCreateCommunity(value);
  }
}
