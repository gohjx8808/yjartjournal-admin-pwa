import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  selectedFiles: File[] = [];

  onFileSelected(event: any) {
    const files = event.target.files;
    this.selectedFiles = [
      ...this.selectedFiles,
      ...Array.from(files),
    ] as File[];
  }

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
    const files = event.dataTransfer?.files;
    if (files) {
      this.selectedFiles = [...this.selectedFiles, ...Array.from(files)];
    }
  }
}
