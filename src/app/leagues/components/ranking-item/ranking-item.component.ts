import { Component } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { IGetRankingResponse } from '../../interfaces/get-ranking-response.interface';

@Component({
  selector: 'app-ranking-item',
  templateUrl: './ranking-item.component.html',
  styleUrls: ['./ranking-item.component.css'],
})
export class RankingItemComponent {
  constructor(private rankingService: RankingService) {}

  get ranking(): IGetRankingResponse[] | null {
    return this.rankingService.ranking;
  }

  getCurrentIndex(item: any) {
    if (this.ranking) {
      return this.ranking.indexOf(item);
    }

    return -1;
  }
}
