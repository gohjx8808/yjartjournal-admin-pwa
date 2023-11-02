import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent implements OnInit {
  @Input({ required: true }) title = '';
  @Input({ required: true }) chartData?: dashboard.chartData = undefined;

  pieChartDatasets: ChartDataset<'pie', number[]>[] = [];
  pieChartOptions: ChartConfiguration['options'] = {};

  ngOnInit(): void {
    this.pieChartDatasets = [{ data: this.chartData?.value ?? [] }];
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
