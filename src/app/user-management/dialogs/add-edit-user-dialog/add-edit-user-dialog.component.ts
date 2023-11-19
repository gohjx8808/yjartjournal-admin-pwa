import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserManagementApiService } from '../../api/user-management-api.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SnackbarService } from '../../../services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HelpersService } from '../../../helpers/helpers.service';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.scss'],
})
export class AddEditUserDialogComponent implements OnInit {
  isSubmitting = false;
  maxDate = new Date();
  formOptions: users.formOption = { roles: [], gender: [] };

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: users.addEditDialogData,
    private formBuilder: NonNullableFormBuilder,
    private userManagementApiService: UserManagementApiService,
    private dialogRef: MatDialogRef<AddEditUserDialogComponent>,
    private snackbarService: SnackbarService,
    private helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.userManagementApiService.getFormOptions().subscribe(option => {
      this.formOptions = option.data;
    });
  }

  addEditUserForm = this.formBuilder.group({
    name: [this.dialogData.data?.name ?? null, [Validators.required]],
    preferredName: [this.dialogData.data?.preferredName ?? null],
    email: [this.dialogData.data?.email ?? null, [Validators.required]],
    countryCode: [
      this.dialogData.data?.countryCode ?? null,
      [Validators.required],
    ],
    phoneNumber: [
      this.dialogData.data?.phoneNumber ?? null,
      [Validators.required],
    ],
    gender: [
      this.formOptions.gender.find(
        gender => gender.name === this.dialogData.data?.gender
      )?.id,
      [Validators.required],
    ],
    dob: [
      this.dialogData.data?.dob
        ? new Date(this.dialogData.data.dob)
        : undefined,
      [Validators.required],
    ],
    roleIds: [[] as number[], [Validators.required]],
  });

  onSubmit() {
    const formData = this.addEditUserForm.value;

    const dataToBeSubmit = {
      name: formData.name!,
      preferredName: formData.preferredName,
      email: formData.email!,
      countryCode: formData.countryCode!,
      phoneNumber: formData.phoneNumber!,
      gender: formData.gender!,
      dob: this.helpersService.formatDate(formData.dob!),
      roleIds: formData.roleIds!,
    };

    if (!this.addEditUserForm.valid) {
      this.addEditUserForm.markAllAsTouched;
    } else {
      this.dialogRef.disableClose = true;
      if (this.dialogData.actionType === 'Add') {
        this.userManagementApiService
          .submitAddNewUser(dataToBeSubmit)
          .subscribe({
            next: () => {
              this.dialogRef.disableClose = false;
              this.dialogRef.close();
              this.dialogData.onRefreshData();
              this.isSubmitting = false;
              this.snackbarService.openSuccessSnackbar(
                'The user had been added!'
              );
            },
            error: (err: HttpErrorResponse) => {
              this.dialogRef.disableClose = false;
              this.isSubmitting = false;
              let errorMsg = err.statusText || 'The user had failed to add!';
              if (err.status === 422) {
                errorMsg = err.error.errors[0].msg;
              }
              this.snackbarService.openErrorSnackbar(errorMsg);
            },
          });
      }
    }
  }

  test(event: MatCheckboxChange, roleId: number) {
    const roleIdsForm = this.addEditUserForm.get('roleIds');
    if (event.checked) {
      roleIdsForm?.setValue([...roleIdsForm.value, roleId]);
    } else {
      roleIdsForm?.setValue(
        roleIdsForm.value.filter(selectedRole => selectedRole !== roleId)
      );
    }
  }
}
