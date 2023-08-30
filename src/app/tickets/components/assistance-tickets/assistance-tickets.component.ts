import { Component } from '@angular/core';
import { IAssistanceData } from '../../interfaces/assistance.interface';
import { AssistanceTicketsService } from '../../services/assistance-tickets.service';
import { PdfMakerService } from 'src/app/common/services/pdf-maker.service';

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
  public filterTicketState = '';
  public filterTicketWasPresent = '';

  public filterStateOption = [
    {
      name: 'Activo',
      value: true,
    },
    {
      name: 'Inactivo',
      value: false,
    },
  ];

  public filterWasPresentOption = [
    {
      name: 'Si',
      value: true,
    },
    {
      name: 'No',
      value: false,
    },
  ];

  constructor(
    private assistanceTicketsService: AssistanceTicketsService,
    private pdfMakerService: PdfMakerService
  ) {}

  ngOnInit(): void {
    this.assistanceTicketsService.tickets$.subscribe(
      (tickets: IAssistanceData[]) => {
        this.tickets = tickets;
      }
    );

    this.assistanceTicketsService.isDialogOpen.subscribe(
      (isVisible: boolean) => {
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
