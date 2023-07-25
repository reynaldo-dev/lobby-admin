import { Component, OnInit, effect } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lobby-admin';
  public lastPath = localStorage.getItem('url') || '/dashboard/inicio';

  constructor(
    private authService: AuthService,
    private router: Router,
    private config: PrimeNGConfig,
    private translateService: TranslateService
  ) {}
  // ngOnInit() {
  //   this.translateService.use('es');
  //   this.translateService
  //     .get('primeng')
  //     .subscribe((res) => this.config.setTranslation(res));
  // }

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
