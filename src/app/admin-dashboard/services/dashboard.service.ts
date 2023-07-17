import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public toggleMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  handleToggleMenu() {
    this.toggleMenu.next(!this.toggleMenu.value);
  }
}
