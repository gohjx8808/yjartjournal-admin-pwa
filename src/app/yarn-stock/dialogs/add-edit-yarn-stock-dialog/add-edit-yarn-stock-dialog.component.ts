import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { YarnCategoryApiService } from '../../../master-data/api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from 'src/app/master-data/api/yarn-color-category/yarn-color-category-api.service';
import { YarnStockApiService } from '../../api/yarn-stock-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-yarn-stock-dialog',
  templateUrl: './add-edit-yarn-stock-dialog.component.html',
  styleUrls: ['./add-edit-yarn-stock-dialog.component.scss'],
})
export class AddEditYarnStockDialogComponent {
  yarnCategories: globalType.optionData[] = [];
  yarnColorCategories: globalType.optionData[] = [];
  isSubmitting = false;
  addYarnStockForm = this.formBuilder.group({
    yarnCategoryId: [null, [Validators.required]],
    yarnColorCategoryId: [null, [Validators.required]],
    name: ['', [Validators.required]],
    cost: [null, [Validators.required]],
    reorderLevel: [null, [Validators.required]],
    quantity: [null, [Validators.required]],
    lastOrderedDate: [undefined],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: yarnStock.refreshData,
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
  }

  onSubmit() {
    if (!this.addYarnStockForm.valid) {
      this.addYarnStockForm.markAllAsTouched();
    } else {
      this.isSubmitting = true;
      this.yarnStockApiService
        .postAddYarnStock(this.addYarnStockForm.getRawValue())
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
    }
  }
}
