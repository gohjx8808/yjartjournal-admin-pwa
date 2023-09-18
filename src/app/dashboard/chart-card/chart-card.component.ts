import { Component, Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) chartData?: dashboard.chartData[] = undefined;

  legendPosition = LegendPosition.Below;
}
