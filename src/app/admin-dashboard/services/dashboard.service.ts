import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public isOpen = false;

  handleToggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
