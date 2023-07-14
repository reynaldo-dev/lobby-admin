import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        items: [
          { label: 'New', icon: 'pi pi-plus', url: 'https://primeng.org' },
          { label: 'Open', icon: 'pi pi-download', routerLink: ['/menu'] },
          {
            label: 'Recent Files',
            icon: 'pi pi-download',
            routerLink: ['/pagename'],
            queryParams: { recent: 'true' },
          },
        ],
      },
    ];
  }
}
