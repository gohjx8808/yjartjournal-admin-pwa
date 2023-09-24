import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar.service';
import { YarnCategoryApiService } from '../../api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from '../../api/yarn-color-category/yarn-color-category-api.service';

@Component({
  selector: 'app-delete-master-data-dialog',
  templateUrl: './delete-master-data-dialog.component.html',
  styleUrls: ['./delete-master-data-dialog.component.scss'],
})
export class DeleteMasterDataDialogComponent implements OnInit {
  submitLoading = false;
  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: masterData.deleteDialogData,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    if (this.data.isYarnCategory) {
      this.title = 'Delete Yarn Category';
    } else {
      this.title = 'Delete Yarn Color Category';
    }
  }

  onConfirm() {
    if (this.data.isYarnCategory) {
      this.yarnCategoryApiService
        .deleteYarnCategory({ id: this.data.data.id })
        .subscribe({
          next: () => {
            this.submitLoading = false;
            this.yarnCategoryApiService.getAllYarnCategoryApi();
            this.snackbarService.openSuccessSnackbar(
              'The yarn category had been deleted!'
            );
          },
          error: (err: HttpErrorResponse) => {
            this.submitLoading = false;
            this.snackbarService.openErrorSnackbar(err.statusText || 'Error');
          },
        });
    } else {
      this.yarnColorCategoryApiService
        .deleteYarnColorCategory({ id: this.data.data.id })
        .subscribe({
          next: () => {
            this.submitLoading = false;
            this.yarnColorCategoryApiService.getAllYarnColorCategoryApi();
            this.snackbarService.openSuccessSnackbar(
              'The yarn color category had been deleted!'
            );
          },
          error: (err: HttpErrorResponse) => {
            this.submitLoading = false;
            this.snackbarService.openErrorSnackbar(err.statusText || 'Error');
          },
        });
    }
  }
}
