import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserManagementApiService } from '../../../../../api/user-management-api.service';
import { SnackbarService } from '../../../../../../services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-address-dialog',
  templateUrl: './delete-address-dialog.component.html',
  styleUrls: ['./delete-address-dialog.component.scss'],
})
export class DeleteAddressDialogComponent {
  isSubmitting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: address.deleteDialogData,
    private userManagementApiService: UserManagementApiService,
    private dialogRef: MatDialogRef<DeleteAddressDialogComponent>,
    private snackbarService: SnackbarService
  ) {}

  onConfirm() {
    this.isSubmitting = true;
    this.userManagementApiService
      .submitDeleteAddress({
        addressId: this.dialogData.data.id,
      })
      .subscribe({
        next: () => {
          this.dialogRef.disableClose = false;
          this.dialogRef.close();
          this.userManagementApiService.getUserAddressApi({
            userId: this.dialogData.userId,
          });
          this.isSubmitting = false;
          this.snackbarService.openSuccessSnackbar(
            'The address had been deleted!'
          );
        },
        error: (err: HttpErrorResponse) => {
          this.dialogRef.disableClose = false;
          this.isSubmitting = false;
          let errorMsg = err.statusText || 'The address had failed to delete';
          if (err.status === 422) {
            errorMsg = err.error?.message || err.error.errors?.[0].msg;
          }
          this.snackbarService.openErrorSnackbar(errorMsg);
        },
      });
  }
}
