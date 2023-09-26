import { Component, OnInit } from '@angular/core';
import { RedeemableService } from '../../services/redeemable.service';
import { IGetRedeemablesResponse } from '../../interfaces/redeemables-response.interface';
import { TokenService } from 'src/app/tokens/token.service';

@Component({
  templateUrl: './redeemables-screen.component.html',
  styleUrls: ['./redeemables-screen.component.css'],
})
export class RedeemablesScreenComponent implements OnInit {
  public filter = '';
  public filterTokenType = '';
  constructor(
    private redeemableService: RedeemableService,
    private tokenService: TokenService
  ) {}

  get redeemables(): IGetRedeemablesResponse[] | null {
    return this.redeemableService.redeemables;
  }

  get tokens() {
    return this.tokenService.tokens;
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
