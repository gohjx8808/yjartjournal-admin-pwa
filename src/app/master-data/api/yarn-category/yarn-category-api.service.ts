import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class YarnCategoryApiService {
  constructor(private apiService: ApiService) {}

  getAllYarnCategory() {
    return this.apiService.getRequest<globalType.optionData[]>(
      '/stocks/yarn-categories'
    );
  }
}
