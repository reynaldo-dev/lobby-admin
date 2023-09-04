import { Component, OnInit } from '@angular/core';
import { AllianceService } from '../../services/alliance.service';
import { IAlliance } from '../../interfaces/alliance.interface';

@Component({
  selector: 'app-alliances',
  templateUrl: './alliances.component.html',
  styleUrls: ['./alliances.component.css'],
})
export class AlliancesComponent implements OnInit {
  public filter = '';

  constructor(private allianceService: AllianceService) {}
  ngOnInit(): void {
    this.allianceService.getAlliances().subscribe();
  }

  get alliances(): IAlliance[] | null {
    return this.allianceService.alliances
      ? this.allianceService.alliances
      : null;
  }

  createAlliance(): void {
    this.allianceService.setIsModalCreateVisible(true);
  }

  updateAlliance(alliance: IAlliance): void {
    this.allianceService.setSelectAlliance(alliance);
    this.allianceService.setIsModalUpdateVisible(true);
  }
}
