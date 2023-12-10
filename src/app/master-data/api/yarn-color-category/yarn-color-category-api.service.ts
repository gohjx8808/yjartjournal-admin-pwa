import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class YarnColorCategoryApiService {
  private yarnColorCategories: BehaviorSubject<globalType.optionData[]> =
    new BehaviorSubject<globalType.optionData[]>([]);

  private masterDataUrl: string;

  constructor(private apiService: ApiService) {
    this.masterDataUrl = apiService.masterDataApiUrl;
  }

  getYarnColorCategories() {
    return this.yarnColorCategories.asObservable();
  }

  getAllYarnColorCategoryApi() {
    return this.apiService
      .getRequest<globalType.optionData[]>(
        `${this.masterDataUrl}/yarn-color-categories`
      )
      .subscribe(data => {
        this.yarnColorCategories.next(data.data);
      });
  }

  addYarnColorCategory(payload: masterData.addMasterDataPayload) {
    return this.apiService.postRequest(
      `${this.masterDataUrl}/yarn-color-categories/add-new`,
      payload
    );
  }

  updateYarnColorCategory(payload: masterData.updateMasterDataPayload) {
    return this.apiService.postRequest(
      `${this.masterDataUrl}/yarn-color-categories/update`,
      payload
    );
  }

  deleteYarnColorCategory(payload: masterData.deleteMasterDataPayload) {
    return this.apiService.postRequest(
      `${this.masterDataUrl}/yarn-color-categories/delete`,
      payload
    );
  }
}
