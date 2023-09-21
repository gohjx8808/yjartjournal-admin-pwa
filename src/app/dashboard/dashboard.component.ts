import { Component } from '@angular/core';
import { DashboardApiService } from './api/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dashboardData: dashboard.yarnStockOverview | null = null;

  constructor(private dashboardApiService: DashboardApiService) {
    this.dashboardApiService.getYarnStockOverview().subscribe(res => {
      this.dashboardData = res.data;
    });
  }
}
