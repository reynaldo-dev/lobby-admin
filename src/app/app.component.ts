import { Component, effect } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lobby-admin';
  public lastPath = localStorage.getItem('url') || '/dashboard/inicio';

  constructor(private authService: AuthService, private router: Router) {}

  public authStatusChangeEffect = effect(() => {
    switch (this.authService.authState?.isAuthenticated) {
      case true:
        this.router.navigate([this.lastPath]);
        break;
      case false:
        this.router.navigate(['auth/login']);
        break;

      default:
        break;
    }
  });
}
