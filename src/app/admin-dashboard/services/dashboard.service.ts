import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public isOpen = false;

  handleToggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
