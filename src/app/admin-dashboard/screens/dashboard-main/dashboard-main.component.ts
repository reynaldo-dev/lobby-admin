import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MenuItem, MessageService } from 'primeng/api';
import { CommunityService } from 'src/app/community-module/services/community.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
  providers: [MessageService],
})
export class DashboardMainComponent implements OnInit {
  searchValue: string | undefined;
  nameValue: string | undefined;
  descriptionValue: string | undefined;
  items: MenuItem[] | [] = [];
  visible: boolean = false;
  color: string = '#ffffff';

  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,
    private communityService: CommunityService
  ) {
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
      },
    ];
  }

  ngOnInit(): void {
    this.communityService.getCommunities().subscribe();
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
