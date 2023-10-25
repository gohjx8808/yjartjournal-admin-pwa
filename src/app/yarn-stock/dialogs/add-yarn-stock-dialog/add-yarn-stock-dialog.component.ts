import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { YarnCategoryApiService } from '../../../master-data/api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from 'src/app/master-data/api/yarn-color-category/yarn-color-category-api.service';

@Component({
  selector: 'app-add-yarn-stock-dialog',
  templateUrl: './add-yarn-stock-dialog.component.html',
  styleUrls: ['./add-yarn-stock-dialog.component.scss'],
})
export class AddYarnStockDialogComponent implements OnInit {
  yarnCategories: globalType.optionData[] = [];
  yarnColorCategories: globalType.optionData[] = [];
  addYarnStockForm = this.formBuilder.group({});

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService
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
}
