import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './screens/users/users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ComponentsModule } from '../components/components.module';
import { UserComponent } from './screens/user/user.component';

@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  exports: [
    UsersComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserComponent,
  ],
})
export class UsersModule {}
