import { Component } from '@angular/core';
import { IConsumableData } from '../../interfaces/consumable.interface';
import { ConsumablesTicketsService } from '../../services/consumables-tickets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumables-tickets',
  templateUrl: './consumables-tickets.component.html',
  styleUrls: ['./consumables-tickets.component.css'],
})
export class ConsumablesTicketsComponent {
  consumables: IConsumableData[] = [];
  selectedConsumable: IConsumableData | null = null;
  isDialogOpen = false;
  public loading: boolean = false;
  public filter = '';
  public filterEventState = '';
  public filterWasConsumed = '';

  public filterStateOption = [
    {
      name: 'Activo',
      value: true,
    },
    {
      name: 'Inactivo',
      value: false,
    },
  ];

  public filterWasConsumedOption = [
    {
      name: 'Si',
      value: true,
    },
    {
      name: 'No',
      value: false,
    },
  ];

  constructor(
    private consumablesTicketsService: ConsumablesTicketsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consumablesTicketsService.consumables$.subscribe(
      (consumables: IConsumableData[]) => {
        this.consumables = consumables;
      }
    );

    this.consumablesTicketsService.isDialogOpen.subscribe(
      (isVisible: boolean) => {
        this.isDialogOpen = isVisible;
      }
    );
  }

  isActiveToString(isActive: boolean): string {
    return isActive ? 'Activo' : 'Inactivo';
  }

  openDialog(consumable: IConsumableData): void {
    this.selectedConsumable = consumable;
    console.log(this.selectedConsumable);
    this.consumablesTicketsService.toggleDialogDetails(true);
  }

  closeDialog(): void {
    this.consumablesTicketsService.toggleDialogDetails(false);
  }

  public seeMore(userId: string): void {
    this.closeDialog();
    this.router.navigate([`/dashboard/usuarios/${userId}`]);
  }
}
