import { Component, OnInit, effect } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from './users/services/users.service';
import { CommunityService } from './community-module/services/community.service';
import { EventsService } from './events/services/events.service';
import { EventsCategoryService } from './events-category/services/events-category.service';
import { AssistanceTicketsService } from './tickets/services/assistance-tickets.service';
import { ConsumablesTicketsService } from './tickets/services/consumables-tickets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'lobby-admin';
  public lastPath = localStorage.getItem('url') || '/dashboard/inicio';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.whoAmI().subscribe();
  }

  // public authStatusChangeEffect = effect(() => {
  //   switch (this.authService.authState?.isAuthenticated) {
  //     case true:
  //       this.router.navigate([this.lastPath]);
  //       break;
  //     case false:
  //       this.authService.logout();
  //       break;

  //     default:
  //       break;
  //   }
  // });
}
