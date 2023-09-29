import { Component, OnInit } from '@angular/core';
import { AllianceService } from '../../services/alliance.service';
import { IAlliance } from '../../interfaces/alliance.interface';
import { AllianceCategoryService } from 'src/app/alliance-category/services/alliance-category.service';
import { IAllianceCategory } from 'src/app/alliance-category/interfaces/alliance-category.interface';

@Component({
  selector: 'app-alliances',
  templateUrl: './alliances.component.html',
  styleUrls: ['./alliances.component.css'],
})
export class AlliancesComponent implements OnInit {
  public filter = '';
  public category: string = '';

  constructor(
    private allianceService: AllianceService,
    private allianceCategoryService: AllianceCategoryService
  ) {}
  ngOnInit(): void {
    this.allianceCategoryService.getAllianceCategories().subscribe();
    this.allianceService.getAlliances().subscribe();
  }

  get alliances(): IAlliance[] | null {
    return this.allianceService.alliances
      ? this.allianceService.alliances
      : null;
  }

  get allianceCategories(): IAllianceCategory[] | null {
    return this.allianceCategoryService.allianceCategories;
  }

  createAlliance(): void {
    this.allianceService.setIsModalCreateVisible(true);
  }

  updateAlliance(alliance: IAlliance): void {
    this.allianceService.setSelectAlliance(alliance);
    this.allianceService.setIsModalUpdateVisible(true);
  }
}
