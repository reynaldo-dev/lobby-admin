import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css'],
})
export class ProfileScreenComponent {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  get user(): any {
    return this.authService.user;
  }
}
