import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnlargedImageDialogComponent } from 'src/app/shared-components/dialogs/enlarged-image-dialog/enlarged-image-dialog.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  isNewImage = false;
  // selectedFiles: File[] = [];
  @Input() image?: fileUpload.imageData;

  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  constructor(private dialog: MatDialog) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.isNewImage = true;
    this.fileSelected.emit(file);
    event.target.value = null;
  }

  // onFilesSelected(event: any) {
  //   const files = event.target.files;
  //   this.selectedFiles = [
  //     ...this.selectedFiles,
  //     ...Array.from(files),
  //   ] as File[];
  // }

  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // const files = event.dataTransfer?.files;
    const file = event.dataTransfer?.files[0];
    this.isNewImage = true;
    this.fileSelected.emit(file);
    // this.selectedFiles = [...this.selectedFiles, ...Array.from(files)];
  }

  onFileRemoved() {
    this.fileSelected.emit(undefined);
  }

  openEnlargedImageDialog() {
    this.dialog.open<
      EnlargedImageDialogComponent,
      enlargedImageDialog.dialogData
    >(EnlargedImageDialogComponent, {
      data: {
        imageUrl: this.image?.imageUrl || '',
      },
    });
  }
}
