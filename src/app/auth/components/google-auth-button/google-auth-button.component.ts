import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-google-auth-button',
  templateUrl: './google-auth-button.component.html',
  styleUrls: ['./google-auth-button.component.css'],
  providers: [MessageService],
})
export class GoogleAuthButtonComponent {
  constructor() {}
}
