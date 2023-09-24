import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { YarnCategoryApiService } from '../../api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from '../../api/yarn-color-category/yarn-color-category-api.service';

@Component({
  selector: 'app-add-edit-master-data-dialog',
  templateUrl: './add-edit-master-data-dialog.component.html',
  styleUrls: ['./add-edit-master-data-dialog.component.scss'],
})
export class AddEditMasterDataDialogComponent implements OnInit {
  title = '';
  masterDataForm = this.formBuilder.group({
    name: [this.data.data?.name || '', [Validators.required]],
  });
  submitLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: masterData.addEditDialogData,
    private formBuilder: NonNullableFormBuilder,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    if (this.data.isAdd) {
      this.title = 'Add ';
    } else {
      this.title = 'Edit ';
    }

    if (this.data.isYarnCategory) {
      this.title += 'Yarn Category';
    } else {
      this.title += 'Yarn Color Category';
    }
  }

  onSubmit() {
    if (!this.masterDataForm.valid) {
      this.masterDataForm.markAllAsTouched();
    } else {
      this.submitLoading = true;
      if (this.data.isAdd) {
        if (this.data.isYarnCategory) {
          this.yarnCategoryApiService
            .addYarnCategory(this.masterDataForm.getRawValue())
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.yarnCategoryApiService.getAllYarnCategoryApi();
                this.snackbarService.openSuccessSnackbar(
                  'The yarn category had been added!'
                );
              },
              error: (err: HttpErrorResponse) => {
                this.submitLoading = false;
                this.snackbarService.openErrorSnackbar(
                  err.statusText || 'Error'
                );
              },
            });
        } else {
          this.yarnColorCategoryApiService
            .addYarnColorCategory(this.masterDataForm.getRawValue())
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.yarnColorCategoryApiService.getAllYarnColorCategoryApi();
                this.snackbarService.openSuccessSnackbar(
                  'The yarn color category had been added!'
                );
              },
              error: (err: HttpErrorResponse) => {
                this.submitLoading = false;
                this.snackbarService.openErrorSnackbar(
                  err.statusText || 'Error'
                );
              },
            });
        }
      } else {
        if (this.data.isYarnCategory) {
          this.yarnCategoryApiService
            .updateYarnCategory({
              ...this.masterDataForm.getRawValue(),
              id: this.data.data?.id || 0,
            })
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.yarnCategoryApiService.getAllYarnCategoryApi();
                this.snackbarService.openSuccessSnackbar(
                  'The yarn category had been updated!'
                );
              },
              error: (err: HttpErrorResponse) => {
                this.submitLoading = false;
                this.snackbarService.openErrorSnackbar(
                  err.statusText || 'Error'
                );
              },
            });
        } else {
          this.yarnColorCategoryApiService
            .updateYarnColorCategory({
              ...this.masterDataForm.getRawValue(),
              id: this.data.data?.id || 0,
            })
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.yarnColorCategoryApiService.getAllYarnColorCategoryApi();
                this.snackbarService.openSuccessSnackbar(
                  'The yarn color category had been updated!'
                );
              },
              error: (err: HttpErrorResponse) => {
                this.submitLoading = false;
                this.snackbarService.openErrorSnackbar(
                  err.statusText || 'Error'
                );
              },
            });
        }
      }
    }
  }
}
