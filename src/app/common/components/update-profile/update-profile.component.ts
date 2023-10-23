import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { departments } from 'src/app/helpers/departments/departments.data';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  providers: [MessageService],
})
export class UpdateProfileComponent implements OnInit {
  public isModalUpdateProfileVisible = false;
  public updateProfileForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.required],
    department: ['', Validators.required],
    city: ['', Validators.required],
    workplace: ['', Validators.required],
  });
  public departmentsOptions = departments;
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile(this.user.id).subscribe({
      next: (profile) => {
        this.updateProfileForm.patchValue({
          name: profile.name,
          lastname: profile.lastname,
          phone: profile.phone,
          department: profile.department,
          city: profile.city,
          workplace: profile.workplace,
        });
      },
    });
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

  closeModalUpdateProfile() {
    this.userService.toggleUpdateProfileModal(false);
  }

  updateProfile() {
    if (this.updateProfileForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No debe haber campos vacíos',
      });
      return;
    }

    const { name, lastname, phone, department, city, workplace } =
      this.updateProfileForm.value;

    this.userService
      .updateUser(
        {
          name,
          lastname,
          phone,
          department,
          city,
          workplace,
        },
        this.user.id
      )
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Perfil actualizado correctamente',
          });
          this.userService.toggleUpdateProfileModal(false);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'Algo salió mal, intente de nuevo',
          });
        }
      );
  }
}
