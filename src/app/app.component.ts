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

  // constructor(private authService: AuthService, private router: Router) {}
  // ngOnInit(): void {
  //   console.log('AppComponent');
  // }

  // public authStatusChangeEffect = effect(() => {
  //   console.log('authStatusChangeEffect');
  //   console.log(this.authService.authState);
  //   switch (this.authService.authState?.isAuthenticated) {
  //     case true:
  //       this.router.navigate(['dashboard/inicio']);
  //       break;
  //     case false:
  //       this.router.navigate(['auth/login']);
  //       break;

  //     default:
  //       break;
  //   }
  // });
}
