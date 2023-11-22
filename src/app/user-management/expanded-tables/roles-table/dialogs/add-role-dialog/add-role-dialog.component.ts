import { Component, Inject, OnInit } from '@angular/core';
import { UserManagementApiService } from '../../../../api/user-management-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../../../../services/snackbar.service';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss'],
})
export class AddRoleDialogComponent implements OnInit {
  isSubmitting = false;
  roleOptions: globalType.optionData[] = [];
  addRoleForm = this.formBuilder.group({
    roleId: [null, [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: users.userIdPayload,
    private userManagementApiService: UserManagementApiService,
    private formBuilder: NonNullableFormBuilder,
    private dialogRef: MatDialogRef<AddRoleDialogComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.userManagementApiService
      .getAssignableRole({
        userId: this.dialogData.userId,
      })
      .subscribe(roles => {
        this.roleOptions = roles.data;
      });
  }

  onSubmit() {
    if (this.addRoleForm.valid && this.addRoleForm.value.roleId) {
      this.userManagementApiService
        .submitAddUserRole({
          userId: this.dialogData.userId,
          roleId: this.addRoleForm.value.roleId,
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
              'The user role had been added!'
            );
          },
          error: (err: HttpErrorResponse) => {
            this.dialogRef.disableClose = false;
            this.isSubmitting = false;
            let errorMsg = err.statusText || 'The user role had failed to add!';
            if (err.status === 422) {
              errorMsg = err.error?.message || err.error.errors?.[0].msg;
            }
            this.snackbarService.openErrorSnackbar(errorMsg);
          },
        });
    }
  }
}
