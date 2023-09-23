import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { YarnCategoryApiService } from '../../api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from '../../api/yarn-color-category/yarn-color-category-api.service';

@Component({
  selector: 'app-add-edit-master-data-dialog',
  templateUrl: './add-edit-master-data-dialog.component.html',
  styleUrls: ['./add-edit-master-data-dialog.component.scss'],
})
export class AddEditMasterDataDialogComponent {
  title = '';
  masterDataForm: FormGroup;
  submitLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: masterData.addEditData,
    formBuilder: NonNullableFormBuilder,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    if (data.isAdd) {
      this.title = 'Add ';
    } else {
      this.title = 'Edit ';
    }

    if (data.isYarnCategory) {
      this.title += 'Yarn Category';
    } else {
      this.title += 'Yarn Color Category';
    }

    this.masterDataForm = formBuilder.group({
      name: [data.data.name, [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.masterDataForm.valid) {
      this.masterDataForm.markAllAsTouched();
    } else {
      this.submitLoading = true;
      if (this.data.isAdd) {
        /* empty */
      } else {
        if (this.data.isYarnCategory) {
          this.yarnCategoryApiService
            .updateYarnCategory({
              ...this.masterDataForm.value,
              id: this.data.data.id,
            })
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.refreshHack('yarn-category');
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
              id: this.data.data.id,
            })
            .subscribe({
              next: () => {
                this.submitLoading = false;
                this.refreshHack('yarn-color-category');
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

  refreshHack(destination: string) {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([destination]);
      });
  }
}
