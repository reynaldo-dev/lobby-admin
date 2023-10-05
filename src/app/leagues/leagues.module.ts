import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingItemComponent } from './components/ranking-item/ranking-item.component';

@NgModule({
  declarations: [RankingItemComponent],
  imports: [CommonModule],
  exports: [RankingItemComponent],
})
export class LeaguesModule {}
