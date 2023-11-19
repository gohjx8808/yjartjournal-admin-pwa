import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagementApiService } from '../../api/user-management-api.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
    private userManagementApiService: UserManagementApiService
  ) {}

  ngOnInit(): void {
    this.userManagementApiService.getFormOptions().subscribe(option => {
      this.formOptions = option.data;
    });
  }

  addEditUserForm = this.formBuilder.group({
    name: [this.dialogData.data?.name ?? null, [Validators.required]],
    preferredName: [this.dialogData.data?.preferredName ?? null],
    email: [
      {
        value: this.dialogData.data?.email ?? null,
        disabled: this.dialogData.data?.email,
      },
      [Validators.required],
    ],
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
    console.log(this.addEditUserForm.value);
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
