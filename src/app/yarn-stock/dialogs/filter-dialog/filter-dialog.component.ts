import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  catList: yarnStock.yarnStockCheckbox[] = [];
  colorCatList: yarnStock.yarnStockCheckbox[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: yarnStock.filterDialogData
  ) {}

  ngOnInit(): void {
    this.catList = this.dialogData.catList;
    this.colorCatList = this.dialogData.colorCatList;
  }
}
