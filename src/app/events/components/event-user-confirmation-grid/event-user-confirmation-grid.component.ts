import { Component, Input } from '@angular/core';
import { IUserAssistanceConfirmation } from '../../interfaces/event-assistance-confirmation.interface';

@Component({
  selector: 'app-event-user-confirmation-grid',
  templateUrl: './event-user-confirmation-grid.component.html',
  styleUrls: ['./event-user-confirmation-grid.component.css'],
})
export class EventUserConfirmationGridComponent {
  @Input() usersEventAssistanceConfirmation:
    | IUserAssistanceConfirmation[]
    | undefined;
}
