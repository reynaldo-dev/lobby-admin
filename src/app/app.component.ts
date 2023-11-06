import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

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
