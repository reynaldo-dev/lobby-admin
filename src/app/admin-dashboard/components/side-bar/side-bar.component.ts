import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { AllowedRoles } from 'src/app/auth/roles/AllowedRoles';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  @Input()
  isVisible: boolean = false;

  public routes = [
    {
      name: 'Eventos',
      icon: 'pi pi-calendar-plus mr-4',
      path: '/dashboard/eventos',
    },
  ];

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    if (this.authState.user.role === AllowedRoles.ADMIN) {
      this.routes = [
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
          name: 'Cupones',
          icon: 'pi pi-ticket mr-4',
          path: '/dashboard/cupones',
        },
        {
          name: 'Alianzas',
          icon: 'pi pi-th-large mr-4',
          path: '/dashboard/alianzas',
        },
      ];
    }

    if (this.authState.user.role === AllowedRoles.SPONSOR) {
      this.routes = [
        {
          name: 'Inicio',
          icon: 'pi pi-home mr-4',
          path: '/dashboard/inicio',
        },
        {
          name: 'Eventos',
          icon: 'pi pi-calendar-plus mr-4',
          path: '/dashboard/eventos',
        },
      ];
    }
  }

  get authState() {
    return this.authService.authState;
  }

  handleToggleMenu() {
    this.dashboardService.handleToggleMenu();
  }

  logout() {
    this.authService.logout();
  }
}
