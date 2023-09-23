import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class YarnStockApiService {
  constructor(private apiService: ApiService) {}

  getAllYarnStock(payload: yarnStock.getAllYarnStockPayload) {
    return this.apiService.postRequest<yarnStock.yarnStockData[]>(
      '/stocks/yarn-stocks',
      payload
    );
  }
}
