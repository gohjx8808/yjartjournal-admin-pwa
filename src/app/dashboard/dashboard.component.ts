import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from './api/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData?: dashboard.yarnStockOverview = undefined;
  isFetchingData = false;

  constructor(private dashboardApiService: DashboardApiService) {}

  ngOnInit(): void {
    this.isFetchingData = true;
    this.dashboardApiService.getYarnStockOverview().subscribe(res => {
      this.isFetchingData = false;
      this.dashboardData = res.data;
    });
  }
}
