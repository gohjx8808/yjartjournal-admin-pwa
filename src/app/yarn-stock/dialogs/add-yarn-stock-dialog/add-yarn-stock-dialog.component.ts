import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { YarnCategoryApiService } from '../../../master-data/api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from 'src/app/master-data/api/yarn-color-category/yarn-color-category-api.service';
import { YarnStockApiService } from '../../api/yarn-stock-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-yarn-stock-dialog',
  templateUrl: './add-yarn-stock-dialog.component.html',
  styleUrls: ['./add-yarn-stock-dialog.component.scss'],
})
export class AddYarnStockDialogComponent implements OnInit {
  yarnCategories: globalType.optionData[] = [];
  yarnColorCategories: globalType.optionData[] = [];
  addYarnStockForm = this.formBuilder.group({
    yarnCategoryId: [0, [Validators.required]],
    yarnColorCategoryId: [0, [Validators.required]],
    name: ['', [Validators.required]],
    cost: [0, [Validators.required]],
    reorderLevel: [0, [Validators.required]],
    quantity: [0, [Validators.required]],
    lastOrderedDate: [new Date(), [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: yarnStock.refreshData,
    private formBuilder: NonNullableFormBuilder,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private yarnStockApiService: YarnStockApiService
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
      this.yarnStockApiService.postAddYarnStock({
        ...this.addYarnStockForm.getRawValue(),
        onRefreshData: this.dialogData.onRefreshData,
      });
    }
  }
}
