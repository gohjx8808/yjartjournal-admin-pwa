import { Component, OnInit } from '@angular/core';
import { YarnCategoryApiService } from '../master-data/api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from '../master-data/api/yarn-color-category/yarn-color-category-api.service';

@Component({
  selector: 'app-yarn-stock',
  templateUrl: './yarn-stock.component.html',
  styleUrls: ['./yarn-stock.component.scss'],
})
export class YarnStockComponent implements OnInit {
  yarnCategoryList: yarnStock.yarnStockCheckbox[] = [];
  yarnColorCategoryList: yarnStock.yarnStockCheckbox[] = [];

  constructor(
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService
  ) {}

  ngOnInit(): void {
    this.yarnCategoryApiService.getAllYarnCategory().subscribe(category => {
      category.data.map(cat => {
        this.yarnCategoryList.push({ ...cat, checked: true });
      });
    });
    this.yarnColorCategoryApiService
      .getAllYarnColorCategory()
      .subscribe(colorCategory => {
        colorCategory.data.map(colorCat => {
          this.yarnColorCategoryList.push({ ...colorCat, checked: true });
        });
      });
  }

  onCatChange() {
    console.log(this.yarnCategoryList);
  }
}
