import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class YarnColorCategoryApiService {
  private yarnColorCategories: BehaviorSubject<globalType.optionData[]> =
    new BehaviorSubject<globalType.optionData[]>([]);

  constructor(private apiService: ApiService) {}

  getYarnColorCategories() {
    return this.yarnColorCategories.asObservable();
  }

  getAllYarnColorCategoryApi() {
    return this.apiService
      .getRequest<globalType.optionData[]>('/stocks/yarn-color-categories')
      .subscribe(data => {
        this.yarnColorCategories.next(data.data);
      });
  }

  addYarnColorCategory(payload: masterData.addMasterDataPayload) {
    return this.apiService.postRequest(
      '/stocks/yarn-color-categories/add-new',
      payload
    );
  }

  updateYarnColorCategory(payload: masterData.updateMasterDataPayload) {
    return this.apiService.postRequest(
      '/stocks/yarn-color-categories/update',
      payload
    );
  }

  deleteYarnColorCategory(payload: masterData.deleteMasterDataPayload) {
    return this.apiService.postRequest(
      '/stocks/yarn-color-categories/delete',
      payload
    );
  }
}
