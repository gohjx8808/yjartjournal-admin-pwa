import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YarnStockApiService } from '../../api/yarn-stock-api.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-yarn-stock-dialog',
  templateUrl: './delete-yarn-stock-dialog.component.html',
  styleUrls: ['./delete-yarn-stock-dialog.component.scss'],
})
export class DeleteYarnStockDialogComponent {
  isSubmitting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: yarnStock.deleteYarnStockDialogData,
    private yarnStockApiService: YarnStockApiService,
    private snackbarService: SnackbarService
  ) {}

  onConfirm() {
    this.yarnStockApiService
      .postDeleteYarnStock({
        yarnId: this.dialogData.data.id,
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.dialogData.onRefreshData();
          this.snackbarService.openSuccessSnackbar(
            'The yarn had been deleted!'
          );
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting = false;
          this.snackbarService.openErrorSnackbar(
            err.statusText || 'The yarn had failed to delete!'
          );
        },
      });
  }
}
