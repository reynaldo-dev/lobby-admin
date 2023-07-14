import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent {
  email: string = '';
  password: string = '';

  login() {
    // Aquí va tu lógica de inicio de sesión
    console.log(this.email, this.password);
  }
}
