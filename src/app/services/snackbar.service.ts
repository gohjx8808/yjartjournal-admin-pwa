import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  openSuccessSnackbar(message: string) {
    this.snackbar.open(message, 'CLOSE', {
      duration: 5000,
      panelClass: 'app-notification-success',
    });
  }

  openErrorSnackbar(message: string) {
    this.snackbar.open(message, 'CLOSE', {
      duration: 5000,
      panelClass: 'app-notification-error',
    });
  }
}
