import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './dialogs/filter-dialog/filter-dialog.component';
import { YarnCategoryApiService } from '../master-data/api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from '../master-data/api/yarn-color-category/yarn-color-category-api.service';
import { YarnStockApiService } from './api/yarn-stock-api.service';

@Component({
  selector: 'app-yarn-stock',
  templateUrl: './yarn-stock.component.html',
  styleUrls: ['./yarn-stock.component.scss'],
})
export class YarnStockComponent implements OnInit {
  yarnStockList: yarnStock.yarnStockData[] = [];

  constructor(
    private dialog: MatDialog,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private yarnStockApiService: YarnStockApiService
  ) {}

  ngOnInit(): void {
    this.yarnCategoryApiService.getAllYarnCategoryApi();
    this.yarnColorCategoryApiService.getAllYarnColorCategoryApi();

    let catIds: number[] = [];
    this.yarnCategoryApiService.getYarnCategories().subscribe(catList => {
      catIds = catList.map(({ id }) => id);
    });

    let colorCatIds: number[] = [];
    this.yarnColorCategoryApiService
      .getYarnColorCategories()
      .subscribe(colorCatList => {
        colorCatIds = colorCatList.map(({ id }) => id);
      });

    this.yarnStockApiService.getAllYarnStockApi({
      yarnCategoryIds: catIds,
      yarnColorCategoryIds: colorCatIds,
    });

    this.yarnStockApiService.getYarnStocks().subscribe(stocks => {
      console.log(stocks);
      this.yarnStockList = stocks;
    });
  }

  onOpenFilter() {
    this.dialog.open(FilterDialogComponent);
  }
}
