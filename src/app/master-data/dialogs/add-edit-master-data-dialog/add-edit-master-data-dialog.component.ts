import { Component, Inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-master-data-dialog',
  templateUrl: './add-edit-master-data-dialog.component.html',
  styleUrls: ['./add-edit-master-data-dialog.component.scss'],
})
export class AddEditMasterDataDialogComponent {
  title = '';
  masterDataForm: FormGroup;
  submitLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: masterData.addEditData,
    formBuilder: NonNullableFormBuilder
  ) {
    if (data.isAdd) {
      this.title = 'Add ';
    } else {
      this.title = 'Edit ';
    }

    if (data.isYarnCategory) {
      this.title += 'Yarn Category';
    } else {
      this.title += 'Yarn Color Category';
    }

    this.masterDataForm = formBuilder.group({
      name: [data.data.name, [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.masterDataForm.valid) {
      this.masterDataForm.markAllAsTouched();
    } else {
      this.submitLoading = true;
      console.log(this.masterDataForm.value);
    }
  }
}
