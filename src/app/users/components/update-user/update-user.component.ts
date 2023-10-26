import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserData } from '../../interfaces/user.interface';
import { IRole, UsersService } from '../../services/users.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IDepartment } from '../../interfaces/department.interface';
import { departments } from 'src/app/helpers/departments/departments.data';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [MessageService],
})
export class UpdateUserComponent {
  public isModalUpdateOpen = false;
  public departaments: IDepartment[] = departments;
  public isLoading = false;

  public updateUserForm = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    rolId: ['', Validators.required],
    department: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    workplace: ['', Validators.required],
  });

  public roles: IRole[] = [];

  public selectedUserId: string | undefined;
  private subscription: Subscription = new Subscription();

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.usersService.isModalUpdateVisible.subscribe((modalStatus) => {
      this.isModalUpdateOpen = modalStatus;
    });
    this.getRoles();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.usersService.selectedUser.subscribe((user: UserData | null) => {
        if (user) {
          this.updateUserForm.patchValue({
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            rolId: user.rolId,
            department: user.department,
            city: user.city,
            phone: user.phone,
            workplace: user.workplace,
          });
          this.selectedUserId = user.id;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRoles(): void {
    this.usersService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  closeModalUpdate() {
    this.usersService.toggleUpdateModal(false);
  }

  updateUser() {
    this.isLoading = true;
    if (this.updateUserForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'No debe haber campos vacios',
      });
      return;
    }
    this.usersService
      .updateUser(
        this.updateUserForm.value as UserData,
        this.selectedUserId as string
      )
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Usuario actualizado',
          });
          this.updateUserForm.reset();
          this.closeModalUpdate();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err });
        },
      });
    this.isLoading = false;
  }
}
