import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-master-data-dialog',
  templateUrl: './add-edit-master-data-dialog.component.html',
  styleUrls: ['./add-edit-master-data-dialog.component.scss'],
})
export class AddEditMasterDataDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: masterData.addEditData) {}
}
