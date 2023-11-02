import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from './api/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData?: dashboard.yarnStockOverview = undefined;

  constructor(private dashboardApiService: DashboardApiService) {}

  ngOnInit(): void {
    this.dashboardApiService.getYarnStockOverview().subscribe(res => {
      this.dashboardData = res.data;
    });
  }
}
