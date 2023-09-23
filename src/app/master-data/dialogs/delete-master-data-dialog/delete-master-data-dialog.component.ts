import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-master-data-dialog',
  templateUrl: './delete-master-data-dialog.component.html',
  styleUrls: ['./delete-master-data-dialog.component.scss'],
})
export class DeleteMasterDataDialogComponent {
  submitLoading = false;
  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: masterData.deleteDialogData
  ) {
    if (data.isYarnCategory) {
      this.title = 'Delete Yarn Category';
    } else {
      this.title = 'Delete Yarn Color Category';
    }
  }
}
