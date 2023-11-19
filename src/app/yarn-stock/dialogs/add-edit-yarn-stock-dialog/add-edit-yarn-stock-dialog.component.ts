import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { YarnColorCategoryApiService } from 'src/app/master-data/api/yarn-color-category/yarn-color-category-api.service';
import { YarnCategoryApiService } from '../../../master-data/api/yarn-category/yarn-category-api.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { YarnStockApiService } from '../../api/yarn-stock-api.service';
import { HelpersService } from '../../../helpers/helpers.service';

@Component({
  selector: 'app-add-edit-yarn-stock-dialog',
  templateUrl: './add-edit-yarn-stock-dialog.component.html',
  styleUrls: ['./add-edit-yarn-stock-dialog.component.scss'],
})
export class AddEditYarnStockDialogComponent implements OnInit {
  yarnCategories: globalType.optionData[] = [];
  yarnColorCategories: globalType.optionData[] = [];
  isSubmitting = false;
  uploadedFile?: File;
  maxDate = new Date();
  isImageUpdated = false;
  image?: fileUpload.imageData;

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
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<AddEditYarnStockDialogComponent>,
    private helpersService: HelpersService
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
    if (
      this.dialogData.data?.yarnStockImages &&
      this.dialogData.data?.yarnStockImages.length > 0
    ) {
      this.image = {
        imageName: this.dialogData.data?.yarnStockImages?.[0].originalName,
        imageUrl: this.dialogData.data?.yarnStockImages?.[0].imageUrl,
      };
    }
  }

  onSubmit() {
    if (!this.addEditYarnStockForm.valid) {
      this.addEditYarnStockForm.markAllAsTouched();
    } else {
      this.dialogRef.disableClose = true;
      this.isSubmitting = true;
      const formValue = this.addEditYarnStockForm.getRawValue();
      const formData = new FormData();
      formData.append('yarnCategoryId', formValue.yarnCategoryId!.toString());
      formData.append(
        'yarnColorCategoryId',
        formValue.yarnColorCategoryId!.toString()
      );
      formData.append('name', formValue.name);
      formData.append('cost', formValue.cost!.toString());
      formData.append('reorderLevel', formValue.reorderLevel!.toString());
      if (formValue.quantity) {
        formData.append('quantity', formValue.quantity);
      }
      if (formValue.lastOrderedDate) {
        formData.append(
          'lastOrderedDate',
          this.helpersService.formatDate(formValue.lastOrderedDate)
        );
      }
      if (this.uploadedFile) {
        formData.append('image', this.uploadedFile);
      }
      if (this.dialogData.actionType === 'Add') {
        this.yarnStockApiService.postAddYarnStock(formData).subscribe({
          next: () => {
            this.dialogRef.disableClose = false;
            this.dialogRef.close();
            this.isSubmitting = false;
            this.dialogData.onRefreshData();
            this.snackbarService.openSuccessSnackbar(
              'The yarn had been added!'
            );
          },
          error: (err: HttpErrorResponse) => {
            this.dialogRef.disableClose = false;
            this.isSubmitting = false;
            this.snackbarService.openErrorSnackbar(
              err.statusText || 'The yarn had failed to add!'
            );
          },
        });
      } else {
        formData.append('yarnId', this.dialogData.data!.id!.toString());
        formData.append('isImageUpdated', this.isImageUpdated.toString());

        this.yarnStockApiService.postUpdateYarnStock(formData).subscribe({
          next: () => {
            this.dialogRef.disableClose = false;
            this.isSubmitting = false;
            this.dialogRef.close();
            this.dialogData.onRefreshData();
            this.snackbarService.openSuccessSnackbar(
              'The yarn had been updated!'
            );
          },
          error: (err: HttpErrorResponse) => {
            this.dialogRef.disableClose = false;
            this.isSubmitting = false;
            this.snackbarService.openErrorSnackbar(
              err.statusText || 'The yarn had failed to update!'
            );
          },
        });
      }
    }
  }

  onFileSelected(file?: File) {
    this.isImageUpdated = true;
    this.uploadedFile = file;
    if (file) {
      this.image = {
        imageName: file?.name,
        imageUrl: URL.createObjectURL(file),
      };
    } else {
      this.image = undefined;
    }
  }
}
