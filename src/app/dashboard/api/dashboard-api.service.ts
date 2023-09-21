import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  constructor(private apiService: ApiService) {}

  getYarnStockOverview() {
    return this.apiService.getRequest<dashboard.yarnStockOverview>(
      '/dashboard/yarn-stock-overview'
    );
  }
}
