import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent implements OnChanges {
  @Input({ required: true }) title = '';
  @Input({ required: true }) chartData?: dashboard.chartData;

  pieChartDatasets: ChartDataset<'pie', number[]>[] = [];
  pieChartOptions: ChartConfiguration['options'] = {};

  ngOnChanges(): void {
    if (this.chartData) {
      this.pieChartDatasets = [{ data: this.chartData?.value }];
    }
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        title: {
          color: 'black',
          display: true,
          text: this.title,
          font: {
            size: 20,
          },
        },
      },
    };
  }
}
