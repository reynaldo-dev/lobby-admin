import { Component } from '@angular/core';
import { IAssistanceData } from '../../interfaces/assistance.interface';
import { AssistanceTicketsService } from '../../services/assistance-tickets.service';

@Component({
  selector: 'app-assistance-tickets',
  templateUrl: './assistance-tickets.component.html',
  styleUrls: ['./assistance-tickets.component.css'],
})
export class AssistanceTicketsComponent {
  tickets: IAssistanceData[] = [];
  selectedTicket: IAssistanceData | null = null;
  isDialogOpen = false;
  public loading: boolean = false;
  public filter = '';

  constructor(private assistanceTicketsService: AssistanceTicketsService) {}

  ngOnInit(): void {
    this.assistanceTicketsService.tickets$.subscribe(
      (tickets: IAssistanceData[]) => {
        this.tickets = tickets;
      }
    );

    this.assistanceTicketsService.isDialogOpen.subscribe(
      (isVisible: boolean) => {
        console.log('Dialog should be:', isVisible);

        this.isDialogOpen = isVisible;
      }
    );
  }

  openDialog(ticket: IAssistanceData): void {
    this.selectedTicket = ticket;
    this.assistanceTicketsService.toggleDialogDetails(true);
  }

  closeDialog(): void {
    this.assistanceTicketsService.toggleDialogDetails(false);
  }
}
