import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChallengesService } from '../../services/challenges.service';
import { IChallenge } from '../../interfaces/challenge.interface';

@Component({
  selector: 'app-challenges-screen',
  templateUrl: './challenges-screen.component.html',
  styleUrls: ['./challenges-screen.component.css'],
})
export class ChallengesScreenComponent implements OnInit {
  public cols = ['Titulo', 'Fecha inicial', 'Fecha final', 'Cupones'];
  public challengesForReport!: IChallenge[];
  constructor(private challengesService: ChallengesService) {}
  ngOnInit(): void {
    this.challengesService.getChallenges().subscribe({
      next: (response) => {
        this.challengesForReport = response.data;
      },
    });
  }

  get challenges(): IChallenge[] | null {
    return this.challengesService.challenges;
  }

  public updateChallenge(challenge: IChallenge) {}

  public createChallenge() {}
}
