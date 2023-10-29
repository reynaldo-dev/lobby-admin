import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent {
  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  get isVisible(): boolean {
    return this.dashboardService.isOpen;
  }

  handleToggleMenu() {
    this.dashboardService.handleToggleMenu();
  }

  logout() {
    this.authService.logout();
  }
  get user() {
    return this.authService.user;
  }
}
