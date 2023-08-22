import { Component, OnInit } from '@angular/core';
import { AssistanceTicketsService } from '../../services/assistance-tickets.service';
import { ConsumablesTicketsService } from '../../services/consumables-tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  constructor(
    private assiatanceTicketsService: AssistanceTicketsService,
    private consumableTicketsService: ConsumablesTicketsService
  ) {}
  ngOnInit(): void {
    this.assiatanceTicketsService.getAllTickets().subscribe();
    this.consumableTicketsService.getAllConsumables().subscribe();
  }
}
