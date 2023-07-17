import { Component, OnInit } from '@angular/core';
import { ICommunities } from '../../interfaces/communities.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent implements OnInit {
  value: string | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getCommunities().subscribe();
  }

  onKey() {
    console.log(this.value);
  }
}
