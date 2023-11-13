import { Component, Inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.scss'],
})
export class AddEditUserDialogComponent {
  isSubmitting = false;
  maxDate = new Date();
  genderOptions: globalType.stringOptionData[] = [
    { id: 'M', name: 'Male' },
    { id: 'F', name: 'Female' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: users.addEditDialogData,
    private formBuilder: NonNullableFormBuilder
  ) {}

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
      this.genderOptions.find(
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
  });

  onSubmit() {
    console.log(this.addEditUserForm.value);
  }
}
