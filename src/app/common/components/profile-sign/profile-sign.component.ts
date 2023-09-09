import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-sign',
  templateUrl: './profile-sign.component.html',
  styleUrls: ['./profile-sign.component.css'],
})
export class ProfileSignComponent {
  @Input() name!: string;
  @Input() lastname!: string;
  @Input() email!: string;
  @Input() role!: string;
  @Input() padding = 0;
  @Input() picture!: string | null;

  get userInitials(): string {
    return this.name[0].toUpperCase() + this.lastname[0].toUpperCase();
  }
}
