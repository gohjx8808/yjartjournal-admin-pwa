import { Component, OnInit } from '@angular/core';
import { YarnCategoryApiService } from '../../../master-data/api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from '../../../master-data/api/yarn-color-category/yarn-color-category-api.service';
import { YarnStockApiService } from '../../api/yarn-stock-api.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  catList: yarnStock.yarnStockCheckbox[] = [];
  colorCatList: yarnStock.yarnStockCheckbox[] = [];

  constructor(
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private yarnStockApiService: YarnStockApiService
  ) {}

  ngOnInit(): void {
    this.yarnCategoryApiService.getAllYarnCategoryApi();
    this.yarnColorCategoryApiService.getAllYarnColorCategoryApi();
    let tempCatList: yarnStock.yarnStockCheckbox[] = [];
    this.yarnCategoryApiService.getYarnCategories().subscribe(categories => {
      tempCatList = [];
      categories.map(cat => {
        tempCatList.push({ ...cat, checked: true });
      });
    });
    this.catList = tempCatList;

    let tempColorCatList: yarnStock.yarnStockCheckbox[] = [];
    this.yarnColorCategoryApiService
      .getYarnColorCategories()
      .subscribe(colorCategories => {
        tempColorCatList = [];
        colorCategories.map(colorCat => {
          tempColorCatList.push({ ...colorCat, checked: true });
        });
      });
    this.colorCatList = tempColorCatList;
  }

  onChange() {
    this.yarnStockApiService.getAllYarnStockApi({
      yarnCategoryIds: this.getCheckedId(this.catList),
      yarnColorCategoryIds: this.getCheckedId(this.colorCatList),
    });
  }

  private getCheckedId(list: yarnStock.yarnStockCheckbox[]) {
    return list.filter(item => item.checked).map(({ id }) => id);
  }
}
