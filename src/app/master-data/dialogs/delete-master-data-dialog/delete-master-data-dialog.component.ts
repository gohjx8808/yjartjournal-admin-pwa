import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YarnCategoryApiService } from '../../api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from '../../api/yarn-color-category/yarn-color-category-api.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ApiService } from '../../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-master-data-dialog',
  templateUrl: './delete-master-data-dialog.component.html',
  styleUrls: ['./delete-master-data-dialog.component.scss'],
})
export class DeleteMasterDataDialogComponent {
  submitLoading = false;
  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: masterData.deleteDialogData,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private snackbarService: SnackbarService,
    private apiService: ApiService
  ) {
    if (data.isYarnCategory) {
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
            this.apiService.refreshHack('yarn-category');
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
            this.apiService.refreshHack('yarn-color-category');
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
