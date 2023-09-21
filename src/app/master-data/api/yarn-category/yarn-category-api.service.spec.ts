import { TestBed } from '@angular/core/testing';

import { YarnCategoryApiService } from './yarn-category-api.service';

describe('YarnCategoryApiService', () => {
  let service: YarnCategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YarnCategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
