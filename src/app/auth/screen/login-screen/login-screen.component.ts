import { Component } from '@angular/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent {
  constructor() {}

  login(e: Event) {
    e.preventDefault();
    console.log('login');
  }
}
