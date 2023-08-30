import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './screens/users/users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

@NgModule({
  declarations: [UsersComponent, CreateUserComponent, UpdateUserComponent],
  imports: [CommonModule, PrimeNgModule, FormsModule, ReactiveFormsModule],
  exports: [UsersComponent, CreateUserComponent, UpdateUserComponent],
})
export class UsersModule {}
