import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  @Input()
  isVisible: boolean = false;

  public routes = [
    {
      name: 'Inicio',
      icon: 'pi pi-home mr-4',
      path: '/dashboard/inicio',
    },
    {
      name: 'Usuarios',
      icon: 'pi pi-user mr-4',
      path: '/dashboard/usuarios',
    },
    {
      name: 'Eventos',
      icon: 'pi pi-calendar-plus mr-4',
      path: '/dashboard/eventos',
    },
    {
      name: 'Comunidades',
      icon: 'pi pi-users mr-4',
      path: '/dashboard/comunidades',
    },
    {
      name: 'Reconocimientos',
      icon: 'pi pi-star mr-4',
      path: '/auth/login',
    },
    {
      name: 'Cupones',
      icon: 'pi pi-ticket mr-4',
      path: '/dashboard/cupones',
    },
  ];

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  handleToggleMenu() {
    this.dashboardService.handleToggleMenu();
  }

  logout() {
    this.authService.logout();
  }
}
