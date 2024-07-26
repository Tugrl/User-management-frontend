import { Injectable } from '@angular/core';
  import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showError(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.panelClass = ['error-snackbar'];
    this.snackBar.open(message, 'Close', config);
  }

}
