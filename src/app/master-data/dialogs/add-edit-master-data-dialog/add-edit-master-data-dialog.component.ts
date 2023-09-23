import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ApiService } from '../../../services/api.service';
import { YarnCategoryApiService } from '../../api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from '../../api/yarn-color-category/yarn-color-category-api.service';

@Component({
  selector: 'app-add-edit-master-data-dialog',
  templateUrl: './add-edit-master-data-dialog.component.html',
  styleUrls: ['./add-edit-master-data-dialog.component.scss'],
})
export class AddEditMasterDataDialogComponent implements OnInit {
  title = '';
  masterDataForm: FormGroup;
  submitLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: masterData.addEditDialogData,
    formBuilder: NonNullableFormBuilder,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private snackbarService: SnackbarService,
    private apiService: ApiService
  ) {
    this.masterDataForm = formBuilder.group({
      name: [data.data?.name, [Validators.required]],
    });
  }

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
            .addYarnCategory(this.masterDataForm.value)
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.apiService.refreshHack('yarn-category');
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
            .addYarnColorCategory(this.masterDataForm.value)
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.apiService.refreshHack('yarn-color-category');
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
              ...this.masterDataForm.value,
              id: this.data.data?.id,
            })
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.apiService.refreshHack('yarn-category');
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
              ...this.masterDataForm.value,
              id: this.data.data?.id,
            })
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.apiService.refreshHack('yarn-color-category');
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
