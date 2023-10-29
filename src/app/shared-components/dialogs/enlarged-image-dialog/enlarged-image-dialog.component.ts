import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-enlarged-image-dialog',
  templateUrl: './enlarged-image-dialog.component.html',
  styleUrls: ['./enlarged-image-dialog.component.scss'],
})
export class EnlargedImageDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: enlargedImageDialog.dialogData
  ) {}
}
