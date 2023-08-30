import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { EventStatus } from '../../event-status/event-status.enum';
import { PdfMakerService } from 'src/app/common/services/pdf-maker.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  private eventId!: string;
  public eventStatuses = {
    ACTIVE: EventStatus.ACTIVE,
    INACTIVE: EventStatus.INACTIVE,
  };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private pdfMakerService: PdfMakerService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id')!;
      this.eventService.getEventById(this.eventId).subscribe();
      this.eventService.getAssistanceConfirmation(this.eventId).subscribe();
    });
  }

  get event() {
    return this.eventService.event;
  }

  get eventAssistanceConfirmation() {
    return this.eventService.eventAssistanceConfirmation;
  }

  generateReport() {
    this.pdfMakerService.generatePdf(this.eventId);
  }
}
