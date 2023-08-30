import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css'],
})
export class ProfileScreenComponent implements OnInit {
  public isModalUpdateProfileVisible = false;
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.authService.getProfile(this.user.id).subscribe();
    this.userService.isModalUpdateProfileVisible.subscribe(
      (isVisible: boolean) => {
        this.isModalUpdateProfileVisible = isVisible;
      }
    );
  }

  get user() {
    return this.authService.user;
  }

  get profile() {
    return this.authService.profile;
  }

  updateProfile() {
    this.userService.toggleUpdateProfileModal(true);
  }

  closeModalUpdateProfile() {
    this.userService.toggleUpdateProfileModal(false);
  }
}
