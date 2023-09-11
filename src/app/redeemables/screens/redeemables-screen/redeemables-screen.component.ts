import { Component, OnInit } from '@angular/core';
import { RedeemableService } from '../../services/redeemable.service';
import { IRedeemablesResponse } from '../../interfaces/redeemables-response.interface';

@Component({
  templateUrl: './redeemables-screen.component.html',
  styleUrls: ['./redeemables-screen.component.css'],
})
export class RedeemablesScreenComponent implements OnInit {
  public filter = '';
  constructor(private redeemableService: RedeemableService) {}

  get redeemables(): IRedeemablesResponse[] | null {
    return this.redeemableService.redeemables;
  }
  ngOnInit(): void {
    this.redeemableService.getRedeemables().subscribe();
  }

  updateRedeemable(redeemableId: string) {
    this.redeemableService.setIsOpenUpdateRedeemableModal(true, redeemableId);
  }

  createRedeemable() {
    this.redeemableService.setIsOpenCreateRedeemableModal(true);
  }
}
