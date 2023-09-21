import { Component } from '@angular/core';
import { YarnCategoryApiService } from './api/yarn-category/yarn-category-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss'],
})
export class MasterDataComponent {
  listData: globalType.optionData[] = [];
  isYarnCategory = false;

  constructor(
    private route: ActivatedRoute,
    private yarnCategoryApiService: YarnCategoryApiService
  ) {
    const currentRouteUrl = this.route.snapshot.url.join('/');
    if (currentRouteUrl === 'yarn-category') {
      this.isYarnCategory = true;
      this.yarnCategoryApiService.getAllYarnCategory().subscribe(data => {
        this.listData = data.data;
      });
    }
  }
}
