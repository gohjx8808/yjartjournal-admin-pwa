import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class YarnCategoryApiService {
  private yarnCategories: BehaviorSubject<globalType.optionData[]> =
    new BehaviorSubject<globalType.optionData[]>([]);

  private masterDataUrl: string;

  constructor(private apiService: ApiService) {
    this.masterDataUrl = apiService.masterDataApiUrl;
  }

  getYarnCategories() {
    return this.yarnCategories.asObservable();
  }

  getAllYarnCategoryApi() {
    return this.apiService
      .getRequest<globalType.optionData[]>(
        `${this.masterDataUrl}/yarn-categories`
      )
      .subscribe(categories => this.yarnCategories.next(categories.data));
  }

  addYarnCategory(payload: masterData.addMasterDataPayload) {
    return this.apiService.postRequest(
      `${this.masterDataUrl}/yarn-categories/add-new`,
      payload
    );
  }

  updateYarnCategory(payload: masterData.updateMasterDataPayload) {
    return this.apiService.postRequest(
      `${this.masterDataUrl}/yarn-categories/update`,
      payload
    );
  }

  deleteYarnCategory(payload: masterData.deleteMasterDataPayload) {
    return this.apiService.postRequest(
      `${this.masterDataUrl}/yarn-categories/delete`,
      payload
    );
  }
}
