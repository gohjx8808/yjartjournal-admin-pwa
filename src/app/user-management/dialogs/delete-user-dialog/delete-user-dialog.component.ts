import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserManagementApiService } from '../../api/user-management-api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss'],
})
export class DeleteUserDialogComponent {
  isSubmitting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: users.deleteDialogData,
    private userManagementApiService: UserManagementApiService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>
  ) {}

  onConfirm() {
    this.dialogRef.disableClose = true;
    this.isSubmitting = true;
    this.userManagementApiService
      .submitDeleteUser({
        userId: this.dialogData.data.id,
      })
      .subscribe({
        next: () => {
          this.dialogRef.disableClose = false;
          this.dialogRef.close();
          this.isSubmitting = false;
          this.dialogData.onRefreshData();
          this.snackbarService.openSuccessSnackbar(
            'The user had been deleted!'
          );
        },
        error: (err: HttpErrorResponse) => {
          this.dialogRef.disableClose = false;
          this.isSubmitting = false;
          this.snackbarService.openErrorSnackbar(
            err.statusText || 'The user had failed to delete!'
          );
        },
      });
  }
}
