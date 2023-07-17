import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
  providers: [MessageService],
})
export class LoginScreenComponent {
  email = new FormControl<string>('reynaldo@gmail.com');
  password = new FormControl<string>('12345678');

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  login() {
    this.authService.login(this.email.value, this.password.value).subscribe({
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
        });
      },
    });
  }
}
