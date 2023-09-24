import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './dialogs/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-yarn-stock',
  templateUrl: './yarn-stock.component.html',
  styleUrls: ['./yarn-stock.component.scss'],
})
export class YarnStockComponent {
  constructor(private dialog: MatDialog) {}

  onOpenFilter() {
    this.dialog.open(FilterDialogComponent);
  }
}
