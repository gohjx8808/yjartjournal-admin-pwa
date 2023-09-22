import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class YarnColorCategoryApiService {
  constructor(private apiService: ApiService) {}

  getAllYarnColorCategory() {
    return this.apiService.getRequest<globalType.optionData[]>(
      '/stocks/yarn-color-categories'
    );
  }
}
