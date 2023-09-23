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

  addYarnCategory(payload: masterData.addMasterDataPayload) {
    this.apiService.postRequest('/stocks/yarn-categories/add-new', payload);
  }

  updateYarnCategory(payload: masterData.updateMasterDataPayload) {
    return this.apiService.postRequest(
      '/stocks/yarn-categories/update',
      payload
    );
  }
}
