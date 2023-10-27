import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YarnColorCategoryApiService } from 'src/app/master-data/api/yarn-color-category/yarn-color-category-api.service';
import { YarnCategoryApiService } from '../../../master-data/api/yarn-category/yarn-category-api.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { YarnStockApiService } from '../../api/yarn-stock-api.service';

@Component({
  selector: 'app-add-edit-yarn-stock-dialog',
  templateUrl: './add-edit-yarn-stock-dialog.component.html',
  styleUrls: ['./add-edit-yarn-stock-dialog.component.scss'],
})
export class AddEditYarnStockDialogComponent implements OnInit {
  yarnCategories: globalType.optionData[] = [];
  yarnColorCategories: globalType.optionData[] = [];
  isSubmitting = false;
  addEditYarnStockForm = this.formBuilder.group({
    yarnCategoryId: [
      this.dialogData.data?.yarnCategory.id ?? null,
      [Validators.required],
    ],
    yarnColorCategoryId: [
      this.dialogData.data?.yarnColorCategory.id ?? null,
      [Validators.required],
    ],
    name: [this.dialogData.data?.name ?? '', [Validators.required]],
    cost: [this.dialogData.data?.costPerItem ?? null, [Validators.required]],
    reorderLevel: [
      this.dialogData.data?.reorderLevel ?? null,
      [Validators.required],
    ],
    quantity: [null],
    lastOrderedDate: [
      this.dialogData.data?.lastOrderedAt
        ? new Date(this.dialogData.data.lastOrderedAt)
        : undefined,
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: yarnStock.addEditYarnStockDialogData,
    private formBuilder: NonNullableFormBuilder,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private yarnStockApiService: YarnStockApiService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.yarnCategoryApiService.getYarnCategories().subscribe(data => {
      this.yarnCategories = data;
    });
    this.yarnColorCategoryApiService
      .getYarnColorCategories()
      .subscribe(data => {
        this.yarnColorCategories = data;
      });
    if (this.dialogData.actionType === 'Add') {
      this.addEditYarnStockForm.controls['quantity'].setValidators([
        Validators.required,
      ]);
    }
  }

  onSubmit() {
    if (!this.addEditYarnStockForm.valid) {
      this.addEditYarnStockForm.markAllAsTouched();
    } else {
      this.isSubmitting = true;
      if (this.dialogData.actionType === 'Add') {
        this.yarnStockApiService
          .postAddYarnStock(this.addEditYarnStockForm.getRawValue())
          .subscribe({
            next: () => {
              this.isSubmitting = false;
              this.dialogData.onRefreshData();
              this.snackbarService.openSuccessSnackbar(
                'The yarn had been added!'
              );
            },
            error: (err: HttpErrorResponse) => {
              this.isSubmitting = false;
              this.snackbarService.openErrorSnackbar(
                err.statusText || 'The yarn had failed to add!'
              );
            },
          });
      } else {
        const formData = this.addEditYarnStockForm.getRawValue();

        this.yarnStockApiService
          .postUpdateYarnStock({
            yarnId: this.dialogData.data?.id || 0,
            image: {
              isUpdated: false,
            },
            ...formData,
          })
          .subscribe({
            next: () => {
              this.isSubmitting = false;
              this.dialogData.onRefreshData();
              this.snackbarService.openSuccessSnackbar(
                'The yarn had been updated!'
              );
            },
            error: (err: HttpErrorResponse) => {
              this.isSubmitting = false;
              this.snackbarService.openErrorSnackbar(
                err.statusText || 'The yarn had failed to update!'
              );
            },
          });
      }
    }
  }
}
