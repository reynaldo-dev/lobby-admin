import { Component, OnInit } from '@angular/core';
import { UserData } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserData[] = [];
  selectedUser: UserData | null = null;
  isModalCreateVisible = false;
  isModalUpdateVisible = false;
  public loading: boolean = false;
  public filter = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.users$.subscribe((users: UserData[]) => {
      this.users = users;
    });

    this.usersService.isModalCreateVisible.subscribe((isVisible: boolean) => {
      this.isModalCreateVisible = isVisible;
    });

    this.usersService.isModalUpdateVisible.subscribe((isVisible: boolean) => {
      this.isModalUpdateVisible = isVisible;
    });
  }

  // getUser(id: string): void {
  //   this.usersService.getUser(id).subscribe((user: UserData | null) => {
  //     this.selectedUser = user;
  //   });
  // }

  openCreateModal(): void {
    this.usersService.toggleCreateModal(true);
  }

  openUpdateModal(user: UserData): void {
    this.selectedUser = user;
    this.usersService.setSelectedUser(user);
    this.usersService.toggleUpdateModal(true);
  }
}
