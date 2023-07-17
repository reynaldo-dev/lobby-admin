import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MenuItem, MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) {
    this.items = [
      {
        label: 'Comunidad',
        icon: 'pi pi-users',
        command: () => {
          this.showDialog();
        },
      },
      {
        label: 'Evento',
        icon: 'pi pi-calendar-plus',
        command: () => {
          this.delete();
        },
      },
    ];
  }

  save(severity: string) {
    // this.messageService.add({
    //   severity: severity,
    //   summary: 'Success',
    //   detail: 'Data Saved',
    // });
  }

  update() {
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Success',
    //   detail: 'Data Updated',
    // });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  delete() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Deleted',
    });
  }

  ngOnInit(): void {
    this.dashboardService.getCommunities().subscribe();
  }

  onKey() {
    console.log(this.searchValue);
  }
}
