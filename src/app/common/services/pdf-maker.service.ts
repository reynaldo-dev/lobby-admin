import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable, tap } from 'rxjs';
import {
  IAssistanceTicket,
  IConsumable,
  IConsumablesTicket,
  IEvent,
  IEventReportResponse,
} from '../interfaces/report-response.interface';
import { environment } from 'src/environments/environment';
import { getFormattedDate } from 'src/app/helpers/departments/get-formatted-date/getFormattedDate';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfMakerService {
  private headers!: HttpHeaders;
  private _data!: IEventReportResponse;
  private apiURL = `${environment.apiUrl}/events`;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  getReportData(eventId: string): Observable<IEventReportResponse> {
    return this.http
      .get<IEventReportResponse>(`${this.apiURL}/event-report/${eventId}`, {
        headers: this.headers,
      })
      .pipe(
        tap((data) => {
          console.log(data);
          this._data = data;
        })
      );
  }

  generatePdf(eventId: string) {
    this.getReportData(eventId).subscribe(() => {
      const documentDefinition = {
        pageOrientation: 'landscape',
        header: {
          text: `Reporte del Evento: ${this._data.event.title}`,
          style: 'title',
        },
        content: [
          { text: 'Evento', style: 'header' },
          this.createTableFromEvent(this._data?.event),
          { text: 'Consumibles', style: 'header' },
          this.createTableFromConsumables(this._data.consumables, [
            'No.',
            'ID',
            'Nombre',
          ]),
          { text: 'Tickets de Asistencia', style: 'header' },
          this.createTableFromAssistanceTickets(this._data?.assistanceTickets, [
            'No.',
            'ID',
            'Activo',
            'Presente',
            'Escaneado en',
            'Usuario',
          ]),
          { text: 'Tickets de Consumibles', style: 'header' },
          this.createTableFromConsumablesTickets(
            this._data?.consumablesTickets,
            ['No.', 'ID', 'Activo', 'Consumido', 'Usuario', 'Consumible']
          ),
        ],
        styles: {
          header: {
            fontSize: 14,
            margin: [0, 20, 0, 0],
            color: '#94a3b8',
          },

          title: {
            fontSize: 15,
            margin: [10, 15, 0, 10],
            color: '#64748b',
          },
        },
      };
      pdfMake.createPdf(documentDefinition as any).open();
    });
  }

  createTableFromEvent(event: IEvent) {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          ['ID', event.id],
          ['Título', event.title],
          ['Descripción', event.description],
          ['Fecha y Hora', getFormattedDate(event.dateTime)],
          ['Puntuación', event.score],
        ],
      },
      layout: 'borders',
    };
  }

  createTableFromConsumables(consumables: IConsumable[], headers: string[]) {
    const tableBody = consumables.map((consumable) => [
      { text: consumables.indexOf(consumable) + 1, padding: [10, 10] },
      { text: consumable.id, padding: [10, 10] },
      { text: consumable.name, padding: [10, 10] },
    ]);

    return {
      table: {
        headerRows: 1,
        widths: Array(headers.length).fill('*'),
        body: [headers, ...tableBody],
      },
      layout: 'borders',
    };
  }

  createTableFromAssistanceTickets(
    assistanceTickets: IAssistanceTicket[],
    headers: string[]
  ) {
    const tableBody = assistanceTickets.map((assistanceTicket) => [
      {
        text: assistanceTickets.indexOf(assistanceTicket) + 1,
        padding: [10, 10],
      },
      { text: assistanceTicket.id, padding: [10, 10] },
      { text: assistanceTicket.isActive ? 'Sí' : 'No', padding: [10, 10] },
      { text: assistanceTicket.wasPresent ? 'Sí' : 'No', padding: [10, 10] },
      { text: assistanceTicket.scannedAt || '-', padding: [10, 10] },
      {
        text: assistanceTicket.user.name + ' ' + assistanceTicket.user.lastname,
        padding: [10, 10],
      },
    ]);

    return {
      table: {
        headerRows: 1,
        widths: Array(headers.length).fill('*'),
        body: [headers, ...tableBody],
      },
      layout: 'borders',
    };
  }

  createTableFromConsumablesTickets(
    consumablesTickets: IConsumablesTicket[],
    headers: string[]
  ) {
    const tableBody = consumablesTickets.map((consumablesTicket) => [
      {
        text: consumablesTickets.indexOf(consumablesTicket) + 1,
        padding: [10, 10],
      },
      {
        text: consumablesTicket.id,
        padding: [10, 10],
      },

      {
        text: consumablesTicket.isActive ? 'Sí' : 'No',
        padding: [10, 10],
      },
      {
        text: consumablesTicket.isConsumed ? 'Sí' : 'No',
        padding: [10, 10],
      },
      {
        text:
          consumablesTicket.user.name + ' ' + consumablesTicket.user.lastname,
        padding: [10, 10],
      },
      {
        text: consumablesTicket.consumable.name,
        padding: [10, 10],
      },
    ]);

    return {
      table: {
        alignment: 'center',
        headerRows: 1,
        widths: Array(headers.length).fill('*'),
        body: [headers, ...tableBody],
      },
      layout: 'borders',
    };
  }
}
