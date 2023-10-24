import { Component, OnInit } from '@angular/core';
import { RedeemsHistoryService } from '../../services/redeems-history.service';
import { ITradeHistory } from '../../interfaces/trade-history.interface';
import { getFormattedDate } from 'src/app/helpers/get-formatted-date/getFormattedDate';
import { XlsxMakerService } from 'src/app/common/services/xlsx-maker.service';

@Component({
  selector: 'app-redeems-history',
  templateUrl: './redeems-history.component.html',
  styleUrls: ['./redeems-history.component.css'],
})
export class RedeemsHistoryComponent implements OnInit {
  public loading = false;
  public filter = '';
  public file = '';
  constructor(
    private _redeemsHistoryService: RedeemsHistoryService,
    private xlsxMakerService: XlsxMakerService
  ) {}
  ngOnInit(): void {
    this._redeemsHistoryService.getRedeemsHistory().subscribe();
  }

  get redeemsHistory(): ITradeHistory[] | null {
    return this._redeemsHistoryService.redeemsHistory;
  }

  getFormatDate(date: string) {
    return getFormattedDate(date);
  }

  public generateXlsx() {
    this.loading = true;
    this.xlsxMakerService.getRedeemsHistoryReportData().subscribe({
      next: (data) => {
        this.loading = false;
      },
    });
  }
}
