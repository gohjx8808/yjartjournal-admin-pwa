import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserManagementApiService } from 'src/app/user-management/api/user-management-api.service';

@Component({
  selector: 'app-delete-role-dialog',
  templateUrl: './delete-role-dialog.component.html',
  styleUrls: ['./delete-role-dialog.component.scss'],
})
export class DeleteRoleDialogComponent {
  isSubmitting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: users.deleteRoleDialogData,
    private userManagementApiService: UserManagementApiService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<DeleteRoleDialogComponent>
  ) {}

  onSubmit() {
    this.userManagementApiService
      .submitDeleteUserRole({
        userRoleId: this.dialogData.data.id,
      })
      .subscribe({
        next: () => {
          this.dialogRef.disableClose = false;
          this.dialogRef.close();
          this.userManagementApiService.getUserRoleApi({
            userId: this.dialogData.userId,
          });
          this.isSubmitting = false;
          this.snackbarService.openSuccessSnackbar(
            'The user role had been deleted!'
          );
        },
        error: (err: HttpErrorResponse) => {
          this.dialogRef.disableClose = false;
          this.isSubmitting = false;
          let errorMsg =
            err.statusText || 'The user role had failed to delete!';
          if (err.status === 422) {
            errorMsg = err.error?.message || err.error.errors?.[0].msg;
          }
          this.snackbarService.openErrorSnackbar(errorMsg);
        },
      });
  }
}
