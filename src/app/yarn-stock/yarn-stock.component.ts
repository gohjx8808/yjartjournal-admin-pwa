import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { YarnCategoryApiService } from '../master-data/api/yarn-category/yarn-category-api.service';
import { YarnColorCategoryApiService } from '../master-data/api/yarn-color-category/yarn-color-category-api.service';
import { SnackbarService } from '../services/snackbar.service';
import { YarnStockApiService } from './api/yarn-stock-api.service';
import { AddEditYarnStockDialogComponent } from './dialogs/add-edit-yarn-stock-dialog/add-edit-yarn-stock-dialog.component';
import { FilterDialogComponent } from './dialogs/filter-dialog/filter-dialog.component';
import { DeleteYarnStockDialogComponent } from './dialogs/delete-yarn-stock-dialog/delete-yarn-stock-dialog.component';

@Component({
  selector: 'app-yarn-stock',
  templateUrl: './yarn-stock.component.html',
  styleUrls: ['./yarn-stock.component.scss'],
})
export class YarnStockComponent implements OnInit {
  yarnStockList: yarnStock.yarnStockData[] = [];
  checkboxCatList: yarnStock.yarnStockCheckbox[] = [];
  checkboxColorCatList: yarnStock.yarnStockCheckbox[] = [];
  isFetchingData = false;

  constructor(
    private dialog: MatDialog,
    private yarnCategoryApiService: YarnCategoryApiService,
    private yarnColorCategoryApiService: YarnColorCategoryApiService,
    private yarnStockApiService: YarnStockApiService,
    private snackbarService: SnackbarService
  ) {
    this.onRefreshData = this.onRefreshData.bind(this);
  }

  ngOnInit(): void {
    this.isFetchingData = true;
    this.yarnCategoryApiService.getAllYarnCategoryApi();
    this.yarnColorCategoryApiService.getAllYarnColorCategoryApi();

    let catIds: number[] = [];
    let tempCatList: yarnStock.yarnStockCheckbox[] = [];
    this.yarnCategoryApiService.getYarnCategories().subscribe(catList => {
      tempCatList = [];
      catIds = catList.map(cat => {
        tempCatList.push({ ...cat, checked: true });
        return cat.id;
      });
      this.checkboxCatList = tempCatList;
    });

    let colorCatIds: number[] = [];
    let tempColorCatList: yarnStock.yarnStockCheckbox[] = [];
    this.yarnColorCategoryApiService
      .getYarnColorCategories()
      .subscribe(colorCatList => {
        tempColorCatList = [];
        colorCatIds = colorCatList.map(colorCat => {
          tempColorCatList.push({ ...colorCat, checked: true });
          return colorCat.id;
        });
        this.checkboxColorCatList = tempColorCatList;
      });

    this.yarnStockApiService.getAllYarnStockApi({
      yarnCategoryIds: catIds,
      yarnColorCategoryIds: colorCatIds,
    });

    this.yarnStockApiService.getYarnStocks().subscribe(stocks => {
      this.isFetchingData = false;
      this.yarnStockList = stocks;
    });
  }

  onOpenFilter() {
    this.dialog.open(FilterDialogComponent, {
      data: {
        catList: this.checkboxCatList,
        colorCatList: this.checkboxColorCatList,
        onChange: this.onRefreshData,
      },
    });
  }

  private onRefreshData() {
    this.yarnStockApiService.getAllYarnStockApi({
      yarnCategoryIds: this.getCheckedId(this.checkboxCatList),
      yarnColorCategoryIds: this.getCheckedId(this.checkboxColorCatList),
    });
  }

  private getCheckedId(list: yarnStock.yarnStockCheckbox[]) {
    return list.filter(item => item.checked).map(({ id }) => id);
  }

  onIncreaseQuantity(yarnId: number, quantity: number) {
    this.updateQuantity(yarnId, quantity + 1);
  }

  onDecreaseQuantity(yarnId: number, quantity: number) {
    this.updateQuantity(yarnId, quantity - 1);
  }

  updateQuantity(yarnId: number, quantity: number) {
    this.yarnStockApiService
      .postUpdateYarnStockQuantity({
        yarnId,
        quantity,
      })
      .subscribe({
        next: () => {
          this.onRefreshData();
        },
        error: (err: HttpErrorResponse) => {
          this.snackbarService.openErrorSnackbar(
            err.statusText || 'The quantity had failed to update!'
          );
        },
      });
  }

  openAddDialog() {
    this.dialog.open<
      AddEditYarnStockDialogComponent,
      yarnStock.addEditYarnStockDialogData
    >(AddEditYarnStockDialogComponent, {
      data: {
        onRefreshData: this.onRefreshData,
        actionType: 'Add',
      },
    });
  }

  openEditDialog(data: yarnStock.yarnStockData) {
    this.dialog.open<
      AddEditYarnStockDialogComponent,
      yarnStock.addEditYarnStockDialogData
    >(AddEditYarnStockDialogComponent, {
      data: {
        onRefreshData: this.onRefreshData,
        actionType: 'Edit',
        data,
      },
    });
  }

  openDeleteDialog(data: yarnStock.yarnStockData) {
    this.dialog.open<
      DeleteYarnStockDialogComponent,
      yarnStock.deleteYarnStockDialogData
    >(DeleteYarnStockDialogComponent, {
      data: {
        onRefreshData: this.onRefreshData,
        data,
      },
    });
  }
}
