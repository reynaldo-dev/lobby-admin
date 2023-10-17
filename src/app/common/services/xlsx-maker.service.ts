import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { IEventReportResponse } from '../interfaces/report-response.interface';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { getFormattedDate } from 'src/app/helpers/get-formatted-date/getFormattedDate';
import { ITradeHistory } from 'src/app/redeemables/interfaces/trade-history.interface';

@Injectable({
  providedIn: 'root',
})
export class XlsxMakerService {
  private headers!: HttpHeaders;
  private _data!: IEventReportResponse;
  private apiURL = `${environment.apiUrl}`;

  private _redeemsData!: ITradeHistory[];

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
  }

  getReportData(eventId: string): Observable<IEventReportResponse> {
    return this.http
      .get<IEventReportResponse>(
        `${this.apiURL}/event/event-report/${eventId}`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        tap((data) => {
          this._data = data;
        }),
        tap(() => {
          this.exportToExcel(`Reporte - ${this._data.event.title}`);
        })
      );
  }

  public generateRedeemsReport(filename: string) {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    const redeems = this._redeemsData.map((redeem) => ({
      ID: redeem.id,
      Usuario: redeem.user.name + ' ' + redeem.user.lastname,
      Fecha: getFormattedDate(redeem.createdAt),
      'Producto Canjeado': redeem.redeemedItem.name,
    }));

    const wsRedeems: XLSX.WorkSheet = XLSX.utils.json_to_sheet(redeems);
    wsRedeems['!cols'] = [{ wch: 50 }, { wch: 50 }, { wch: 20 }, { wch: 50 }];
    XLSX.utils.book_append_sheet(wb, wsRedeems, 'Canjes');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

  public getRedeemsHistoryReportData() {
    return this.http
      .get<ITradeHistory[]>(`${this.apiURL}/trade-history`, {
        headers: this.headers,
      })
      .pipe(
        tap((redeemsHistory) => {
          this._redeemsData = redeemsHistory;
          this.generateRedeemsReport(
            `Canjes hasta el ${new Date().toLocaleDateString()}`
          );
        })
      );
  }

  exportToExcel(filename: string): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    const event = [
      {
        Titulo: this._data.event.title,
        Fecha: getFormattedDate(this._data.event.dateTime),
        Creditos: this._data.event.credits,
      },
    ];

    const consumables = this._data.consumables.map((consumable) => ({
      ID: consumable.id,
      Nombre: consumable.name,
    }));

    const assistanceTickets = this._data.assistanceTickets.map((ticket) => ({
      ID: ticket.id,
      Activo: ticket.isActive ? 'Sí' : 'No',
      Asistió: ticket.wasPresent ? 'Sí' : 'No',
      Escaneado_el: ticket.scannedAt ? getFormattedDate(ticket.scannedAt) : '',
      Usuario: ticket.user.name + ' ' + ticket.user.lastname,
    }));

    const consumablesTickets = this._data.consumablesTickets.map((ticket) => ({
      ID: ticket.id,
      Activo: ticket.isActive ? 'Sí' : 'No',
      Consumido: ticket.isConsumed ? 'Sí' : 'No',
      Usuario: ticket.user.name + ' ' + ticket.user.lastname,
      Consumible: ticket.consumable.name,
    }));

    //evento
    const wsEvent: XLSX.WorkSheet = XLSX.utils.json_to_sheet(event);
    //change size of all columnns
    wsEvent['!cols'] = [{ wch: 50 }, { wch: 20 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, wsEvent, 'Evento');

    //consumibles de este evento
    const wsConsumables: XLSX.WorkSheet = XLSX.utils.json_to_sheet(consumables);
    //change size of all columnns
    wsConsumables['!cols'] = [{ wch: 50 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, wsConsumables, 'Consumibles');

    //asistencia
    const wsAssistance: XLSX.WorkSheet =
      XLSX.utils.json_to_sheet(assistanceTickets);
    wsAssistance['!cols'] = [
      { wch: 50 },
      { wch: 10 },
      { wch: 10 },
      { wch: 20 },
      { wch: 50 },
    ];
    XLSX.utils.book_append_sheet(wb, wsAssistance, 'Asistencia');

    //tickets de consumibles
    const wsConsumablesTickets: XLSX.WorkSheet =
      XLSX.utils.json_to_sheet(consumablesTickets);
    wsConsumablesTickets['!cols'] = [
      { wch: 50 },
      { wch: 10 },
      { wch: 10 },
      { wch: 50 },
      { wch: 20 },
    ];
    XLSX.utils.book_append_sheet(
      wb,
      wsConsumablesTickets,
      'Tickets de Consumibles'
    );

    XLSX.writeFile(wb, `${filename}.xlsx`);
  }
}
