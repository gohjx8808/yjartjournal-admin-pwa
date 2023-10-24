import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YarnStockApiService {
  constructor(private apiService: ApiService) {}

  private yarnStocks = new BehaviorSubject<yarnStock.yarnStockData[]>([]);

  getYarnStocks() {
    return this.yarnStocks.asObservable();
  }

  getAllYarnStockApi(payload: yarnStock.getAllYarnStockPayload) {
    this.apiService
      .postRequest<yarnStock.yarnStockData[]>('/stocks/yarn-stocks', payload)
      .subscribe(data => this.yarnStocks.next(data.data));
  }

  postUpdateYarnStockQuantity(payload: yarnStock.updateQuantityPayload) {
    this.apiService
      .postRequest('/stocks/update-quantity', payload)
      .subscribe(() => payload.onRefreshData());
  }
}
