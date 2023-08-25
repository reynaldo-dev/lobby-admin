import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserData } from '../../interfaces/user.interface';
import { IRole, UsersService } from '../../services/users.service';
import { BehaviorSubject } from 'rxjs';
import { IDepartment } from '../../interfaces/department.interface';
import { departments } from 'src/app/helpers/departments/departments.data';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [MessageService],
})
export class CreateUserComponent {
  public isModalCreateVisible = false;

  public createUserForm = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required],
    department: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    rolId: ['', Validators.required],
  });

  public roles: IRole[] = [];
  public departaments: IDepartment[];

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.usersService.isModalCreateVisible.subscribe((modalStatus) => {
      this.isModalCreateVisible = modalStatus;
    });
    this.getRoles();
    this.departaments = departments;
  }

  getRoles(): void {
    this.usersService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  createUser() {
    this.usersService
      .createUser(this.createUserForm.value as UserData)
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Usuario creado',
          });
          this.createUserForm.reset();
          this.usersService.toggleCreateModal(false);
        },

        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err });
        },
      });
  }

  closeModalCreate() {
    this.usersService.toggleCreateModal(false);
  }
}
