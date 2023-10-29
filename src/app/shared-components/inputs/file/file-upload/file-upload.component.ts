import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  // selectedFiles: File[] = [];
  selectedFile: File | undefined = undefined;

  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.fileSelected.emit(file);
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
    this.selectedFile = file;
    this.fileSelected.emit(file);
    // this.selectedFiles = [...this.selectedFiles, ...Array.from(files)];
  }

  onFileRemoved() {
    this.selectedFile = undefined;
    this.fileSelected.emit(undefined);
  }
}
