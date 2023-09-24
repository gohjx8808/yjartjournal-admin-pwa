import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class YarnCategoryApiService {
  private yarnCategories: BehaviorSubject<globalType.optionData[]> =
    new BehaviorSubject<globalType.optionData[]>([]);

  constructor(private apiService: ApiService) {}

  getYarnCategories() {
    return this.yarnCategories.asObservable();
  }

  getAllYarnCategoryApi() {
    return this.apiService
      .getRequest<globalType.optionData[]>('/stocks/yarn-categories')
      .subscribe(categories => this.yarnCategories.next(categories.data));
  }

  addYarnCategory(payload: masterData.addMasterDataPayload) {
    return this.apiService.postRequest(
      '/stocks/yarn-categories/add-new',
      payload
    );
  }

  updateYarnCategory(payload: masterData.updateMasterDataPayload) {
    return this.apiService.postRequest(
      '/stocks/yarn-categories/update',
      payload
    );
  }

  deleteYarnCategory(payload: masterData.deleteMasterDataPayload) {
    return this.apiService.postRequest(
      '/stocks/yarn-categories/delete',
      payload
    );
  }
}
