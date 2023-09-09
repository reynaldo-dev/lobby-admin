import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-unauthorized-screen',
  templateUrl: './unauthorized-screen.component.html',
  styleUrls: ['./unauthorized-screen.component.css'],
})
export class UnauthorizedScreenComponent {
  constructor(private router: Router, private authService: AuthService) {}

  goToHome() {
    this.router.navigate(['/dashboard/inicio']);
  }

  goToLogin() {
    this.authService.logout();
  }
}
